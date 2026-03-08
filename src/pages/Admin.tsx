import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, Check, ChefHat, Clock, MapPin, Phone, User, Package, Star, MessageSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface OrderItem {
  id: string;
  naziv_stavke: string;
  cena_stavke: number;
  kolicina: number;
  dodaci: string[] | null;
}

interface Order {
  id: string;
  ime_kupca: string;
  telefon: string;
  nacin_dostave: string;
  adresa_dostave: string | null;
  cena_dostave: number;
  ukupno: number;
  status: string;
  kreirano: string;
  vreme_dostave: number | null;
  order_items: OrderItem[];
}

interface Review {
  id: string;
  ime: string;
  ocena: number;
  komentar: string | null;
  kreirano: string;
}

const statusLabels: Record<string, string> = {
  na_cekanju: "Na čekanju",
  prihvacena: "Prihvaćena",
  zavrsena: "Završena",
};

const statusColors: Record<string, string> = {
  na_cekanju: "bg-accent text-accent-foreground",
  prihvacena: "bg-primary text-primary-foreground",
  zavrsena: "bg-green-600 text-white",
};

export default function Admin() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"orders" | "reviews">("orders");

  const fetchData = async () => {
    const [ordersRes, reviewsRes] = await Promise.all([
      supabase.from("orders").select("*, order_items(*)").order("kreirano", { ascending: false }),
      supabase.from("reviews").select("*").order("kreirano", { ascending: false }),
    ]);

    if (!ordersRes.error && ordersRes.data) setOrders(ordersRes.data as Order[]);
    if (!reviewsRes.error && reviewsRes.data) setReviews(reviewsRes.data as Review[]);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const updateStatus = async (id: string, status: string) => {
    await supabase.from("orders").update({ status }).eq("id", id);
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
  };

  const formatTime = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleString("sr-RS", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const avgRating = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + r.ocena, 0) / reviews.length).toFixed(1)
    : "—";

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 border-b border-border backdrop-blur-md" style={{ backgroundColor: '#110d0c' }}>
        <div className="container flex h-16 items-center gap-4">
          <button onClick={() => navigate("/")} className="rounded-lg p-2 text-muted-foreground hover:bg-muted">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="text-xl font-bold">Admin Panel</h1>
          <div className="ml-auto flex items-center gap-2">
            <button
              onClick={() => setActiveTab("orders")}
              className={`rounded-full px-3 py-1 text-sm font-medium transition-colors ${activeTab === "orders" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"}`}
            >
              Porudžbine ({orders.length})
            </button>
            <button
              onClick={() => setActiveTab("reviews")}
              className={`rounded-full px-3 py-1 text-sm font-medium transition-colors ${activeTab === "reviews" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"}`}
            >
              Recenzije ({reviews.length})
            </button>
          </div>
        </div>
      </header>

      <main className="container py-6 space-y-4">
        {activeTab === "orders" && (
          <>
            {orders.length === 0 && (
              <div className="text-center py-20 text-muted-foreground">
                <Package className="mx-auto h-12 w-12 mb-4 opacity-50" />
                <p className="text-lg">Nema narudžbina.</p>
              </div>
            )}

            {orders.map((order) => (
              <div key={order.id} className="rounded-xl border border-border bg-card p-5 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm text-muted-foreground">#{order.id}</span>
                    <span className={`rounded-full px-3 py-0.5 text-xs font-semibold ${statusColors[order.status] || "bg-muted text-muted-foreground"}`}>
                      {statusLabels[order.status] || order.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    {formatTime(order.kreirano)}
                  </div>
                </div>

                <div className="grid gap-2 sm:grid-cols-3 text-sm">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-primary" />
                    <span>{order.ime_kupca}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-primary" />
                    <span>{order.telefon}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span>{order.nacin_dostave === "delivery" ? order.adresa_dostave || "—" : "Lično preuzimanje"}</span>
                  </div>
                </div>

                <div className="text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">Vreme dostave: </span>
                  {order.vreme_dostave ? `${order.vreme_dostave} min` : "—"}
                </div>

                <div className="rounded-lg bg-muted p-3 space-y-1.5">
                  {order.order_items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <div>
                        <span className="font-medium">{item.kolicina}x</span> {item.naziv_stavke}
                        {item.dodaci && item.dodaci.length > 0 && (
                          <span className="ml-1 text-xs text-muted-foreground">(+{item.dodaci.join(", ")})</span>
                        )}
                      </div>
                      <span>{item.cena_stavke * item.kolicina} RSD</span>
                    </div>
                  ))}
                  {order.cena_dostave > 0 && (
                    <div className="flex justify-between text-sm text-muted-foreground border-t border-border pt-1.5 mt-1.5">
                      <span>Dostava</span>
                      <span>{order.cena_dostave} RSD</span>
                    </div>
                  )}
                  <div className="flex justify-between font-bold border-t border-border pt-1.5 mt-1.5">
                    <span>Ukupno</span>
                    <span>{order.ukupno} RSD</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  {order.status === "na_cekanju" && (
                    <button
                      onClick={() => updateStatus(order.id, "prihvacena")}
                      className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90 active:scale-95 transition-all"
                    >
                      <Check className="h-4 w-4" />
                      Prihvati porudžbinu
                    </button>
                  )}
                  {order.status === "prihvacena" && (
                    <button
                      onClick={() => updateStatus(order.id, "zavrsena")}
                      className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700 active:scale-95 transition-all"
                    >
                      <ChefHat className="h-4 w-4" />
                      Gotova porudžbina
                    </button>
                  )}
                  {order.status === "zavrsena" && (
                    <span className="flex items-center gap-2 text-sm text-green-500 font-medium">
                      <Check className="h-4 w-4" /> Završena
                    </span>
                  )}
                </div>
              </div>
            ))}
          </>
        )}

        {activeTab === "reviews" && (
          <>
            {/* Reviews summary */}
            <div className="rounded-xl border border-border bg-card p-5 flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-2">
                <Star className="h-6 w-6 text-primary fill-primary" />
                <span className="text-2xl font-bold">{avgRating}</span>
                <span className="text-muted-foreground text-sm">prosečna ocena</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{reviews.length} recenzija ukupno</span>
              </div>
            </div>

            {reviews.length === 0 && (
              <div className="text-center py-20 text-muted-foreground">
                <MessageSquare className="mx-auto h-12 w-12 mb-4 opacity-50" />
                <p className="text-lg">Nema recenzija.</p>
              </div>
            )}

            {reviews.map((review) => (
              <div key={review.id} className="rounded-xl border border-border bg-card p-5 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/15 font-bold text-primary text-sm">
                      {review.ime.charAt(0).toUpperCase()}
                    </div>
                    <span className="font-semibold">{review.ime}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    {formatTime(review.kreirano)}
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }, (_, i) => {
                    const filled = i + 1 <= Math.floor(review.ocena);
                    const half = !filled && i + 0.5 <= review.ocena;
                    return (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${filled || half ? "text-primary fill-primary" : "text-muted-foreground/30"}`}
                      />
                    );
                  })}
                  <span className="ml-1 text-sm font-medium">{review.ocena}</span>
                </div>

                {review.komentar && (
                  <p className="text-sm text-muted-foreground leading-relaxed">{review.komentar}</p>
                )}
              </div>
            ))}
          </>
        )}
      </main>
    </div>
  );
}