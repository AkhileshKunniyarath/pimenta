import { GetObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

export type GarageUploadInput = {
  body: Buffer;
  contentType: string;
  filename: string;
};

const requiredEnv = [
  "GARAGE_S3_ENDPOINT",
  "GARAGE_ACCESS_KEY_ID",
  "GARAGE_SECRET_ACCESS_KEY",
  "GARAGE_BUCKET",
] as const;

function getRequiredEnv(name: (typeof requiredEnv)[number]): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing ${name}.`);
  }

  return value;
}

function trimSlashes(value: string): string {
  return value.replace(/^\/+|\/+$/g, "");
}

function publicBaseUrl(bucket: string): string {
  const explicitBase = process.env.GARAGE_PUBLIC_URL;

  if (explicitBase) {
    return explicitBase.replace(/\/+$/g, "");
  }

  return "";
}

function createGarageClient() {
  return new S3Client({
    region: process.env.GARAGE_REGION || "garage",
    endpoint: getRequiredEnv("GARAGE_S3_ENDPOINT"),
    credentials: {
      accessKeyId: getRequiredEnv("GARAGE_ACCESS_KEY_ID"),
      secretAccessKey: getRequiredEnv("GARAGE_SECRET_ACCESS_KEY"),
    },
    forcePathStyle: true,
  });
}

export function getGarageObjectUrl(key: string): string {
  const bucket = getRequiredEnv("GARAGE_BUCKET");
  const baseUrl = publicBaseUrl(bucket);
  const objectKey = trimSlashes(key);

  if (!baseUrl) {
    return `/api/files/${objectKey}`;
  }

  return `${baseUrl}/${objectKey}`;
}

export async function getGarageObject(key: string) {
  return createGarageClient().send(
    new GetObjectCommand({
      Bucket: getRequiredEnv("GARAGE_BUCKET"),
      Key: trimSlashes(key),
    })
  );
}

export async function uploadToGarage(input: GarageUploadInput) {
  const bucket = getRequiredEnv("GARAGE_BUCKET");
  const keyPrefix = trimSlashes(process.env.GARAGE_KEY_PREFIX || "uploads");
  const key = `${keyPrefix}/${input.filename}`;

  await createGarageClient().send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: input.body,
      ContentType: input.contentType,
      CacheControl: "public, max-age=31536000, immutable",
    })
  );

  return {
    key,
    url: getGarageObjectUrl(key),
  };
}
