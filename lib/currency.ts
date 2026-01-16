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


// lib/currency.ts

export const formatSalary = (
  salary?: string | number,
  currency: string = "USD",
  salaryType?: string
) => {
  if (!salary) return "Salary not disclosed";

  const numericSalary =
    typeof salary === "string"
      ? Number(salary.replace(/,/g, ""))
      : salary;

  // if (isNaN(numericSalary)) return "Salary not disclosed";

  const formatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(numericSalary);

  const suffix = salaryType ? ` / ${salaryType}` : "";

  return `${formatted}${suffix}`;
};

