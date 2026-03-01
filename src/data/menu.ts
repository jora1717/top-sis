export interface MenuItem {
  id: string;
  name: string;
  price: number;
  category: string;
  image?: string;
  toppings?: string[];
}

export interface MenuCategory {
  id: string;
  name: string;
  image: string;
  items: MenuItem[];
}

export const AVAILABLE_TOPPINGS = [
  "Kupus", "Zelena salata", "Majonez", "Pavlaka",
  "Kečap", "Senf", "Luk", "Urnebes", "Tucana"
];

import sisImg from "@/assets/sis-hero.webp";
import pljeskavicaImg from "@/assets/pljeskavica.webp";
import glavnaJelaImg from "@/assets/glavna-jela.webp";
import pomfritImg from "@/assets/pomfrit.webp";
import osvezenjeImg from "@/assets/osvezenje.webp";

// Menu item images
import velikaPljImg from "@/assets/menu/velika-pljeskavica.webp";
import malaPljImg from "@/assets/menu/mala-pljeskavica.webp";
import gurmanskaPljImg from "@/assets/menu/gurmanska-pljeskavica.webp";
import punjenaPljImg from "@/assets/menu/punjena-pljeskavica.webp";
import leskovackaPljImg from "@/assets/menu/leskovacka-pljeskavica.webp";
import pohovanoBelo from "@/assets/menu/pohovano-belo.webp";
import punjenaVesalica from "@/assets/menu/punjena-vesalica.webp";
import slanaPalacinka from "@/assets/menu/slana-palacinka.webp";
import slatkaPalacinka from "@/assets/menu/slatka-palacinka.webp";
import pomfritItemImg from "@/assets/menu/pomfrit.webp";
import cocaColaImg from "@/assets/menu/coca-cola.jpg";
import fantaImg from "@/assets/menu/fanta.jpg";
import spriteImg from "@/assets/menu/sprite.jpg";

export const menuCategories: MenuCategory[] = [
  {
    id: "sis",
    name: "Šiš specijaliteti",
    image: sisImg,
    items: [
      { id: "sis-1", name: "Veliki šiš", price: 390, category: "sis" },
      { id: "sis-2", name: "Srednji šiš", price: 350, category: "sis" },
      { id: "sis-3", name: "Mali šiš", price: 310, category: "sis" },
      { id: "sis-4", name: "Punjeni šiš", price: 420, category: "sis" },
    ],
  },
  {
    id: "pljeskavice",
    name: "Pljeskavice",
    image: pljeskavicaImg,
    items: [
      { id: "plj-1", name: "Velika pljeskavica", price: 400, category: "pljeskavice", image: velikaPljImg },
      { id: "plj-2", name: "Mala pljeskavica", price: 320, category: "pljeskavice", image: malaPljImg },
      { id: "plj-3", name: "Gurmanska pljeskavica", price: 450, category: "pljeskavice", image: gurmanskaPljImg },
      { id: "plj-4", name: "Punjena pljeskavica", price: 470, category: "pljeskavice", image: punjenaPljImg },
      { id: "plj-5", name: "Leskovačka pljeskavica", price: 430, category: "pljeskavice", image: leskovackaPljImg },
    ],
  },
  {
    id: "ostali",
    name: "Ostali specijaliteti",
    image: glavnaJelaImg,
    items: [
      { id: "glv-1", name: "Pohovano belo", price: 400, category: "ostali", image: pohovanoBelo },
      { id: "glv-2", name: "Punjena vešalica", price: 410, category: "ostali", image: punjenaVesalica },
    ],
  },
  {
    id: "palacinke",
    name: "Palačinke",
    image: glavnaJelaImg,
    items: [
      { id: "pal-1", name: "Slana palačinka", price: 350, category: "palacinke", image: slanaPalacinka },
      { id: "pal-2", name: "Slatka palačinka", price: 360, category: "palacinke", image: slatkaPalacinka },
    ],
  },
  {
    id: "prilozi",
    name: "Prilozi",
    image: pomfritImg,
    items: [
      { id: "prl-1", name: "Pomfrit veliki", price: 300, category: "prilozi", image: pomfritItemImg },
      { id: "prl-2", name: "Pomfrit mali", price: 200, category: "prilozi", image: pomfritItemImg },
    ],
  },
  {
    id: "osvezenje",
    name: "Osveženje",
    image: osvezenjeImg,
    items: [
      { id: "osv-1", name: "Coca Cola", price: 110, category: "osvezenje", image: cocaColaImg },
      { id: "osv-2", name: "Fanta", price: 110, category: "osvezenje", image: fantaImg },
      { id: "osv-3", name: "Sprite", price: 110, category: "osvezenje", image: spriteImg },
    ],
  },
];
