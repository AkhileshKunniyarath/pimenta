import { NextResponse } from "next/server";
import {
  createAdminSessionToken,
  setAdminCookie,
  verifyAdminCredentials,
} from "../../../../lib/adminAuth";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let payload: any;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid login request." },
      { status: 400 }
    );
  }

  try {
    if (!verifyAdminCredentials(payload?.username, payload?.password)) {
      return NextResponse.json(
        { error: "Invalid admin login." },
        { status: 401 }
      );
    }

    const response = NextResponse.json({ ok: true });
    setAdminCookie(response, createAdminSessionToken());
    return response;
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Admin login is not configured." },
      { status: 500 }
    );
  }
}
