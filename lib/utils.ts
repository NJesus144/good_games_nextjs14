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

export const generateAndSetRandomPrice = (itemId: string) => {
  const storedPrice = localStorage.getItem(`price_${itemId}`);

  if (storedPrice === null) {
    const randomPrice = generateRandomPrice();
    localStorage.setItem(`price_${itemId}`, JSON.stringify(randomPrice));

    return randomPrice;
  }

  return +storedPrice;
};

export function currencyFormat(currency: number){
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(currency)
}

export const handleError = (error: unknown) => {
  console.error(error)
  throw new Error(typeof error === 'string' ? error : JSON.stringify(error))
}

export function formatDate(dataUTC: string): string {
  const data = new Date(dataUTC);

  // Configurar o fuso horário para Brasília
  const options: Intl.DateTimeFormatOptions = {
      timeZone: 'America/Sao_Paulo',
      hour12: false, // Usar formato de 24 horas
      weekday: 'short', // Dia da semana abreviado
      year: 'numeric', // Ano com quatro dígitos
      month: '2-digit', // Mês com dois dígitos
      day: '2-digit', // Dia com dois dígitos
      hour: '2-digit', // Hora com dois dígitos
      minute: '2-digit', // Minuto com dois dígitos
      second: '2-digit', // Segundo com dois dígitos
  };

  // Formatar a data no formato desejado
  const dataFormatada: string = data.toLocaleString('pt-BR', options);
  return dataFormatada;
}