import React from "react";
import { Select, SelectItem } from "@nextui-org/react";

import { useRouter } from "next/navigation";

interface Props {
  filters: { id: number; name: string; value: string; slug: string }[];
  otherClasses?: string;
}

export default function SelectFilter({ filters, otherClasses }: Props) {
  const router = useRouter();

  return (
    <div className="flex w-full flex-wrap gap-2  md:flex-nowrap">
      <Select
        label="Select a genre"
        className={`${otherClasses} max-w-xs text-white max-xl:hidden` }
        variant="faded"
        size="sm"
      >
        {filters.map((filter) => (
          <SelectItem
            key={filter.id}
            value={filter.name}
            onClick={() => router.push(`/genre/${filter.slug}`)}
          >
            {filter.name}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
}
