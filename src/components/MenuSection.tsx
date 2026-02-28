import { Plus } from "lucide-react";
import type { MenuCategory, MenuItem } from "@/data/menu";

interface MenuSectionProps {
  category: MenuCategory;
  onAddItem: (item: MenuItem) => void;
}

export function MenuSection({ category, onAddItem }: MenuSectionProps) {
  return (
    <section className="animate-slide-up">
      <div className="relative mb-4 h-40 overflow-hidden rounded-xl sm:h-48">
        <img
          src={category.image}
          alt={category.name}
          className="h-full w-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent" />
        <h2 className="absolute bottom-4 left-4 text-xl font-bold sm:text-2xl">
          {category.name}
        </h2>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {category.items.map((item) => (
          <button
            key={item.id}
            onClick={() => onAddItem(item)}
            className="food-card-shadow group flex items-center justify-between rounded-xl border border-border bg-card p-4 transition-all hover:border-primary/40 hover:bg-muted active:scale-[0.98]"
          >
            <div className="text-left">
              <p className="font-medium text-card-foreground">{item.name}</p>
              <p className="mt-1 text-lg font-bold text-primary">{item.price} RSD</p>
            </div>
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform group-hover:scale-110">
              <Plus className="h-5 w-5" />
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
