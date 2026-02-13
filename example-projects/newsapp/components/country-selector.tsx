"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { countries } from "@/lib/countries";
import { Globe } from "lucide-react";

interface CountrySelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export function CountrySelector({ value, onChange }: CountrySelectorProps) {
  const selected = countries.find((c) => c.code === value);

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[210px] h-9 bg-card border-border/80 shadow-sm text-sm">
        <div className="flex items-center gap-2">
          <Globe className="h-3.5 w-3.5 text-muted-foreground" />
          <SelectValue>
            {selected && (
              <span>
                {selected.flag} {selected.name}
              </span>
            )}
          </SelectValue>
        </div>
      </SelectTrigger>
      <SelectContent>
        {countries.map((country) => (
          <SelectItem key={country.code} value={country.code}>
            <span className="flex items-center gap-2">
              <span>{country.flag}</span>
              <span>{country.name}</span>
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
