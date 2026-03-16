import { connectMySQL } from "@/lib/db/mysql"


const db = connectMySQL("courses")

export async function saveRawOpportunity(item: any) {

  try {

    await db.query(
      `
      INSERT INTO raw_opportunities
      (title, description, url, source_name, source_type, status)
      VALUES (?, ?, ?, ?, ?, ?)
      `,
      [
        item.title,
        item.description,
        item.url,
        "dev.to",
        "rss",
        "pending"
      ]
    )

  } catch (err: any) {

    // Ignore duplicate entries
    if (err.code === "ER_DUP_ENTRY") {
      return
    }

    throw err
  }

}