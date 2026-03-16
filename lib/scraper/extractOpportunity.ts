import * as cheerio from "cheerio";

export async function extractOpportunity(url: string) {

  const res = await fetch(url);
  const html = await res.text();

  const $ = cheerio.load(html);

  const title =
    $("meta[property='og:title']").attr("content") ||
    $("title").text();

  const description =
    $("meta[property='og:description']").attr("content") ||
    $("meta[name='description']").attr("content") ||
    "";

  return {
    title,
    description,
    url
  };
}