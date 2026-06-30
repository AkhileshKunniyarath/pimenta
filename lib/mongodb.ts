import { MongoClient } from "mongodb";

const globalForMongo = globalThis as any;

function getMongoUri(): string {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error("Missing MONGODB_URI environment variable.");
  }

  return uri;
}

async function getClientPromise(): Promise<MongoClient> {
  if (!globalForMongo._mongoClientPromise) {
    const client = new MongoClient(getMongoUri());
    globalForMongo._mongoClientPromise = client.connect();
  }

  return globalForMongo._mongoClientPromise;
}

export async function getDatabase() {
  const client = await getClientPromise();
  const dbName = process.env.MONGODB_DB || "pimenta";

  return client.db(dbName);
}
