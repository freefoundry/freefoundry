import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*", // Allows all user agents (bots)
        allow: "/", // Allows crawling of all pages
      },
    ],
    sitemap: "https://freefoundryhub.com/sitemap.xml", // Corrected sitemap URL
  };
}
