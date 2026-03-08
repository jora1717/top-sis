import { useState } from "react";
import { Header } from "@/components/Header";
import { MenuSection } from "@/components/MenuSection";
import { CartDrawer } from "@/components/CartDrawer";
import { CheckoutModal } from "@/components/CheckoutModal";
import { ToppingsModal } from "@/components/ToppingsModal";
import { useCart } from "@/hooks/useCart";
import { menuCategories, type MenuItem } from "@/data/menu";
import heroImg from "@/assets/hero-grill.jpg";
import { MapPin, Phone, Mail, Clock, Timer, Rocket, ClipboardList, BadgeDollarSign, ShieldCheck } from "lucide-react";
import { ReviewBlock } from "@/components/ReviewBlock";
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
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/30" />
        <div className="absolute bottom-6 left-0 right-0 container">
          <div>
            <h2 className="text-3xl font-bold sm:text-5xl" style={{ textShadow: '0 0 12px rgba(0,0,0,0.9), 0 2px 6px rgba(0,0,0,0.8), 1px 1px 0 rgba(0,0,0,0.6)' }}>
              Brza hrana,<br />
              <span className="text-primary">pravi ukus.</span>
            </h2>
            <p className="mt-2 text-muted-foreground drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]">Naruči ukusnu hranu u samo par klikova!</p>
            <button
              onClick={() => {
                const el = document.getElementById("sis");
                if (!el) return;
                const headerH = document.querySelector("header")?.getBoundingClientRect().height ?? 0;
                window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - (headerH + 16), behavior: "smooth" });
              }}
              className="mt-4 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-bold text-primary-foreground transition-all hover:opacity-90 active:scale-95 glow-primary">
              PORUČI ODMAH
            </button>
          </div>
        </div>
      </section>

      {/* Menu */}
      <main className="container py-6">
        {/* Zašto baš mi? */}
        <section id="zasto-mi" className="scroll-mt-36 md:scroll-mt-28 mb-10">
          <h2 className="mb-2 text-2xl font-bold sm:text-3xl">Zašto baš mi?</h2>
          <p className="mb-6 max-w-lg text-muted-foreground">Razlozi zašto nas naši gosti biraju iznova i iznova.</p>
          <div className="space-y-4">
            {[
            { icon: Timer, title: "Štedimo vaše vreme", text: "Naš sajt je dizajniran tako da vas od ulaska do potvrđene narudžbine dele samo nekoliko klikova. Štedimo vaše vreme jer znamo koliko je dragoceno." },
            { icon: Rocket, title: "Brza i efikasna dostava", text: "Fokusirani smo na maksimalnu brzinu kako bi vaša hrana stigla topla i sveža, direktno do vašeg praga ili kancelarije." },
            { icon: ClipboardList, title: "Jasna i pregledna ponuda", text: "Zaboravite na nepregledne i komplikovane menije. Kod nas je izbor brz, jednostavan i bez skrivenih komplikacija." },
            { icon: BadgeDollarSign, title: "Vrhunski kvalitet po fer ceni", text: "Spajamo visok standard kvaliteta hrane sa cenama koje su prilagođene studentima i mladim zaposlenim ljudima." },
            { icon: ShieldCheck, title: "Transparentnost i sigurnost", text: "U svakom trenutku znate šta dobijate, koliko plaćate i kada vaša hrana stiže." }].
            map((item) =>
            <div key={item.title} className="flex items-start gap-4 rounded-xl border border-border bg-card p-5 transition-shadow hover:food-card-shadow">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/15">
                  <item.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="mb-1 font-bold">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{item.text}</p>
                </div>
              </div>
            )}
          </div>
        </section>

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

      {/* O nama + Recenzije */}
      <section id="o-nama" className="scroll-mt-36 md:scroll-mt-28 border-t border-border bg-card py-12">
        <div className="container grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div>
            <h2 className="mb-4 text-2xl font-bold">O nama</h2>
            <p className="text-muted-foreground leading-relaxed">
              Top Šiš Fast Food je mesto gde se tradicija i ukus spajaju. Već godinama pružamo našim gostima najkvalitetnije šiš specijalitete, pljeskavice i ostala jela pripremljena sa ljubavlju i od svežih sastojaka. Naša misija je jednostavna — brza, ukusna i pristupačna hrana za sve.Top Šiš Fast Food je mesto gde se tradicija i ukus spajaju. Već godinama pružamo našim gostima najkvalitetnije šiš specijalitete, pljeskavice i ostala jela pripremljena sa ljubavlju i od svežih sastojaka. Naša misija je jednostavna — brza, ukusna i pristupačna hrana za sve.Top Šiš Fast Food je mesto gde se tradicija i ukus spajaju. Već godinama pružamo našim gostima najkvalitetnije šiš specijalitete, pljeskavice i ostala jela pripremljena sa ljubavlju i od svežih sastojaka. Naša misija je jednostavna — brza, ukusna i pristupačna hrana za sve.Top Šiš Fast Food je mesto gde se tradicija i ukus spajaju. Već godinama pružamo našim gostima najkvalitetnije šiš specijalitete, pljeskavice i ostala jela pripremljena sa ljubavlju i od svežih sastojaka. Naša misija je jednostavna — brza, ukusna i pristupačna hrana za sve.
            

            </p>
          </div>
          <ReviewBlock />
        </div>
      </section>

      {/* Lokacija */}
      <section id="lokacija" className="scroll-mt-36 md:scroll-mt-28 border-t border-border py-12">
        <div className="container">
          <h2 className="mb-4 text-2xl font-bold">Lokacija</h2>
          <div className="flex items-center gap-2 mb-4 text-muted-foreground">
            <MapPin className="h-5 w-5 text-primary" />
            <span>Strugarska 1a, Čukarička padina</span>
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
                <p className="font-medium">07:00 - 23:30</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-muted py-8">
        <div className="container space-y-6">
          {/* Social */}
          <div className="text-center">
            <h3 className="mb-4 text-lg font-bold">Zapratite nas!</h3>
            <div className="flex items-center justify-center gap-6">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-muted-foreground transition-colors duration-150 hover:text-foreground">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
                <span className="text-sm font-medium">Instagram</span>
              </a>
              <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-muted-foreground transition-colors duration-150 hover:text-foreground">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.73a8.19 8.19 0 004.76 1.52V6.8a4.84 4.84 0 01-1-.11z" /></svg>
                <span className="text-sm font-medium">TikTok</span>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-muted-foreground transition-colors duration-150 hover:text-foreground">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                <span className="text-sm font-medium">Facebook</span>
              </a>
            </div>
          </div>

          <div className="text-center text-sm text-muted-foreground space-y-2">
            <p>© {new Date().getFullYear()} Top Šiš Fast Food. Sva prava zadržana.</p>
            <p>Strugarska 1a · +381 64 5747 478 · info@topsis.rs</p>
            <p className="text-xs">Cene su izražene u RSD. Dostava se naplaćuje dodatno.</p>
            <button
              onClick={() => {setAdminDialogOpen(true);setAdminPassword("");setAdminError("");}}
              className="mt-2 text-xs text-muted-foreground/50 hover:text-muted-foreground transition-colors">
              Admin
            </button>
          </div>
        </div>
      </footer>

      {/* Admin password dialog */}
      <Dialog open={adminDialogOpen} onOpenChange={setAdminDialogOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Admin pristup</DialogTitle>
          </DialogHeader>
          <form
            onSubmit={(e) => {e.preventDefault();handleAdminSubmit();}}
            className="space-y-4">
            
            <Input
              type="password"
              placeholder="Unesite lozinku"
              value={adminPassword}
              onChange={(e) => {setAdminPassword(e.target.value);setAdminError("");}}
              autoFocus />
            
            {adminError && <p className="text-sm text-destructive">{adminError}</p>}
            <button
              type="submit"
              className="w-full rounded-lg bg-primary px-4 py-2 font-semibold text-primary-foreground hover:opacity-90 active:scale-95 transition-all">
              
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