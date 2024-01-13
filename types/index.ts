import { LucideIcon } from "lucide-react";

export interface SidebarLink {
  icon: LucideIcon;
  route: string;
  label: string;
}
// ======== GAMES PARAMS =========
export interface Platform {
  platform: {
    id: number;
    name: string;
    slug: string;
    image_background: string;
  };
}
export interface Genre {
  id: number;
  name: string;
  slug: string;
}

export interface Store {
  id: number;
  store: {
    id: number;
    name: string;
    slug: string;
    domain: string;
  };
}

export interface Developers {
  id: number;
  name: string;
  slug: string;
  image_background: string;
}


export interface Games{
  quantity: number;
  subtotal: number;
  price: number;
  slug: string;
  rating: number;
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

export interface GamePerUrl {
  count: number;
  next?: string;
  previous?: string;
  results: Games[];
}


// ======= USER PARAMS =========


export type CreateUserParams = {
  clerkId: string
  firstName: string
  lastName: string
  username: string
  email: string
  photo: string
}

export type UpdateUserParams = {
  firstName: string
  lastName: string
  username: string
  photo: string
}

// export interface GameDetails {
//   id: number;
//   name: string;
//   description: string;
//   metacritic: number;
//   released: Date;
//   background_image: string;
//   background_image_additional?: string;
//   developers?: Developers[];
//   platforms: Platform[];
//   stores?: Store[];
//   genres: Genre[];
// }

// export interface Games {
//   id: number;
//   slug: string;
//   name: string;
//   description: string;
//   released: Date;
//   background_image: string;
//   rating: number;
//   metacritic: number;
//   platforms: Platform[];
//   genres: Genre[];
// }

// export interface NewGamesDetails extends GamesWithPrice, GameDetails {
//   price: number;
//   slug: string;
//   rating: number;
// }


// export interface GamesWithPrice extends Games {
//   price: number;
// }
// interface Game {
//   id: number;
//   name: string;
//   description: string;
//   metacritic: number;
//   released: Date;
//   background_image: string;
//   background_image_additional?: string;
//   developers?: Developers[];
//   platforms: Platform[];
//   stores?: Store[];
//   genres: Genre[];
//   price: number;
//   slug: string;
//   rating: number;
// }