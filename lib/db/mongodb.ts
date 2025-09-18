import mongoose, { Connection } from "mongoose";

type DbName = "resources" | "scholarships";

type ConnectionCache = {
  [key in DbName]?: {
    conn: Connection | null;
    promise: Promise<Connection> | null;
  };
};

// store cached connections globally (works across hot reloads in dev)
let cached: ConnectionCache = (global as any).mongoose || {};
if (!(global as any).mongoose) {
  (global as any).mongoose = cached;
}

export async function connectMongo(name: DbName): Promise<Connection> {
  let uri: string | undefined;

  if (name === "resources") {
    uri = process.env.MONGODB_RESOURCES_URI;
    console.log('MONGODB_RESOURCES_URI:', uri);
  } else if (name === "scholarships") {
    uri = process.env.MONGODB_SCHOLARSHIPS_URI;
  }

  if (!uri) {
    throw new Error(`⚠️ Missing MongoDB URI for ${name}`);
  }

  if (!cached[name]) {
    cached[name] = { conn: null, promise: null };
  }

  if (cached[name]?.conn) {
    return cached[name]!.conn!;
  }

  if (!cached[name]?.promise) {
    cached[name]!.promise = mongoose
      .createConnection(uri, { bufferCommands: false })
      .asPromise();
  }

  cached[name]!.conn = await cached[name]!.promise!;
  return cached[name]!.conn!;
}
