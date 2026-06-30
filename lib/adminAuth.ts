import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const ADMIN_COOKIE_NAME = "pimenta_admin";

function getAdminPassword(): string {
  return process.env.ADMIN_PASSWORD || process.env.ADMIN_PASS || "";
}

function getAdminUser(): string {
  return process.env.ADMIN_USERNAME || process.env.ADMIN_USER || "admin";
}

function getSessionSecret(): string {
  return process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD || "";
}

function sign(value: string): string {
  const secret = getSessionSecret();

  if (!secret) {
    throw new Error("Missing ADMIN_PASSWORD or ADMIN_SESSION_SECRET.");
  }

  return createHmac("sha256", secret).update(value).digest("base64url");
}

function safeEqual(a: any, b: any): boolean {
  const left = Buffer.from(String(a));
  const right = Buffer.from(String(b));

  return left.length === right.length && timingSafeEqual(left, right);
}

export function verifyAdminCredentials(username?: string, password?: string): boolean {
  const expectedUser = getAdminUser();
  const expectedPassword = getAdminPassword();

  if (!expectedPassword) {
    throw new Error("Missing ADMIN_PASSWORD environment variable.");
  }

  return safeEqual(username || "", expectedUser) && safeEqual(password || "", expectedPassword);
}

export function createAdminSessionToken(): string {
  const issuedAt = Date.now().toString();
  return `${issuedAt}.${sign(issuedAt)}`;
}

export function isValidAdminSession(token?: string): boolean {
  if (!token || !token.includes(".")) {
    return false;
  }

  const [issuedAt, signature] = token.split(".");
  const issuedAtMs = Number(issuedAt);

  if (!Number.isFinite(issuedAtMs)) {
    return false;
  }

  const maxAgeMs = 1000 * 60 * 60 * 24 * 7;
  if (Date.now() - issuedAtMs > maxAgeMs) {
    return false;
  }

  try {
    return safeEqual(signature, sign(issuedAt));
  } catch {
    return false;
  }
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  return isValidAdminSession(cookieStore.get(ADMIN_COOKIE_NAME)?.value);
}

export function isAdminRequest(request: any): boolean {
  const token = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
  return isValidAdminSession(token);
}

export function adminUnauthorizedResponse() {
  return NextResponse.json(
    { error: "Admin login required." },
    { status: 401 }
  );
}

export function setAdminCookie(response: any, token: string) {
  response.cookies.set(ADMIN_COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export function clearAdminCookie(response: any) {
  response.cookies.set(ADMIN_COOKIE_NAME, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });
}
