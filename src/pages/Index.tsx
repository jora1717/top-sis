import { useState } from "react";
import { Header } from "@/components/Header";
import { DeliveryToggle } from "@/components/DeliveryToggle";
import { MenuSection } from "@/components/MenuSection";
import { CartDrawer } from "@/components/CartDrawer";
import { CheckoutModal } from "@/components/CheckoutModal";
import { useCart } from "@/hooks/useCart";
import { menuCategories } from "@/data/menu";
import heroImg from "@/assets/sis-hero.webp";

const Index = () => {
  const cart = useCart();
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [deliveryMode, setDeliveryMode] = useState<"delivery" | "pickup">("delivery");

  return (
    <div className="min-h-screen bg-background">
      <Header cartCount={cart.count} onCartClick={() => setCartOpen(true)} />

      {/* Hero */}
      <section className="relative h-56 overflow-hidden sm:h-72">
        <img src={heroImg} alt="Top Šiš Fast Food specijaliteti" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        <div className="absolute bottom-6 left-0 right-0 container">
          <h2 className="text-3xl font-bold sm:text-4xl">
            Brza hrana,<br />
            <span className="text-primary">pravi ukus.</span>
          </h2>
          <p className="mt-2 text-muted-foreground">Naruči za par klikova 🔥</p>
        </div>
      </section>

      {/* Controls */}
      <div className="container mt-6">
        <DeliveryToggle mode={deliveryMode} onChange={setDeliveryMode} />
      </div>

      {/* Menu */}
      <main className="container py-6">
        <div className="space-y-10">
          {menuCategories.map((cat) => (
            <MenuSection key={cat.id} category={cat} onAddItem={cart.addItem} />
          ))}
        </div>
      </main>

      {/* Sticky Cart Bar (mobile) */}
      {cart.count > 0 && !cartOpen && (
        <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-card/95 p-3 backdrop-blur-md sm:hidden">
          <button
            onClick={() => setCartOpen(true)}
            className="glow-primary flex w-full items-center justify-between rounded-xl bg-primary px-5 py-3 font-bold text-primary-foreground"
          >
            <span>Pogledaj korpu ({cart.count})</span>
            <span>{cart.total} RSD</span>
          </button>
        </div>
      )}

      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cart.items}
        total={cart.total}
        onAdd={cart.addItem}
        onRemove={cart.removeItem}
        onCheckout={() => {
          setCartOpen(false);
          setCheckoutOpen(true);
        }}
      />

      <CheckoutModal
        open={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        total={cart.total}
        deliveryMode={deliveryMode}
        onSubmit={() => {
          cart.clearCart();
          setCheckoutOpen(false);
        }}
      />
    </div>
  );
};

export default Index;
