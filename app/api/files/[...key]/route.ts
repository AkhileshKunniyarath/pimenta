import { Readable } from "node:stream";
import { NextResponse } from "next/server";
import { getGarageObject } from "../../../../lib/garageStorage";

export const runtime = "nodejs";

function toWebStream(body: unknown): BodyInit | null {
  if (!body) {
    return null;
  }

  if (body instanceof Readable) {
    return Readable.toWeb(body) as BodyInit;
  }

  if (typeof (body as { transformToWebStream?: unknown }).transformToWebStream === "function") {
    return (body as { transformToWebStream: () => ReadableStream }).transformToWebStream();
  }

  return body as BodyInit;
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ key: string[] }> }
) {
  const { key } = await params;
  const objectKey = key.join("/");

  try {
    const object = await getGarageObject(objectKey);
    const body = toWebStream(object.Body);

    if (!body) {
      return new NextResponse(null, { status: 404 });
    }

    const headers = new Headers();

    if (object.ContentType) {
      headers.set("Content-Type", object.ContentType);
    }

    if (object.ContentLength !== undefined) {
      headers.set("Content-Length", String(object.ContentLength));
    }

    headers.set("Cache-Control", object.CacheControl || "public, max-age=31536000, immutable");

    return new NextResponse(body, { headers });
  } catch (error) {
    console.error("Garage file read failed", error);
    return new NextResponse(null, { status: 404 });
  }
}
