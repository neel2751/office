"use client";

import * as React from "react";
import { Check, ChevronsUpDown, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
export function ComboboxDemo({
  value,
  onChange,
  frameworks,
  placeholder,
  noData,
}) {
  const [open, setOpen] = React.useState(false);
  const handleSetValue = (frameworkValue) => {
    const newValue = value.includes(frameworkValue)
      ? value.filter((val) => val !== frameworkValue) // Remove if already selected
      : [...value, frameworkValue]; // Add if not selected
    onChange(newValue);
  };
  const handleOpenChange = (newOpen) => setOpen(newOpen);

  const handleRemoveEmployee = (employeeValue) => {
    onChange(value.filter((val) => val !== employeeValue));
  };
  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={`w-full justify-between h-auto  ${
            value?.length > 0 ? "text-neutral-900" : "text-neutral-500"
          }`}
        >
          <div className="flex gap-2 justify-start w-full flex-wrap">
            {value?.length > 0
              ? value.map((val, i) => (
                  <div
                    key={i}
                    className="px-2 py-1 rounded-xl border bg-slate-200 text-xs font-medium flex items-center gap-1"
                  >
                    {
                      frameworks.find((framework) => framework.value === val)
                        ?.label
                    }
                    <X
                      onClick={() => handleRemoveEmployee(val)}
                      className=" size-4"
                    />
                  </div>
                ))
              : placeholder
              ? placeholder
              : "Select..."}
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="max-w-max p-0">
        <Command
          filter={(value, search) => {
            const item = frameworks.find((item) => item.value === value);
            if (!item) return 0;
            if (item.label.toLowerCase().includes(search.toLowerCase()))
              return 1;

            return 0;
          }}
        >
          <CommandInput placeholder="Search framework..." />
          <CommandList>
            <CommandEmpty>{noData ? noData : "No Data found."}</CommandEmpty>
            <CommandGroup>
              {/* <CommandList> */}
              {frameworks?.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={() => {
                    handleSetValue(framework.value);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value.includes(framework.value)
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                  {framework.label}
                </CommandItem>
              ))}
              {/* </CommandList> */}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
