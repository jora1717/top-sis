import { ShoppingCart, Menu, X } from "lucide-react";
import { useState } from "react";
import logoImg from "@/assets/logo.webp";

interface HeaderProps {
  cartCount: number;
  onCartClick: () => void;
}

const navLinks = [
  { label: "O nama", href: "#o-nama" },
  { label: "Lokacija", href: "#lokacija" },
  { label: "Kontakt", href: "#kontakt" },
];


export function Header({ cartCount, onCartClick }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        const el = document.querySelector<HTMLElement>(href);
        if (!el) return;
        const headerHeight = document.querySelector("header")?.getBoundingClientRect().height ?? 0;
        const top = el.getBoundingClientRect().top + window.scrollY - (headerHeight + 16);
        window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
      });
    });
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border backdrop-blur-md" style={{ backgroundColor: '#110d0c' }}>
      <div className="container flex h-24 items-center justify-between">
        <button onClick={() => window.location.href = "/"} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <img alt="Top Šiš Fast Food logo" className="h-20 w-20 object-contain" src="/lovable-uploads/ea1247f1-76ef-41f6-af1f-68afea8b61b1.png" />
          <h1 className="text-xl font-bold tracking-tight">
            Top Šiš <span className="text-primary">Fast Food</span>
          </h1>
        </button>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) =>
          <button
            key={link.href}
            onClick={() => handleNavClick(link.href)}
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">

              {link.label}
            </button>
          )}
          <button
            onClick={onCartClick}
            className="relative flex items-center gap-2 rounded-lg bg-primary px-4 py-2 font-semibold text-primary-foreground transition-all hover:opacity-90 active:scale-95">

            <ShoppingCart className="h-5 w-5" />
            <span>Korpa</span>
            {cartCount > 0 &&
            <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-xs font-bold text-accent-foreground animate-pop">
                {cartCount}
              </span>
            }
          </button>
        </nav>

        {/* Mobile buttons */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={onCartClick}
            className="relative flex items-center gap-2 rounded-lg bg-primary px-3 py-2 font-semibold text-primary-foreground transition-all hover:opacity-90 active:scale-95">

            <ShoppingCart className="h-5 w-5" />
            {cartCount > 0 &&
            <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-xs font-bold text-accent-foreground animate-pop">
                {cartCount}
              </span>
            }
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-lg p-2 text-muted-foreground hover:bg-muted">

            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen &&
      <div className="border-t border-border bg-card p-4 md:hidden">
          {navLinks.map((link) =>
        <button
          key={link.href}
          onClick={() => handleNavClick(link.href)}
          className="block w-full py-3 text-left text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">

              {link.label}
            </button>
        )}
        </div>
      }
    </header>);

}