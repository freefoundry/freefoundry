
# Example of connecting to a database in a Next.js API route
## Example with MongoDB
import { connectMongo } from "@/lib/mongodb";

export async function GET() {
  const db = await connectMongo("resources");
  const Resource = db.model("Resource", new db.Schema({ title: String }));
  const resources = await Resource.find();
  return Response.json(resources);
}

# Example with MySQL
import { connectMySQL } from "@/lib/mysql";

export async function GET() {
  const db = connectMySQL("jobs");
  const [rows] = await db.query("SELECT * FROM jobs");
  return Response.json(rows);
}

## Another example with MySQL
import { connectMySQL } from "@/lib/mysql";

export async function GET() {
  const db = connectMySQL("courses");
  const [rows] = await db.query("SELECT * FROM courses");
  return Response.json(rows);
}
