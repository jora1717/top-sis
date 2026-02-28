import { ShoppingCart } from "lucide-react";

interface HeaderProps {
  cartCount: number;
  onCartClick: () => void;
}

export function Header({ cartCount, onCartClick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🔥</span>
          <h1 className="text-xl font-bold tracking-tight">
            Top Šiš <span className="text-primary">Fast Food</span>
          </h1>
        </div>
        <button
          onClick={onCartClick}
          className="relative flex items-center gap-2 rounded-lg bg-primary px-4 py-2 font-semibold text-primary-foreground transition-all hover:opacity-90 active:scale-95"
        >
          <ShoppingCart className="h-5 w-5" />
          <span className="hidden sm:inline">Korpa</span>
          {cartCount > 0 && (
            <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-xs font-bold text-accent-foreground animate-pop">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
