
import React from "react";
import { Select, SelectItem } from "@nextui-org/react";

import { useRouter } from "next/navigation";

interface Props {
  filters: { id: number; name: string; value: string }[];
}

export default function SelectFilter({ filters }: Props) {
  const router = useRouter();

  return (
    <div className="flex w-full flex-wrap gap-2  md:flex-nowrap">
      <Select label="Select a platform" className="max-w-xs text-white" variant="faded">
        {filters.map((filter) => (
          <SelectItem
            key={filter.id}
            value={filter.name}
            onClick={() => router.push(`/platform/${filter.id}`)}
          >
            {filter.name}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
}

