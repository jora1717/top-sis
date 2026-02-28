import { Plus } from "lucide-react";
import type { MenuCategory, MenuItem } from "@/data/menu";

interface MenuSectionProps {
  category: MenuCategory;
  onAddItem: (item: MenuItem) => void;
}

export function MenuSection({ category, onAddItem }: MenuSectionProps) {
  return (
    <section className="animate-slide-up">
      <h2 className="mb-4 text-xl font-bold sm:text-2xl">{category.name}</h2>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {category.items.map((item) => (
          <button
            key={item.id}
            onClick={() => onAddItem(item)}
            className="food-card-shadow group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-all hover:border-primary/40 hover:bg-muted active:scale-[0.98]"
          >
            {/* Image placeholder */}
            <div className="relative aspect-square w-full bg-muted">
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-3xl text-muted-foreground/40">
                  🍽️
                </div>
              )}
              <div className="absolute bottom-2 right-2 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground opacity-0 transition-all group-hover:opacity-100 group-hover:scale-110">
                <Plus className="h-4 w-4" />
              </div>
            </div>
            <div className="p-3 text-left">
              <p className="text-sm font-medium text-card-foreground leading-tight">{item.name}</p>
              <p className="mt-1 text-base font-bold text-primary">{item.price} RSD</p>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
