// lib/currency.ts
export const currencySymbols: Record<string, string> = {
  NGN: "₦",
  USD: "$",
  EUR: "€",
  GBP: "£",
  INR: "₹",
  AUD: "A$",
  CAD: "C$",
};


export const formatSalary = (
  salary?: string,
  currency?: string,
  salaryType?: string
) => {
  if (!salary) return "Salary not disclosed";

  const symbol = currencySymbols[currency || ""] || "";
  const suffix = salaryType ? ` / ${salaryType}` : "";

  return `${symbol}${salary}${suffix}`;
};
