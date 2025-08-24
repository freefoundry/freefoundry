import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";

type CheckItem = {
  id: string;
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
};

export function FilterGroup({
  searchPlaceholder,
  searchValue,
  onSearchChange,
  sections,
  clearVisible,
  onClear,
}: {
  searchPlaceholder: string;
  searchValue: string;
  onSearchChange: (v: string) => void;
  sections: { title: string; items: CheckItem[] }[];
  clearVisible?: boolean;
  onClear?: () => void;
}) {
  return (
    <Card>
      <CardContent className="p-6">
        {/* Search */}
        <div className="mb-6">
          <Label htmlFor="search" className="text-sm font-medium mb-2 block">
            Search
          </Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              id="search"
              placeholder={searchPlaceholder}
              value={searchValue}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {sections.map((s) => (
          <div key={s.title} className="mb-6">
            <Label className="text-sm font-medium mb-3 block">{s.title}</Label>
            <div className="space-y-2">
              {s.items.map((it) => (
                <div key={it.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={it.id}
                    checked={it.checked}
                    onCheckedChange={(c) => it.onChange(Boolean(c))}
                  />
                  <Label htmlFor={it.id} className="text-sm">
                    {it.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        ))}

        {clearVisible && onClear && (
          <Button
            variant="outline"
            onClick={onClear}
            className="w-full bg-transparent"
          >
            <X className="h-4 w-4 mr-2" /> Clear All Filters
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
