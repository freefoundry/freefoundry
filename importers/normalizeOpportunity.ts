export type RawOpportunity = {
  sourceName: string
  sourceUrl: string
  sourceType: "rss" | "api" | "scrape"

  title: string
  description?: string
  url: string

  opportunityType?: "scholarship" | "job" | "course" | "resource"

  rawContent?: string
}