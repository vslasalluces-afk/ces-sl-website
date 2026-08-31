"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import {
  Upload,
  Image as ImageIcon,
  X,
  CheckCircle,
  AlertCircle,
  MapPin,
  Tag,
  Camera,
  ExternalLink,
  Search,
  Filter,
} from "lucide-react";
import { GALLERY_CATEGORIES, PROGRAMME_CATEGORIES } from "@/lib/constants";

interface MediaItem {
  id: number;
  filename: string;
  url: string;
  caption: string | null;
  altText: string | null;
  category: string | null;
  programme: string | null;
  location: string | null;
  credit: string | null;
  source: string | null;
  sourceUrl: string | null;
  consentStatus: string | null;
  containsChildren: boolean | null;
  tags: string[] | null;
  createdAt: string;
}

export default function MediaLibraryPage() {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Upload form state
  const [uploadData, setUploadData] = useState({
    caption: "",
    altText: "",
    category: "",
    programme: "",
    location: "",
    credit: "CES Official Facebook Page",
    sourceUrl: "https://www.facebook.com/share/196wy5KvNF/",
    dateTaken: "",
    consentStatus: "approved",
    containsChildren: false,
    tags: "",
  });

  // Load media
  const loadMedia = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (searchQuery) params.set("q", searchQuery);
      const res = await fetch(`/api/admin/media?${params}`);
      const data = await res.json();
      setMedia(data.media || []);
    } catch {
      setMessage({ type: "error", text: "Failed to load media" });
    } finally {
      setLoading(false);
    }
  }, [searchQuery]);

  // Handle file upload
  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const fileInput = form.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;
    const file = fileInput?.files?.[0];

    if (!file) {
      setMessage({ type: "error", text: "Please select a file" });
      return;
    }

    setUploading(true);
    setMessage(null);

    try {
      const formData = new FormData();
      formData.append("file", file);
      Object.entries(uploadData).forEach(([key, value]) => {
        formData.append(key, String(value));
      });

      const res = await fetch("/api/admin/media", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        setMessage({
          type: "success",
          text: `Image "${file.name}" uploaded successfully`,
        });
        setUploadData((prev) => ({
          ...prev,
          caption: "",
          altText: "",
          dateTaken: "",
          tags: "",
        }));
        fileInput.value = "";
        loadMedia();
      } else {
        setMessage({ type: "error", text: data.error || "Upload failed" });
      }
    } catch {
      setMessage({ type: "error", text: "Upload failed" });
    } finally {
      setUploading(false);
    }
  };

  return (
    <section className="section-padding bg-cream min-h-screen">
      <div className="container-wide mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="font-serif text-3xl font-bold text-deep-brown mb-2">
              CES Media Library
            </h1>
            <p className="text-charcoal/60">
              Upload and manage CES images from the{" "}
              <a
                href="https://www.facebook.com/share/196wy5KvNF/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-green underline"
              >
                official Facebook page
              </a>{" "}
              and other approved sources.
            </p>
          </div>
          <button
            onClick={() => setShowUpload(!showUpload)}
            className="btn-primary inline-flex items-center gap-2 shrink-0"
          >
            <Upload className="w-5 h-5" />
            Upload Image
          </button>
        </div>

        {/* Status message */}
        {message && (
          <div
            className={`rounded-xl p-4 mb-6 flex items-start gap-3 ${
              message.type === "success"
                ? "bg-green-50 border border-green-200"
                : "bg-red-50 border border-red-200"
            }`}
          >
            {message.type === "success" ? (
              <CheckCircle className="w-5 h-5 text-green-600 shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
            )}
            <p
              className={`text-sm ${
                message.type === "success" ? "text-green-700" : "text-red-700"
              }`}
            >
              {message.text}
            </p>
            <button onClick={() => setMessage(null)} className="ml-auto">
              <X className="w-4 h-4 text-charcoal/40" />
            </button>
          </div>
        )}

        {/* Upload Form */}
        {showUpload && (
          <div className="bg-white rounded-2xl border border-peach-100 p-6 md:p-8 mb-8">
            <h2 className="font-serif text-xl font-bold text-deep-brown mb-2">
              Upload CES Image
            </h2>
            <p className="text-charcoal/60 text-sm mb-6">
              Upload images downloaded from the CES Facebook page or other
              approved sources. Complete all metadata fields for proper
              attribution and accessibility.
            </p>

            <form onSubmit={handleUpload} className="space-y-6">
              {/* File input */}
              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">
                  Image File *
                </label>
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/avif"
                  required
                  className="w-full px-4 py-3 border border-peach-200 rounded-xl text-charcoal focus:ring-2 focus:ring-peach focus:border-peach file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-peach-100 file:text-deep-brown file:font-medium"
                />
                <p className="text-xs text-charcoal/40 mt-1">
                  JPEG, PNG, WebP, or AVIF. Maximum 10MB.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                {/* Caption */}
                <div>
                  <label
                    htmlFor="m-caption"
                    className="block text-sm font-medium text-charcoal mb-1"
                  >
                    Caption *
                  </label>
                  <input
                    id="m-caption"
                    type="text"
                    value={uploadData.caption}
                    onChange={(e) =>
                      setUploadData((d) => ({ ...d, caption: e.target.value }))
                    }
                    required
                    className="w-full px-4 py-3 border border-peach-200 rounded-xl text-charcoal focus:ring-2 focus:ring-peach focus:border-peach"
                    placeholder="Describe what is happening in the image"
                  />
                </div>

                {/* Alt text */}
                <div>
                  <label
                    htmlFor="m-alt"
                    className="block text-sm font-medium text-charcoal mb-1"
                  >
                    Alt Text (accessibility) *
                  </label>
                  <input
                    id="m-alt"
                    type="text"
                    value={uploadData.altText}
                    onChange={(e) =>
                      setUploadData((d) => ({ ...d, altText: e.target.value }))
                    }
                    required
                    className="w-full px-4 py-3 border border-peach-200 rounded-xl text-charcoal focus:ring-2 focus:ring-peach focus:border-peach"
                    placeholder="Descriptive text for screen readers"
                  />
                </div>

                {/* Category */}
                <div>
                  <label
                    htmlFor="m-category"
                    className="block text-sm font-medium text-charcoal mb-1"
                  >
                    Category
                  </label>
                  <select
                    id="m-category"
                    value={uploadData.category}
                    onChange={(e) =>
                      setUploadData((d) => ({ ...d, category: e.target.value }))
                    }
                    className="w-full px-4 py-3 border border-peach-200 rounded-xl text-charcoal focus:ring-2 focus:ring-peach focus:border-peach bg-white"
                  >
                    <option value="">Select category</option>
                    {GALLERY_CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Programme */}
                <div>
                  <label
                    htmlFor="m-programme"
                    className="block text-sm font-medium text-charcoal mb-1"
                  >
                    Programme
                  </label>
                  <select
                    id="m-programme"
                    value={uploadData.programme}
                    onChange={(e) =>
                      setUploadData((d) => ({
                        ...d,
                        programme: e.target.value,
                      }))
                    }
                    className="w-full px-4 py-3 border border-peach-200 rounded-xl text-charcoal focus:ring-2 focus:ring-peach focus:border-peach bg-white"
                  >
                    <option value="">Select programme</option>
                    {PROGRAMME_CATEGORIES.map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Location */}
                <div>
                  <label
                    htmlFor="m-location"
                    className="block text-sm font-medium text-charcoal mb-1"
                  >
                    Location
                  </label>
                  <input
                    id="m-location"
                    type="text"
                    value={uploadData.location}
                    onChange={(e) =>
                      setUploadData((d) => ({ ...d, location: e.target.value }))
                    }
                    className="w-full px-4 py-3 border border-peach-200 rounded-xl text-charcoal focus:ring-2 focus:ring-peach focus:border-peach"
                    placeholder="e.g. Koinadugu District"
                  />
                </div>

                {/* Date taken */}
                <div>
                  <label
                    htmlFor="m-date"
                    className="block text-sm font-medium text-charcoal mb-1"
                  >
                    Date Taken
                  </label>
                  <input
                    id="m-date"
                    type="date"
                    value={uploadData.dateTaken}
                    onChange={(e) =>
                      setUploadData((d) => ({
                        ...d,
                        dateTaken: e.target.value,
                      }))
                    }
                    className="w-full px-4 py-3 border border-peach-200 rounded-xl text-charcoal focus:ring-2 focus:ring-peach focus:border-peach"
                  />
                </div>

                {/* Credit */}
                <div>
                  <label
                    htmlFor="m-credit"
                    className="block text-sm font-medium text-charcoal mb-1"
                  >
                    Credit / Photographer
                  </label>
                  <input
                    id="m-credit"
                    type="text"
                    value={uploadData.credit}
                    onChange={(e) =>
                      setUploadData((d) => ({ ...d, credit: e.target.value }))
                    }
                    className="w-full px-4 py-3 border border-peach-200 rounded-xl text-charcoal focus:ring-2 focus:ring-peach focus:border-peach"
                  />
                </div>

                {/* Source URL */}
                <div>
                  <label
                    htmlFor="m-source"
                    className="block text-sm font-medium text-charcoal mb-1"
                  >
                    Source URL
                  </label>
                  <input
                    id="m-source"
                    type="url"
                    value={uploadData.sourceUrl}
                    onChange={(e) =>
                      setUploadData((d) => ({
                        ...d,
                        sourceUrl: e.target.value,
                      }))
                    }
                    className="w-full px-4 py-3 border border-peach-200 rounded-xl text-charcoal focus:ring-2 focus:ring-peach focus:border-peach"
                  />
                </div>

                {/* Tags */}
                <div className="sm:col-span-2">
                  <label
                    htmlFor="m-tags"
                    className="block text-sm font-medium text-charcoal mb-1"
                  >
                    Tags (comma-separated)
                  </label>
                  <input
                    id="m-tags"
                    type="text"
                    value={uploadData.tags}
                    onChange={(e) =>
                      setUploadData((d) => ({ ...d, tags: e.target.value }))
                    }
                    className="w-full px-4 py-3 border border-peach-200 rounded-xl text-charcoal focus:ring-2 focus:ring-peach focus:border-peach"
                    placeholder="e.g. farming, women, training, VSLA"
                  />
                </div>
              </div>

              {/* Safeguarding */}
              <div className="bg-peach-100 rounded-xl p-5 border border-peach-200">
                <h3 className="font-semibold text-deep-brown text-sm mb-3">
                  Consent & Safeguarding
                </h3>
                <div className="space-y-3">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={uploadData.containsChildren}
                      onChange={(e) =>
                        setUploadData((d) => ({
                          ...d,
                          containsChildren: e.target.checked,
                        }))
                      }
                      className="mt-1 w-4 h-4 text-muted-green border-peach-200 rounded focus:ring-peach"
                    />
                    <span className="text-sm text-charcoal/70">
                      This image contains identifiable children or vulnerable
                      people (requires additional safeguarding approval before
                      publishing)
                    </span>
                  </label>
                  <select
                    value={uploadData.consentStatus}
                    onChange={(e) =>
                      setUploadData((d) => ({
                        ...d,
                        consentStatus: e.target.value,
                      }))
                    }
                    className="px-4 py-2 border border-peach-200 rounded-lg text-sm text-charcoal bg-white"
                  >
                    <option value="approved">
                      Consent: Approved for website use
                    </option>
                    <option value="pending">
                      Consent: Pending review
                    </option>
                    <option value="restricted">
                      Consent: Restricted — do not publish
                    </option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={uploading}
                  className="btn-primary inline-flex items-center gap-2 disabled:opacity-50"
                >
                  {uploading ? (
                    <>
                      <span className="animate-spin w-4 h-4 border-2 border-warm-white border-t-transparent rounded-full" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Upload className="w-4 h-4" /> Upload Image
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setShowUpload(false)}
                  className="btn-secondary text-sm"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Search & Load */}
        <div className="flex gap-3 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-charcoal/40" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by caption, alt text, or location..."
              className="w-full pl-12 pr-4 py-3 border border-peach-200 rounded-xl text-charcoal focus:ring-2 focus:ring-peach focus:border-peach bg-white"
            />
          </div>
          <button
            onClick={loadMedia}
            disabled={loading}
            className="btn-primary inline-flex items-center gap-2"
          >
            {loading ? "Loading..." : "Load Library"}
          </button>
        </div>

        {/* Instructions */}
        <div className="bg-white rounded-2xl border border-peach-100 p-6 md:p-8 mb-8">
          <h2 className="font-serif text-xl font-bold text-deep-brown mb-4">
            How to Import CES Facebook Photos
          </h2>
          <ol className="space-y-3 text-sm text-charcoal/80 list-decimal list-inside">
            <li>
              Visit the{" "}
              <a
                href="https://www.facebook.com/share/196wy5KvNF/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-green underline font-medium"
              >
                CES Official Facebook Page{" "}
                <ExternalLink className="w-3 h-3 inline" />
              </a>
            </li>
            <li>
              Browse posts and find suitable images showing community work,
              training, agriculture, staff, women&apos;s empowerment, or field
              programmes
            </li>
            <li>
              Right-click and save the image (or use the download option on
              mobile)
            </li>
            <li>
              Click &quot;Upload Image&quot; above and fill in all metadata:
              caption, alt text, category, programme, location, and credit
            </li>
            <li>
              Check the safeguarding box if the image contains identifiable
              children
            </li>
            <li>
              The source URL will be pre-filled with the CES Facebook page link
            </li>
          </ol>

          <div className="mt-6 p-4 bg-peach-100 rounded-xl">
            <p className="text-sm text-deep-brown font-medium">
              ⚠️ Safeguarding Reminder
            </p>
            <p className="text-sm text-charcoal/70 mt-1">
              Do not publish images containing identifiable children or
              vulnerable people without documented consent. Mark such images for
              safeguarding review before making them public.
            </p>
          </div>
        </div>

        {/* Media Grid */}
        {media.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {media.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-peach-100 overflow-hidden group"
              >
                <div className="relative aspect-square">
                  <img
                    src={item.url}
                    alt={item.altText || item.caption || "CES image"}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  {item.consentStatus !== "approved" && (
                    <div className="absolute top-2 right-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                      {item.consentStatus}
                    </div>
                  )}
                  {item.containsChildren && (
                    <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                      Safeguarding
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <p className="text-sm font-medium text-deep-brown line-clamp-2">
                    {item.caption || "No caption"}
                  </p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {item.category && (
                      <span className="text-xs bg-peach-100 text-deep-brown px-2 py-0.5 rounded-full">
                        {item.category}
                      </span>
                    )}
                    {item.location && (
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {item.location}
                      </span>
                    )}
                  </div>
                  {item.source === "facebook" && (
                    <p className="text-xs text-charcoal/40 mt-2 flex items-center gap-1">
                      <ExternalLink className="w-3 h-3" /> From CES Facebook
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
