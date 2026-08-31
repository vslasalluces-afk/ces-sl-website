import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/db";
import { donationRecords } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { SITE } from "@/lib/constants";
import PDFDocument from "pdfkit";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(request: NextRequest, context: RouteContext) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;
  const donationId = parseInt(id);

  if (isNaN(donationId)) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  try {
    const [donation] = await db
      .select()
      .from(donationRecords)
      .where(
        and(
          eq(donationRecords.id, donationId),
          eq(donationRecords.donorEmail, session.user.email)
        )
      )
      .limit(1);

    if (!donation) {
      return NextResponse.json({ error: "Donation not found" }, { status: 404 });
    }

    if (donation.paymentStatus !== "completed") {
      return NextResponse.json(
        { error: "Receipt only available for completed donations" },
        { status: 400 }
      );
    }

    const receiptDate = donation.createdAt
      ? new Date(donation.createdAt).toLocaleDateString("en-GB", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })
      : "Unknown";

    const amount = ((donation.amount || 0) / 100).toFixed(2);
    const currency = donation.currency || "USD";
    const receiptNumber = `CES-${donation.id.toString().padStart(6, "0")}`;

    // Generate PDF
    const doc = new PDFDocument({ size: "A4", margin: 60 });
    const chunks: Buffer[] = [];

    doc.on("data", (chunk: Buffer) => chunks.push(chunk));

    const pdfPromise = new Promise<Buffer>((resolve) => {
      doc.on("end", () => resolve(Buffer.concat(chunks)));
    });

    // ── PDF Content ──

    // Header bar
    doc
      .rect(0, 0, doc.page.width, 110)
      .fill("#5A3A2E");

    doc
      .fontSize(24)
      .font("Helvetica-Bold")
      .fillColor("#FFFFFF")
      .text("Christian Extension Services", 60, 35);

    doc
      .fontSize(11)
      .font("Helvetica")
      .fillColor("#F8B195")
      .text("Transforming Communities. Empowering Lives.", 60, 65);

    doc
      .fontSize(14)
      .font("Helvetica-Bold")
      .fillColor("#FFFFFF")
      .text("DONATION RECEIPT", 60, 85);

    // Receipt details section
    doc.fillColor("#5A3A2E");

    const startY = 135;

    doc.fontSize(10).font("Helvetica").fillColor("#888888");
    doc.text("Receipt Number", 60, startY);
    doc.text("Date", 300, startY);

    doc.fontSize(13).font("Helvetica-Bold").fillColor("#333333");
    doc.text(receiptNumber, 60, startY + 16);
    doc.text(receiptDate, 300, startY + 16);

    // Divider
    doc
      .moveTo(60, startY + 45)
      .lineTo(doc.page.width - 60, startY + 45)
      .strokeColor("#FFE0D0")
      .lineWidth(1)
      .stroke();

    // Donor info
    const donorY = startY + 65;

    doc.fontSize(12).font("Helvetica-Bold").fillColor("#5A3A2E");
    doc.text("Donor Information", 60, donorY);

    doc.fontSize(10).font("Helvetica").fillColor("#888888");
    doc.text("Name", 60, donorY + 25);
    doc.text("Email", 300, donorY + 25);

    doc.fontSize(11).font("Helvetica").fillColor("#333333");
    doc.text(donation.donorName || "Anonymous", 60, donorY + 40);
    doc.text(donation.donorEmail || "N/A", 300, donorY + 40);

    // Divider
    doc
      .moveTo(60, donorY + 65)
      .lineTo(doc.page.width - 60, donorY + 65)
      .strokeColor("#FFE0D0")
      .lineWidth(1)
      .stroke();

    // Donation details
    const detailY = donorY + 85;

    doc.fontSize(12).font("Helvetica-Bold").fillColor("#5A3A2E");
    doc.text("Donation Details", 60, detailY);

    // Amount box
    doc
      .roundedRect(60, detailY + 25, doc.page.width - 120, 70, 8)
      .fill("#FFF0E8");

    doc.fontSize(10).font("Helvetica").fillColor("#888888");
    doc.text("Amount", 80, detailY + 35);
    doc.text("Currency", 250, detailY + 35);
    doc.text("Type", 380, detailY + 35);

    doc.fontSize(22).font("Helvetica-Bold").fillColor("#5A3A2E");
    doc.text(amount, 80, detailY + 52);

    doc.fontSize(13).font("Helvetica").fillColor("#333333");
    doc.text(currency, 250, detailY + 55);
    doc.text(
      donation.type === "recurring" ? "Recurring" : "One-off",
      380,
      detailY + 55
    );

    // Additional info
    const infoY = detailY + 115;

    doc.fontSize(10).font("Helvetica").fillColor("#888888");
    doc.text("Transaction ID", 60, infoY);
    doc.text("Payment Provider", 300, infoY);

    doc.fontSize(10).font("Helvetica").fillColor("#333333");
    doc.text(donation.transactionId || "N/A", 60, infoY + 15);
    doc.text(donation.paymentProvider || "N/A", 300, infoY + 15);

    doc.fontSize(10).font("Helvetica").fillColor("#888888");
    doc.text("Status", 60, infoY + 40);

    doc.fontSize(10).font("Helvetica-Bold").fillColor("#4A6E4A");
    doc.text("Completed", 60, infoY + 55);

    if (donation.message) {
      doc.fontSize(10).font("Helvetica").fillColor("#888888");
      doc.text("Donor Message", 60, infoY + 80);
      doc.fontSize(10).font("Helvetica-Oblique").fillColor("#333333");
      doc.text(`"${donation.message}"`, 60, infoY + 95, { width: 400 });
    }

    // Thank you section
    const thankY = donation.message ? infoY + 140 : infoY + 100;

    doc
      .moveTo(60, thankY)
      .lineTo(doc.page.width - 60, thankY)
      .strokeColor("#FFE0D0")
      .lineWidth(1)
      .stroke();

    doc.fontSize(12).font("Helvetica-Bold").fillColor("#5A3A2E");
    doc.text("Thank You", 60, thankY + 20);

    doc
      .fontSize(10)
      .font("Helvetica")
      .fillColor("#666666")
      .text(
        "Thank you for your generous donation to Christian Extension Services. Your support helps transform communities across Sierra Leone through training, empowerment, and sustainable development.",
        60,
        thankY + 40,
        { width: doc.page.width - 120 }
      );

    // Footer
    const footerY = doc.page.height - 80;

    doc
      .moveTo(60, footerY)
      .lineTo(doc.page.width - 60, footerY)
      .strokeColor("#FAEDE3")
      .lineWidth(1)
      .stroke();

    doc.fontSize(8).font("Helvetica").fillColor("#999999");
    doc.text(SITE.address, 60, footerY + 15);
    doc.text(`${SITE.phone}  ·  ${SITE.email}`, 60, footerY + 28);
    doc.text(
      "This receipt is generated for your personal records.",
      60,
      footerY + 41
    );

    doc.end();

    const pdfBuffer = await pdfPromise;

    return new NextResponse(pdfBuffer as unknown as BodyInit, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${receiptNumber}.pdf"`,
      },
    });
  } catch (error) {
    console.error("Receipt generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate receipt" },
      { status: 500 }
    );
  }
}
