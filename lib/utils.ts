import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function changeRankMetacritic(metacritic: number) {
  console.log(metacritic);

  if (metacritic >= 80) {
    return "border-primary";
  } else if (metacritic >= 60) {
    return "border-secondary";
  } else {
    return "border-tertiary";
  }
}
