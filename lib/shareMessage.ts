type ShareMessageInput = {
  title: string;
  country?: string;
  level?: string;
  deadline?: string;
  benefits?: string[];
  url: string;
  source?: string;
};

type ResourceShareMessageInput = {
  title: string;
  type: string;
  category: string;
  difficulty?: string;
  estimatedTime?: string;
  features?: string[];
  url: string;
  source?: string;
};
type JobShareMessageInput = {
  title: string;
  company: string;
  location?: string;
  type?: string;
  workMode?: string;
  experience?: string;
  salary?: string;
  url: string;
  source?: string;
};
type CourseShareMessageInput = {
  title: string;
  platform: string;
  category?: string;
  difficulty?: string;
  duration?: string;
  rating?: string | number;
  students?: number;
  price?: string;
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


export function buildResourceShareMessage({
  title,
  type,
  category,
  difficulty,
  estimatedTime,
  features,
  url,
  source = "Free Foundry",
}: ResourceShareMessageInput) {
  const formattedFeatures =
    features && features.length > 0
      ? features
          .slice(0, 3)
          .map(
            (f) =>
              `✅ ${f
                .replace(/^-\s*/, "")
                .replace(/^Features\s*/i, "")
                .trim()}`
          )
          .join("\n")
      : "✅ See details on the website";

  const cleanTitle = title.trim();

  return `
*📚 Free Learning Resource*

*${cleanTitle}*

📂 Type: ${type}
🏷 Category: ${category}
${difficulty ? `🎯 Difficulty: ${difficulty}\n` : ""}${
    estimatedTime ? `⏱ Estimated Time: ${estimatedTime}\n` : ""
  }

*What you’ll get:*
${formattedFeatures}

*Access resource 📌*
${url}

*📰 Published by: ${source}*
`.trim();
}

export function buildJobShareMessage({
  title,
  company,
  location,
  type,
  workMode,
  experience,
  salary,
  url,
  source = "Free Foundry",
}: JobShareMessageInput) {
  return `
*💼 Job Opportunity*

*${title}*

🏢 Company: ${company}
${location ? `📍 Location: ${location}\n` : ""}${
    type ? `📄 Type: ${type}\n` : ""
  }${workMode ? `🏠 Work Mode: ${workMode}\n` : ""}${
    experience ? `🎯 Experience: ${experience}\n` : ""
  }${salary ? `💰 Salary: ${salary}\n` : ""}

*View details & Apply 📌*
${url}

*📰 Published by: ${source}*
`.trim();
}

export function buildCourseShareMessage({
  title,
  platform,
  category,
  difficulty,
  duration,
  rating,
  students,
  price,
  url,
  source = "Free Foundry",
}: CourseShareMessageInput) {
  return `
*🎓 Free Course*

*${title}*

🏫 Platform: ${platform}
${category ? `📂 Category: ${category}\n` : ""}${
    difficulty ? `🎯 Level: ${difficulty}\n` : ""
  }${duration ? `⏱ Duration: ${duration}\n` : ""}${
    rating ? `⭐ Rating: ${rating}\n` : ""
  }${students ? `👥 Students: ${students.toLocaleString()}\n` : ""}${
    price ? `💰 Price: ${price === "0.00" ? "Free" : price}\n` : ""
  }

*Enroll now 📌*
${url}

*📰 Published by: ${source}*
`.trim();
}