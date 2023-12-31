import { LucideIcon } from "lucide-react";

export interface SidebarLink {
  icon: LucideIcon;
  route: string;
  label: string;
}

interface Platform {
  platform: {
    id: number;
    name: string;
    slug: string;
    image_background: string;
  };
}
interface Genre {
  id: number;
  name: string;
  slug: string;
}

export interface Games {
  id: number;
  slug: string;
  name: string;
  description: string;
  released: Date;
  background_image: string;
  rating: number;
  metacritic: number;
  platforms: Platform[];
  genres: Genre[];
}

interface Store {
  id: number;
  store: {
    id: number;
    name: string;
    slug: string;
    domain: string;
  };
}

interface Developers {
  id: number;
  name: string;
  slug: string;
  image_background: string;
}

export interface GameDetails {
  id: number;
  name: string;
  description: string;
  metacritic: number;
  released: Date;
  background_image: string;
  background_image_additional?: string;
  developers?: Developers[];
  platforms: Platform[];
  stores?: Store[];
  genres: Genre[];
}

export interface GamesWithPrice extends Games {
  price: number;
}

export interface NewGamesDetails extends GamesWithPrice, GameDetails {
  price: number;
  slug: string;
  rating: number;
}

export interface GamePerUrl {
  count: number;
  next?: string;
  previous?: string;
  results: NewGamesDetails[];
}
