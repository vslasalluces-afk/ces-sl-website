import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/db";
import { mediaLibrary } from "@/db/schema";
import { desc, eq, ilike, or, sql } from "drizzle-orm";
import fs from "fs/promises";
import path from "path";
import crypto from "crypto";

const UPLOAD_DIR = path.join(process.cwd(), "public", "media", "ces");
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/avif",
];

// GET — List media with filtering
export async function GET(request: NextRequest) {
  try {
    const url = request.nextUrl;
    const category = url.searchParams.get("category");
    const programme = url.searchParams.get("programme");
    const search = url.searchParams.get("q");
    const limit = parseInt(url.searchParams.get("limit") || "50", 10);
    const offset = parseInt(url.searchParams.get("offset") || "0", 10);

    let query = db.select().from(mediaLibrary);

    const conditions = [];
    if (category) conditions.push(eq(mediaLibrary.category, category));
    if (programme) conditions.push(eq(mediaLibrary.programme, programme));
    if (search) {
      conditions.push(
        or(
          ilike(mediaLibrary.caption, `%${search}%`),
          ilike(mediaLibrary.altText, `%${search}%`),
          ilike(mediaLibrary.location, `%${search}%`)
        )!
      );
    }

    const results = await db
      .select()
      .from(mediaLibrary)
      .where(conditions.length > 0 ? sql`${conditions.map((c, i) => i === 0 ? c : sql` AND ${c}`).reduce((a, b) => sql`${a}${b}`)}` : undefined)
      .orderBy(desc(mediaLibrary.createdAt))
      .limit(limit)
      .offset(offset);

    return NextResponse.json({ media: results, count: results.length });
  } catch (error) {
    console.error("Media list error:", error);
    return NextResponse.json(
      { error: "Failed to list media" },
      { status: 500 }
    );
  }
}

// POST — Upload new media
export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      );
    }

    // Validate file type
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        {
          error: `Invalid file type. Allowed: ${ALLOWED_TYPES.join(", ")}`,
        },
        { status: 400 }
      );
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "File too large. Maximum size is 10MB." },
        { status: 400 }
      );
    }

    // Generate unique filename
    const ext = file.name.split(".").pop() || "jpg";
    const hash = crypto.randomBytes(8).toString("hex");
    const filename = `ces-${Date.now()}-${hash}.${ext}`;

    // Ensure upload directory exists
    await fs.mkdir(UPLOAD_DIR, { recursive: true });

    // Write file
    const buffer = Buffer.from(await file.arrayBuffer());
    const filePath = path.join(UPLOAD_DIR, filename);
    await fs.writeFile(filePath, buffer);

    const url = `/media/ces/${filename}`;

    // Extract metadata from form
    const caption = formData.get("caption") as string | null;
    const altText = formData.get("altText") as string | null;
    const category = formData.get("category") as string | null;
    const programme = formData.get("programme") as string | null;
    const location = formData.get("location") as string | null;
    const credit = formData.get("credit") as string | null;
    const sourceUrl = formData.get("sourceUrl") as string | null;
    const dateTaken = formData.get("dateTaken") as string | null;
    const consentStatus =
      (formData.get("consentStatus") as string) || "approved";
    const containsChildren = formData.get("containsChildren") === "true";
    const tagsRaw = formData.get("tags") as string | null;
    const tags = tagsRaw
      ? tagsRaw.split(",").map((t) => t.trim()).filter(Boolean)
      : null;

    // Store in database
    const [record] = await db
      .insert(mediaLibrary)
      .values({
        filename,
        originalFilename: file.name,
        mimeType: file.type,
        fileSize: file.size,
        url,
        caption,
        altText: altText || `CES image: ${caption || file.name}`,
        category,
        programme,
        location,
        dateTaken: dateTaken || null,
        credit,
        source: sourceUrl ? "facebook" : "upload",
        sourceUrl,
        consentStatus,
        containsChildren,
        safeguardingApproved: !containsChildren,
        tags,
        uploadedBy: session.user.email,
      })
      .returning();

    return NextResponse.json({
      success: true,
      media: record,
    });
  } catch (error) {
    console.error("Media upload error:", error);
    return NextResponse.json(
      { error: "Failed to upload media" },
      { status: 500 }
    );
  }
}
