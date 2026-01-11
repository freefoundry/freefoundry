type ShareMessageInput = {
  title: string;
  country?: string;
  level?: string;
  deadline?: string;
  benefits?: string[];
  url: string;
  source?: string;
};

export function buildShareMessage({
  title,
  country,
  level,
  deadline,
  benefits,
  url,
  source = "Free Foundry",
}: ShareMessageInput) {
  const formattedBenefits =
    benefits && benefits.length > 0
      ? benefits
          .slice(0, 3)
          .map(
            (b) =>
              `✅ ${b
                .replace(/^Benefits\s*/i, "")
                .replace(/^-\s*/, "")
                .trim()}`
          )
          .join("\n")
      : "✅ See details on the website";
  const headline = (
    country ? `Opportunity in ${country}` : "Latest Opportunity"
  ).trim();

  const cleanTitle = title.trim();
  return `
*${headline}*

*${cleanTitle}*

${country ? `📍 Host Country: ${country}\n` : ""}${
    level ? `🎓 Level: ${level}\n` : ""
  }${deadline ? `⏰ Deadline: ${deadline}\n` : ""}

*Benefits:*
${formattedBenefits}

*Learn more & Apply 📌*
${url}

*📰 Published by: ${source}*
`.trim();
}
