"use client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, SlidersHorizontal } from "lucide-react";

export function ToggleFiltersButton({
  activeCount,
  open,
  onToggle,
}: {
  activeCount: number;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <Button
      variant="outline"
      onClick={onToggle}
      className="w-full justify-between"
    >
      <div className="flex items-center">
        <SlidersHorizontal className="h-4 w-4 mr-2" />
        Filters
        {activeCount > 0 && (
          <Badge variant="secondary" className="ml-2">
            {activeCount}
          </Badge>
        )}
      </div>
      <ChevronDown
        className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
      />
    </Button>
  );
}
