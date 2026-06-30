import { getDatabase } from "./mongodb";

const SITE_CONTENT_DOC_ID = "primary-site-content";

export function canUseMongoContent(): boolean {
  return Boolean(process.env.MONGODB_URI);
}

function cloneJson<T>(value: T): T {
  return JSON.parse(JSON.stringify(value));
}

function isPlainObject(value: any): boolean {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function requireMongoUri() {
  if (!canUseMongoContent()) {
    throw new Error("MONGODB_URI is required. Add it to .env.local to load site content.");
  }
}

export async function getSiteContent() {
  requireMongoUri();

  const database = await getDatabase();
  const document = await database
    .collection("siteContent")
    .findOne({ _id: SITE_CONTENT_DOC_ID as any });

  if (!isPlainObject(document?.content)) {
    throw new Error("No site content found in MongoDB.");
  }

  return {
    storage: "mongo",
    updatedAt: document.updatedAt
      ? new Date(document.updatedAt).toISOString()
      : null,
    content: cloneJson(document.content),
  };
}

export async function updateSiteContent(content: any) {
  if (!isPlainObject(content)) {
    throw new Error("Site content must be a JSON object.");
  }

  requireMongoUri();

  const database = await getDatabase();
  const updatedAt = new Date();

  await database.collection("siteContent").updateOne(
    { _id: SITE_CONTENT_DOC_ID as any },
    {
      $set: {
        content,
        updatedAt,
      },
    },
    { upsert: true }
  );

  return {
    storage: "mongo",
    updatedAt: updatedAt.toISOString(),
    content: cloneJson(content),
  };
}
