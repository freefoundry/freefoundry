import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CheckCircle } from "lucide-react";

type Props = {
  title: React.ReactNode;
  subtitle: string;
  primaryHref: string;
  primaryText: string;
  secondaryText?: string;
  secondaryOnClick?: () => void;
  imageSrc: string;
  badgeText?: string;
};
export function Hero({
  title,
  subtitle,
  primaryHref,
  primaryText,
  secondaryText,
  secondaryOnClick,
  imageSrc,
  badgeText,
}: Props) {
  return (
    <section className="relative py-16 overflow-hidden">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-8 md:mb-0">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            {title}
          </h1>
          <p className="text-lg text-gray-600 mb-6 max-w-md">{subtitle}</p>
          <div className="flex flex-wrap gap-3">
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Link href={primaryHref}>{primaryText}</Link>
            </Button>
            {secondaryText && (
              <Button variant="outline" onClick={secondaryOnClick}>
                {secondaryText}
              </Button>
            )}
          </div>
        </div>

        <div className="md:w-1/2 relative">
          <div className="rounded-full overflow-hidden border-8 border-white shadow-xl">
            <img
              src={imageSrc}
              alt=""
              className="w-full h-[350px] sm:h-[650px] object-cover "
            />
          </div>
          {badgeText && (
            <div className="absolute -bottom-2 -left-4 bg-blue-100 rounded-lg p-3 shadow-md">
              <div className="flex items-center space-x-2">
                <div className="bg-blue-600 rounded-full p-1.5">
                  <CheckCircle className="h-5 w-5 text-white" />
                </div>
                <span className="font-medium text-blue-800">{badgeText}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
