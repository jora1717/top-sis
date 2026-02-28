export interface MenuItem {
  id: string;
  name: string;
  price: number;
  category: string;
  image?: string;
}

export interface MenuCategory {
  id: string;
  name: string;
  image: string;
  items: MenuItem[];
}

import sisImg from "@/assets/sis-hero.webp";
import pljeskavicaImg from "@/assets/pljeskavica.webp";
import glavnaJelaImg from "@/assets/glavna-jela.webp";
import pomfritImg from "@/assets/pomfrit.webp";
import osvezenjeImg from "@/assets/osvezenje.webp";

export const menuCategories: MenuCategory[] = [
  {
    id: "sis",
    name: "Šiš Specijaliteti",
    image: sisImg,
    items: [
      { id: "sis-1", name: "Veliki šiš", price: 390, category: "sis" },
      { id: "sis-2", name: "Srednji šiš", price: 350, category: "sis" },
      { id: "sis-3", name: "Mali šiš", price: 310, category: "sis" },
    ],
  },
  {
    id: "pljeskavice",
    name: "Pljeskavice",
    image: pljeskavicaImg,
    items: [
      { id: "plj-1", name: "Velika pljeskavica", price: 400, category: "pljeskavice" },
      { id: "plj-2", name: "Mala pljeskavica", price: 320, category: "pljeskavice" },
      { id: "plj-3", name: "Gurmanska pljeskavica", price: 450, category: "pljeskavice" },
      { id: "plj-4", name: "Punjena pljeskavica", price: 470, category: "pljeskavice" },
      { id: "plj-5", name: "Leskovačka pljeskavica", price: 430, category: "pljeskavice" },
    ],
  },
  {
    id: "glavna",
    name: "Glavna jela i deserti",
    image: glavnaJelaImg,
    items: [
      { id: "glv-1", name: "Pohovano belo", price: 400, category: "glavna" },
      { id: "glv-2", name: "Punjena vešalica", price: 410, category: "glavna" },
      { id: "glv-3", name: "Slana palačinka", price: 350, category: "glavna" },
      { id: "glv-4", name: "Slatka palačinka", price: 360, category: "glavna" },
    ],
  },
  {
    id: "prilozi",
    name: "Prilozi",
    image: pomfritImg,
    items: [
      { id: "prl-1", name: "Pomfrit veliki", price: 300, category: "prilozi" },
      { id: "prl-2", name: "Pomfrit mali", price: 200, category: "prilozi" },
    ],
  },
  {
    id: "osvezenje",
    name: "Osveženje",
    image: osvezenjeImg,
    items: [
      { id: "osv-1", name: "Coca Cola", price: 110, category: "osvezenje" },
      { id: "osv-2", name: "Fanta", price: 110, category: "osvezenje" },
      { id: "osv-3", name: "Sprite", price: 110, category: "osvezenje" },
    ],
  },
];
