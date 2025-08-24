import { CheckCircle } from "lucide-react";

export function TargetAudienceCard({
  icon,
  title,
  bullets,
}: {
  icon: React.ReactNode;
  title: string;
  bullets: string[];
}) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      <div className="flex items-center mb-4">
        <div className="bg-blue-100 p-2 rounded-lg mr-4">{icon}</div>
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      <ul className="space-y-2 text-gray-600">
        {bullets.map((b) => (
          <li key={b} className="flex items-center">
            <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
