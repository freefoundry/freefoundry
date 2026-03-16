import Parser from "rss-parser"

const parser = new Parser()

export async function fetchRSS(feedUrl: string) {
  const feed = await parser.parseURL(feedUrl)

  return feed.items.map(item => ({
    title: item.title || "",
    description: item.contentSnippet || "",
    url: item.link || ""
  }))
}
