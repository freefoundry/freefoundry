import { NextResponse } from "next/server"
import * as cheerio from "cheerio"

export async function POST(req: Request) {

  const { url } = await req.json()

  if (!url) {
    return NextResponse.json(
      { error: "URL required" },
      { status: 400 }
    )
  }

  const res = await fetch(url)
  const html = await res.text()

  const $ = cheerio.load(html)

  const title =
    $("meta[property='og:title']").attr("content") ||
    $("title").text()

  const description =
    $("meta[property='og:description']").attr("content") ||
    $("meta[name='description']").attr("content") ||
    $("article").text().slice(0, 2000)

  return NextResponse.json({
    title,
    provider: "Mastercard Foundation",
    description: `<p>${description}</p>`,
    amount: "Fully funded",
    currency: "USD",
    type: "Fully-funded",
    level: "Postgraduate",
    field: "Multiple fields",
    location: "Africa",
    country: "Multiple",
    applicationUrl: url,
    eligibility: [],
    requirements: [],
    benefits: [],
    tags: ["scholarship","africa"]
  })

}