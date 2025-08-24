import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export function FeatureCard({
  icon,
  title,
  description,
  href,
  linkText,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
  linkText: React.ReactNode;
}) {
  return (
    <Card className="overflow-hidden border-t-4 border-t-blue-600 hover:shadow-md transition-shadow">
      <CardContent className="p-6 text-center flex flex-col items-center">
        <div className="bg-blue-100 p-3 rounded-full mb-4">{icon}</div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <Link
          href={href}
          className="text-blue-600 hover:text-blue-700 inline-flex items-center font-medium"
        >
          {linkText}
        </Link>
      </CardContent>
    </Card>
  );
}
