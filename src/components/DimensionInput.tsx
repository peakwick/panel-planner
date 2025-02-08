
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface DimensionInputProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  unit?: string;
}

export const DimensionInput: React.FC<DimensionInputProps> = ({
  label,
  value,
  onChange,
  unit = "cm",
}) => {
  return (
    <div className="flex flex-col space-y-1.5">
      <Label htmlFor={label.toLowerCase()}>{label}</Label>
      <div className="relative">
        <Input
          id={label.toLowerCase()}
          type="number"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="pr-12"
          min={0}
        />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-secondary">
          {unit}
        </span>
      </div>
    </div>
  );
};
