import React from "react";
import { Select, SelectItem } from "@nextui-org/react";

import { useRouter } from "next/navigation";

interface Props {
  filters: { id: number; name: string; value: string; slug: string }[];
  label: string;
  otherClasses?: string;
}

export default function SelectFilter({ filters, otherClasses, label }: Props) {
  const router = useRouter();

  return (
    <div className="flex w-full flex-wrap gap-2  md:flex-nowrap">
      <Select
        label={label}
        className={`${otherClasses} max-w-xs text-white max-xl:hidden` }
        variant="faded"
        size="sm"
      >
        {filters.map((filter) => (
          <SelectItem
            key={filter.id}
            value={filter.name}
            onClick={() => router.push(`/games/${filter.value}/${filter.slug}`)}
          >
            {filter.name}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
}
