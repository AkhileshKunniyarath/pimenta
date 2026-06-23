import { NextResponse } from "next/server";

import { getSiteContent, updateSiteContent } from "../../../lib/content";

export const runtime = "nodejs";

export async function GET() {
  try {
    const result = await getSiteContent();
    return NextResponse.json(result);
  } catch (error) {
    console.error("Failed to load site content", error);

    return NextResponse.json(
      { error: "Unable to load site content." },
      { status: 500 },
    );
  }
}

export async function PUT(request) {
  let payload;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 },
    );
  }

  try {
    const content = payload?.content ?? payload;
    const result = await updateSiteContent(content);

    return NextResponse.json({
      ok: true,
      storage: result.storage,
      updatedAt: result.updatedAt,
      content: result.content,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Unable to save site content." },
      { status: 400 },
    );
  }
}
