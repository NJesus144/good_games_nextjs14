import { LucideIcon } from 'lucide-react';


export interface SidebarLink {
  icon: LucideIcon;
  route: string;
  label: string;
}

export interface Platform {
  platform: {
    id: number;
    name: string;
    slug: string;
    image_background: string;

  }
}

export interface Game {
  id: number;
  name: string;
  description: string;
  released: string;
  background_image: string;
  rating: number;
  released: string;
  metacritic: number;
  platforms: Platform[];
}