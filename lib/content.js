import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import { getDatabase } from "./mongodb";

const SITE_CONTENT_DOC_ID = "primary-site-content";

function getLocalContentPath() {
  return path.join(process.cwd(), "data", "site-content.json");
}

function getSeedContentPath() {
  return path.join(process.cwd(), "data", "site-content.seed.json");
}

export function canUseMongoContent() {
  return Boolean(process.env.MONGODB_URI);
}

function cloneJson(value) {
  return JSON.parse(JSON.stringify(value));
}

function mergeSiteContentWithDefaults(content, defaults) {
  if (!isPlainObject(defaults)) {
    return cloneJson(content || {});
  }

  const merged = {
    ...cloneJson(defaults),
    ...(isPlainObject(content) ? cloneJson(content) : {}),
  };

  if (isPlainObject(defaults.TERMS)) {
    merged.TERMS = {
      ...cloneJson(defaults.TERMS),
      ...(isPlainObject(content?.TERMS) ? cloneJson(content.TERMS) : {}),
    };

    if (!Array.isArray(content?.TERMS?.sections)) {
      merged.TERMS.sections = cloneJson(defaults.TERMS.sections || []);
    }
  }

  return merged;
}

async function readJsonFile(filePath) {
  try {
    const raw = await readFile(filePath, "utf8");
    return JSON.parse(raw);
  } catch (error) {
    if (error.code === "ENOENT") {
      return null;
    }

    throw error;
  }
}

async function readSeedContent() {
  const seed = await readJsonFile(getSeedContentPath());
  const local = await readJsonFile(getLocalContentPath());

  if (local) {
    return mergeSiteContentWithDefaults(local, seed || {});
  }

  return seed || {};
}

async function writeLocalContent(content) {
  const filePath = getLocalContentPath();
  await mkdir(path.dirname(filePath), { recursive: true });
  await writeFile(filePath, `${JSON.stringify(content, null, 2)}\n`);
}

function isPlainObject(value) {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

export async function getSiteContent() {
  if (process.env.NODE_ENV !== "production" && !canUseMongoContent()) {
    const content = await readSeedContent();

    return {
      storage: "local",
      updatedAt: null,
      content: cloneJson(content),
    };
  }

  try {
    const database = await getDatabase();
    const collection = database.collection("siteContent");
    const document = await collection.findOne({ _id: SITE_CONTENT_DOC_ID });
    const seedContent = await readSeedContent();

    if (!document?.content) {
      await collection.updateOne(
        { _id: SITE_CONTENT_DOC_ID },
        {
          $set: {
            content: seedContent,
            updatedAt: new Date(),
          },
        },
        { upsert: true },
      );

      return {
        storage: "mongo",
        updatedAt: new Date().toISOString(),
        content: cloneJson(seedContent),
      };
    }

    return {
      storage: "mongo",
      updatedAt: document.updatedAt
        ? new Date(document.updatedAt).toISOString()
        : null,
      content: mergeSiteContentWithDefaults(document.content, seedContent),
    };
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      const content = await readSeedContent();

      return {
        storage: "local",
        updatedAt: null,
        content: cloneJson(content),
      };
    }

    throw error;
  }
}

export async function updateSiteContent(content) {
  if (!isPlainObject(content)) {
    throw new Error("Site content must be a JSON object.");
  }

  if (process.env.NODE_ENV !== "production" && !canUseMongoContent()) {
    await writeLocalContent(content);

    return {
      storage: "local",
      updatedAt: new Date().toISOString(),
      content: cloneJson(content),
    };
  }

  try {
    const database = await getDatabase();
    const updatedAt = new Date();

    await database.collection("siteContent").updateOne(
      { _id: SITE_CONTENT_DOC_ID },
      {
        $set: {
          content,
          updatedAt,
        },
      },
      { upsert: true },
    );

    return {
      storage: "mongo",
      updatedAt: updatedAt.toISOString(),
      content: cloneJson(content),
    };
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      await writeLocalContent(content);

      return {
        storage: "local",
        updatedAt: new Date().toISOString(),
        content: cloneJson(content),
      };
    }

    throw error;
  }
}
