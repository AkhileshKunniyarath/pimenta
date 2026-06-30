import path from "node:path";
import { NextResponse } from "next/server";
import { adminUnauthorizedResponse, isAdminRequest } from "../../../lib/adminAuth";
import { uploadToGarage } from "../../../lib/garageStorage";

export const runtime = "nodejs";

const MAX_FILE_SIZE = 8 * 1024 * 1024;
const ALLOWED_TYPES = new Set([
  "image/avif",
  "image/gif",
  "image/jpeg",
  "image/png",
  "image/svg+xml",
  "image/webp",
]);

function safeFilename(name: string): string {
  const extension = path.extname(name || "").toLowerCase();
  const base = path
    .basename(name || "upload", extension)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);

  return `${base || "upload"}-${Date.now()}${extension || ".bin"}`;
}

export async function POST(request: Request) {
  if (!isAdminRequest(request)) {
    return adminUnauthorizedResponse();
  }

  let formData: FormData;

  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json(
      { error: "Invalid upload request." },
      { status: 400 }
    );
  }

  const file = formData.get("file") as File | null;

  if (!file || typeof file.arrayBuffer !== "function") {
    return NextResponse.json(
      { error: "Please choose an image to upload." },
      { status: 400 }
    );
  }

  if (!ALLOWED_TYPES.has(file.type)) {
    return NextResponse.json(
      { error: "Only image uploads are allowed." },
      { status: 400 }
    );
  }

  if (file.size > MAX_FILE_SIZE) {
    return NextResponse.json(
      { error: "Image must be 8MB or smaller." },
      { status: 400 }
    );
  }

  const filename = safeFilename(file.name);
  const body = Buffer.from(await file.arrayBuffer());

  let upload;

  try {
    upload = await uploadToGarage({
      body,
      contentType: file.type,
      filename,
    });
  } catch (error) {
    console.error("Garage upload failed", error);

    return NextResponse.json(
      { error: "Unable to upload image to storage." },
      { status: 500 }
    );
  }

  return NextResponse.json({
    ok: true,
    url: upload.url,
    name: filename,
    key: upload.key,
  });
}
