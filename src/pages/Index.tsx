import { useState } from "react";
import { Header } from "@/components/Header";
import { MenuSection } from "@/components/MenuSection";
import { CartDrawer } from "@/components/CartDrawer";
import { CheckoutModal } from "@/components/CheckoutModal";
import { ToppingsModal } from "@/components/ToppingsModal";
import { useCart } from "@/hooks/useCart";
import { menuCategories, type MenuItem } from "@/data/menu";
import heroImg from "@/assets/sis-hero.webp";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

const Index = () => {
  const cart = useCart();
  const navigate = useNavigate();
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [deliveryMode, setDeliveryMode] = useState<"delivery" | "pickup">("delivery");
  const [toppingsItem, setToppingsItem] = useState<MenuItem | null>(null);
  const [adminDialogOpen, setAdminDialogOpen] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");
  const [adminError, setAdminError] = useState("");

  const handleAdminSubmit = () => {
    if (adminPassword === "adminsis") {
      setAdminDialogOpen(false);
      setAdminPassword("");
      setAdminError("");
      navigate("/admin");
    } else {
      setAdminError("Pogrešna lozinka.");
    }
  };

  const handleAddWithToppings = (item: MenuItem) => {
    setToppingsItem(item);
  };

  const handleToppingsConfirm = (item: MenuItem, toppings: string[]) => {
    cart.addItem(item, toppings);
    setToppingsItem(null);
  };

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
          <p className="mt-2 text-muted-foreground">Naruči ukusnu hranu u samo par klikova!</p>
        </div>
      </section>

      {/* Menu */}
      <main className="container py-6">
        <div className="space-y-10">
          {menuCategories.map((cat) =>
          <MenuSection
            key={cat.id}
            category={cat}
            onAddItem={(item) => cart.addItem(item)}
            onAddWithToppings={handleAddWithToppings} />

          )}
        </div>
      </main>

      {/* O nama */}
      <section id="o-nama" className="scroll-mt-36 md:scroll-mt-28 border-t border-border bg-card py-12">
        <div className="container">
          <h2 className="mb-4 text-2xl font-bold">O nama</h2>
          <p className="max-w-2xl text-muted-foreground leading-relaxed">
            Top Šiš Fast Food je mesto gde se tradicija i ukus spajaju. Već godinama pružamo našim gostima
            najkvalitetnije šiš specijalitete, pljeskavice i ostala jela pripremljena sa ljubavlju i od
            svežih sastojaka. Naša misija je jednostavna — brza, ukusna i pristupačna hrana za sve.
          </p>
        </div>
      </section>

      {/* Lokacija */}
      <section id="lokacija" className="scroll-mt-36 md:scroll-mt-28 border-t border-border py-12">
        <div className="container">
          <h2 className="mb-4 text-2xl font-bold">Lokacija</h2>
          <div className="flex items-center gap-2 mb-4 text-muted-foreground">
            <MapPin className="h-5 w-5 text-primary" />
            <span>Strugarska 1a</span>
          </div>
          <div className="overflow-hidden rounded-xl border border-border">
            <iframe
              title="Top Šiš lokacija"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2830.5!2d20.46!3d44.82!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sStrugarska+1a!5e0!3m2!1ssr!2srs!4v1700000000000"
              width="100%"
              height="350"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade" />

          </div>
        </div>
      </section>

      {/* Kontakt */}
      <section id="kontakt" className="scroll-mt-36 md:scroll-mt-28 border-t border-border bg-card py-12">
        <div className="container">
          <h2 className="mb-6 text-2xl font-bold">Kontakt</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="flex items-center gap-3 rounded-xl border border-border bg-muted p-4">
              <Phone className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Telefon</p>
                <p className="font-medium">+381 64 5747 478</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-xl border border-border bg-muted p-4">
              <Mail className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium">info@topsis.rs</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-xl border border-border bg-muted p-4">
              <Clock className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Radno vreme</p>
                <p className="font-medium">08:00 - 23:00</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-muted py-8">
        <div className="container text-center text-sm text-muted-foreground space-y-2">
          <p>© {new Date().getFullYear()} Top Šiš Fast Food. Sva prava zadržana.</p>
          <p>Strugarska 1a · +381 XX XXX XXXX · info@topsis.rs</p>
          <p className="text-xs">Cene su izražene u RSD. Dostava se naplaćuje dodatno.</p>
          <button
            onClick={() => { setAdminDialogOpen(true); setAdminPassword(""); setAdminError(""); }}
            className="mt-2 text-xs text-muted-foreground/50 hover:text-muted-foreground transition-colors"
          >
            Admin
          </button>
        </div>
      </footer>

      {/* Admin password dialog */}
      <Dialog open={adminDialogOpen} onOpenChange={setAdminDialogOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Admin pristup</DialogTitle>
          </DialogHeader>
          <form
            onSubmit={(e) => { e.preventDefault(); handleAdminSubmit(); }}
            className="space-y-4"
          >
            <Input
              type="password"
              placeholder="Unesite lozinku"
              value={adminPassword}
              onChange={(e) => { setAdminPassword(e.target.value); setAdminError(""); }}
              autoFocus
            />
            {adminError && <p className="text-sm text-destructive">{adminError}</p>}
            <button
              type="submit"
              className="w-full rounded-lg bg-primary px-4 py-2 font-semibold text-primary-foreground hover:opacity-90 active:scale-95 transition-all"
            >
              Pristupi
            </button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Sticky Cart Bar (mobile) */}
      {cart.count > 0 && !cartOpen &&
      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-card/95 p-3 backdrop-blur-md sm:hidden">
          <button
          onClick={() => setCartOpen(true)}
          className="glow-primary flex w-full items-center justify-between rounded-xl bg-primary px-5 py-3 font-bold text-primary-foreground">

            <span>Pogledaj korpu ({cart.count})</span>
            <span>{cart.total} RSD</span>
          </button>
        </div>
      }

      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cart.items}
        total={cart.total}
        deliveryMode={deliveryMode}
        onDeliveryModeChange={setDeliveryMode}
        onAdd={(item) => cart.addItem(item, item.selectedToppings)}
        onRemove={cart.removeItem}
        onCheckout={() => {
          setCartOpen(false);
          setCheckoutOpen(true);
        }} />


      <ToppingsModal
        open={!!toppingsItem}
        item={toppingsItem}
        onClose={() => setToppingsItem(null)}
        onConfirm={handleToppingsConfirm} />


      <CheckoutModal
        open={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        total={cart.total}
        items={cart.items}
        deliveryMode={deliveryMode}
        onSubmit={() => {
          cart.clearCart();
          setCheckoutOpen(false);
        }} />

    </div>);

};

export default Index;