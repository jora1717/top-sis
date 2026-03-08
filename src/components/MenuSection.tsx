import { Plus, Star } from "lucide-react";
import type { MenuCategory, MenuItem } from "@/data/menu";

interface MenuSectionProps {
  category: MenuCategory;
  onAddItem: (item: MenuItem) => void;
  onAddWithToppings?: (item: MenuItem) => void;
}

const CATEGORIES_WITH_TOPPINGS = ["pljeskavice", "sis", "ostali"];

export function MenuSection({ category, onAddItem, onAddWithToppings }: MenuSectionProps) {
  const handleClick = (item: MenuItem) => {
    if (CATEGORIES_WITH_TOPPINGS.includes(item.category) && onAddWithToppings) {
      onAddWithToppings(item);
    } else {
      onAddItem(item);
    }
  };

  return (
    <section className="animate-slide-up">
      <h2 className="mb-4 text-xl font-bold sm:text-2xl">{category.name}</h2>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {category.items.map((item) =>
        <button
          key={item.id}
          onClick={() => handleClick(item)}
          className="food-card-shadow group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-all duration-150 hover:border-primary/60 hover:shadow-[0_0_16px_hsl(8_85%_56%/0.25)] hover:bg-muted active:scale-[0.98]">
          
             <div className="relative aspect-square w-full overflow-hidden bg-muted">
               {item.image ?
             <img
               src={item.image}
               alt={item.name}
               className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
               loading="lazy" /> :
 
 
             <div className="flex h-full w-full items-center justify-center text-3xl text-muted-foreground/40">
                   🍽️
                 </div>
             }
               {item.recommended && (
                 <div className="absolute top-2 right-2 flex items-center gap-1 bg-primary text-primary-foreground rounded-full px-2 py-1 text-xs font-semibold">
                   <Star className="h-3 w-3 fill-primary-foreground" />
                   Preporučujemo
                 </div>
               )}
               <div className="absolute bottom-2 right-2 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground opacity-0 transition-all group-hover:opacity-100 group-hover:scale-110">
                 <Plus className="h-4 w-4" />
               </div>
             </div>
            <div className="p-3 text-left">
              <p className="text-card-foreground leading-tight text-xl font-semibold">{item.name}</p>
              {item.description &&
            <p className="mt-0.5 text-xs text-muted-foreground leading-snug line-clamp-2">{item.description}</p>
            }
              <p className="mt-1 text-base font-bold text-primary">{item.price} RSD</p>
            </div>
          </button>
        )}
      </div>
    </section>);

}