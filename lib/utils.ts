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

const generateRandomPrice = (): number => {
  return +(Math.random() * (200 - 80) + 80).toFixed(2);
};

export const generateAndSetRandomPrice = (itemId: number): number => {
  const storedPrice = localStorage.getItem(`price_${itemId}`);

  if (storedPrice === null) {
    const randomPrice = generateRandomPrice();
    const formattedRandomPrice = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(randomPrice);

    localStorage.setItem(`price_${itemId}`, formattedRandomPrice);

    return randomPrice;
  }

  return +storedPrice;
};


// const generateRandomPrice = () => {
//   return (Math.random() * (200 - 80) + 80).toFixed(2);
// };

// export const generateAndSetRandomPrice = (itemId: number) => {
//   const storedPrice = localStorage.getItem(`price_${itemId}`);

//   if (storedPrice === null) {
//     const randomPrice = generateRandomPrice();
//     const formattedRandomPrice = new Intl.NumberFormat("pt-BR", {
//       style: "currency",
//       currency: "BRL",
//       minimumFractionDigits: 2,
//       maximumFractionDigits: 2,
//     }).format(randomPrice);

//     localStorage.setItem(`price_${itemId}`, formattedRandomPrice);

//     return formattedRandomPrice;
//   }

//   return storedPrice;
// };




