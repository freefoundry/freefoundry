import mongoose, { Connection } from "mongoose";

type DbName = "resources" | "scholarships" | "users";

type CachedConnection = {
  conn: Connection | null;
  promise: Promise<Connection> | null;
};

type ConnectionCache = Record<DbName, CachedConnection>;

// Global cache (safe for hot reloads / serverless)
const globalCache = (global as any).mongoose as
  | Partial<ConnectionCache>
  | undefined;

const cached: Partial<ConnectionCache> = globalCache ?? {};
if (!(global as any).mongoose) {
  (global as any).mongoose = cached;
}

// Database name mapping
const DB_NAME_MAP: Record<DbName, string> = {
  resources: "freefoundry_resources",
  scholarships: "freefoundry_scholarships",
  users: "freefoundry_users",
};

// URI mapping
const URI_MAP: Record<DbName, string | undefined> = {
  resources: process.env.MONGODB_RESOURCES_URI,
  scholarships: process.env.MONGODB_SCHOLARSHIPS_URI,
  users: process.env.MONGODB_USERS_URI,
};

export async function connectMongo(name: DbName): Promise<Connection> {
  const uri = URI_MAP[name];
  if (!uri) {
    throw new Error(`Missing MongoDB URI for "${name}"`);
  }

  if (!cached[name]) {
    cached[name] = { conn: null, promise: null };
  }

  if (cached[name]!.conn) {
    return cached[name]!.conn!;
  }

  if (!cached[name]!.promise) {
    cached[name]!.promise = mongoose
      .createConnection(uri, {
        dbName: DB_NAME_MAP[name],
        bufferCommands: false,
      })
      .asPromise();
  }

  cached[name]!.conn = await cached[name]!.promise!;
  return cached[name]!.conn!;
}
