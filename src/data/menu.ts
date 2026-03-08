export interface MenuItem {
  id: string;
  name: string;
  description?: string;
  price: number;
  category: string;
  image?: string;
  toppings?: string[];
  recommended?: boolean;
}

export interface MenuCategory {
  id: string;
  name: string;
  image: string;
  items: MenuItem[];
}

export const AVAILABLE_TOPPINGS = [
  "Kupus", "Zelena salata", "Majonez", "Pavlaka",
  "Kečap", "Senf", "Luk", "Urnebes", "Tucana", "Vegeta"
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
import punjenaNova from "@/assets/menu/punjena-vesalica-new.webp";
import beckaSnicla from "@/assets/menu/becka-snicla.webp";
import pileciMatak from "@/assets/menu/pileci-batak.webp";
import slanaPalacinka from "@/assets/menu/slana-palacinka.webp";
import slatkaPalacinka from "@/assets/menu/slatka-palacinka.webp";
import pomfritItemImg from "@/assets/menu/pomfrit.webp";
import cocaColaImg from "@/assets/menu/coca-cola.jpg";
import fantaImg from "@/assets/menu/fanta.jpg";
import spriteImg from "@/assets/menu/sprite.jpg";
import velikiSisImg from "@/assets/menu/veliki-sis.jpg";
import srednjiSisImg from "@/assets/menu/sis-novi.jpg";
import maliSisImg from "@/assets/menu/sis-novi.jpg";
import punjeniSisImg from "@/assets/menu/punjeni-sis.jpg";
import rosaImg from "@/assets/menu/rosa.jpg";

export const menuCategories: MenuCategory[] = [
  {
    id: "sis",
    name: "Šiš specijaliteti",
    image: sisImg,
    items: [
       { id: "sis-1", name: "Veliki šiš", description: "250g roštilj mesa, somun", price: 390, category: "sis", image: velikiSisImg },
       { id: "sis-2", name: "Srednji šiš", description: "200g roštilj mesa, somun", price: 350, category: "sis", image: srednjiSisImg },
       { id: "sis-3", name: "Mali šiš", description: "150g roštilj mesa, somun", price: 310, category: "sis", image: maliSisImg },
       { id: "sis-4", name: "Punjeni šiš", description: "250g roštilj mesa punjeno topljenim sirom, somun", price: 420, category: "sis", image: punjeniSisImg, recommended: true },
    ],
  },
  {
    id: "pljeskavice",
    name: "Pljeskavice",
    image: pljeskavicaImg,
    items: [
       { id: "plj-1", name: "Velika pljeskavica", description: "250g roštilj mesa, lepinja", price: 400, category: "pljeskavice", image: velikaPljImg },
       { id: "plj-2", name: "Mala pljeskavica", description: "150g roštilj mesa, lepinja", price: 320, category: "pljeskavice", image: malaPljImg },
       { id: "plj-3", name: "Gurmanska pljeskavica", description: "250g roštilj mesa puneno sa topljenim sirom i šunkom", price: 450, category: "pljeskavice", image: gurmanskaPljImg, recommended: true },
       { id: "plj-4", name: "Punjena pljeskavica", description: "250g roštilj mesa puneno sa topljenim sirom, lepinja", price: 470, category: "pljeskavice", image: punjenaPljImg },
       { id: "plj-5", name: "Leskovačka pljeskavica", description: "250g roštilj mesa pomešano sa crnim lukom i tucanom", price: 430, category: "pljeskavice", image: leskovackaPljImg },
    ],
  },
   {
     id: "ostali",
     name: "Ostali specijaliteti",
     image: glavnaJelaImg,
     items: [
       { id: "glv-1", name: "Pileće belo", description: "250g pilećeg filea", price: 400, category: "ostali", image: pohovanoBelo },
       { id: "glv-2", name: "Bela vešalica", description: "250g vešalice", price: 410, category: "ostali", image: punjenaVesalica, recommended: true },
       { id: "glv-3", name: "Punjena vešalica", description: "250g vešalice punjene topljenim sirom i slaninom", price: 480, category: "ostali", image: punjenaNova },
       { id: "glv-4", name: "Bečka šnicla", description: "250g šnicla", price: 360, category: "ostali", image: beckaSnicla },
       { id: "glv-5", name: "Pileći batak", description: "200g bataka", price: 330, category: "ostali", image: pileciMatak },
     ],
   },
  {
    id: "palacinke",
    name: "Palačinke",
    image: glavnaJelaImg,
    items: [
      { id: "pal-1", name: "Slana palačinka", description: "Palačinka: pečenica, kačkavalj, pavlaka i kečap", price: 350, category: "palacinke", image: slanaPalacinka },
      { id: "pal-2", name: "Slatka palačinka", description: "Palačinka: nutella i plazma", price: 360, category: "palacinke", image: slatkaPalacinka },
    ],
  },
  {
    id: "prilozi",
    name: "Prilozi",
    image: pomfritImg,
    items: [
      { id: "prl-1", name: "Pomfrit veliki", description: "250g rebrastog krompira", price: 300, category: "prilozi", image: pomfritItemImg },
      { id: "prl-2", name: "Pomfrit mali", description: "150g rebrastog krompira", price: 200, category: "prilozi", image: pomfritItemImg },
    ],
  },
  {
    id: "osvezenje",
    name: "Osveženje",
    image: osvezenjeImg,
    items: [
      { id: "osv-1", name: "Coca Cola", description: "0.5L", price: 110, category: "osvezenje", image: cocaColaImg },
      { id: "osv-2", name: "Fanta", description: "0.5L", price: 110, category: "osvezenje", image: fantaImg },
      { id: "osv-3", name: "Sprite", description: "0.5L", price: 110, category: "osvezenje", image: spriteImg },
      { id: "osv-4", name: "Rosa", description: "0.5L", price: 90, category: "osvezenje", image: rosaImg },
    ],
  },
];
