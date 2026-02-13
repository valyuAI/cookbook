"use client";

import { useState } from "react";
import { format, subDays } from "date-fns";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type DatePreset = "today" | "yesterday" | "7days" | "30days" | "custom";

interface DateSelectorProps {
  onDateChange: (startDate: string, endDate: string) => void;
}

export function DateSelector({ onDateChange }: DateSelectorProps) {
  const [activePreset, setActivePreset] = useState<DatePreset>("today");
  const [customDate, setCustomDate] = useState<Date | undefined>(undefined);

  const today = new Date();
  const todayStr = format(today, "yyyy-MM-dd");

  const presets: { label: string; value: DatePreset; days: number }[] = [
    { label: "Today", value: "today", days: 0 },
    { label: "Yesterday", value: "yesterday", days: 1 },
    { label: "7 days", value: "7days", days: 7 },
    { label: "30 days", value: "30days", days: 30 },
  ];

  const handlePresetClick = (preset: DatePreset, days: number) => {
    setActivePreset(preset);
    setCustomDate(undefined);
    const startDate = format(subDays(today, days), "yyyy-MM-dd");
    onDateChange(startDate, todayStr);
  };

  const handleCustomDateSelect = (date: Date | undefined) => {
    if (date) {
      setCustomDate(date);
      setActivePreset("custom");
      const selected = format(date, "yyyy-MM-dd");
      onDateChange(selected, todayStr);
    }
  };

  return (
    <div className="flex items-center gap-1.5 flex-wrap">
      {presets.map((preset) => (
        <Button
          key={preset.value}
          variant={activePreset === preset.value ? "default" : "ghost"}
          size="sm"
          onClick={() => handlePresetClick(preset.value, preset.days)}
          className={cn(
            "h-8 px-3 text-xs font-medium rounded-full transition-all",
            activePreset === preset.value
              ? "shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          {preset.label}
        </Button>
      ))}
      <div className="w-px h-5 bg-border mx-1" />
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={activePreset === "custom" ? "default" : "ghost"}
            size="sm"
            className={cn(
              "h-8 px-3 text-xs font-medium rounded-full gap-1.5 transition-all",
              activePreset === "custom"
                ? "shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <CalendarIcon className="h-3 w-3" />
            {customDate ? format(customDate, "MMM d, yyyy") : "Pick date"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={customDate}
            onSelect={handleCustomDateSelect}
            disabled={(date) => date > today}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
