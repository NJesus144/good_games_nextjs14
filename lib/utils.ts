import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function changeRankMetacritic(metacritic: number) {
  if (metacritic >= 80) {
    return "border-primary";
  } else if (metacritic >= 60) {
    return "border-secondary";
  } else {
    return "border-tertiary";
  }
}

export const generateAndSetRandomPrice = (itemId: number) => {
  const randomPrice = Math.random() * (200 - 80) + 80;

  const storedPrice = localStorage.getItem(`price_${itemId}`);

  const storedPriceAsNumber = storedPrice ? parseFloat(storedPrice) : 0;

  if (!storedPrice) {
    localStorage.setItem(`price_${itemId}`, randomPrice.toFixed(2));
  }

  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(storedPriceAsNumber || randomPrice);
};
