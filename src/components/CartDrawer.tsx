import { X, Plus, Minus, ShoppingBag } from "lucide-react";
import type { CartItem } from "@/hooks/useCart";
import type { CartItem } from "@/hooks/useCart";

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
  items: CartItem[];
  total: number;
  deliveryMode: "delivery" | "pickup";
  onDeliveryModeChange: (mode: "delivery" | "pickup") => void;
  onAdd: (item: CartItem) => void;
  onRemove: (cartKey: string) => void;
  onCheckout: () => void;
}

export function CartDrawer({ open, onClose, items, total, deliveryMode, onDeliveryModeChange, onAdd, onRemove, onCheckout }: CartDrawerProps) {
  const deliveryFee = deliveryMode === "delivery" ? 250 : 0;


  return (
    <>
      {open && (
        <div className="fixed inset-0 z-50 bg-background/60 backdrop-blur-sm" onClick={onClose} />
      )}
      <div
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col border-l border-border bg-card transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-border p-4">
          <h2 className="text-lg font-bold">Vaša korpa</h2>
          <button onClick={onClose} className="rounded-lg p-2 text-muted-foreground hover:bg-muted">
            <X className="h-5 w-5" />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 text-muted-foreground">
            <ShoppingBag className="h-12 w-12" />
            <p>Korpa je prazna</p>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-4">
              {/* Delivery toggle */}
              <div className="mb-4 inline-flex w-full rounded-lg bg-muted p-1">
                <button
                  onClick={() => onDeliveryModeChange("delivery")}
                  className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-all ${
                    deliveryMode === "delivery"
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Dostava
                </button>
                <button
                  onClick={() => onDeliveryModeChange("pickup")}
                  className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-all ${
                    deliveryMode === "pickup"
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Lično preuzimanje
                </button>
              </div>

              <div className="space-y-3">
                {items.map((item) => (
                  <div key={item.cartKey} className="flex items-center justify-between rounded-lg bg-muted p-3">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      {item.selectedToppings && item.selectedToppings.length > 0 && (
                        <p className="text-xs text-muted-foreground mt-0.5">
                          + {item.selectedToppings.join(", ")}
                        </p>
                      )}
                      <p className="text-sm text-primary font-semibold">{item.price * item.quantity} RSD</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onRemove(item.cartKey)}
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-card text-foreground hover:bg-destructive hover:text-destructive-foreground transition-colors"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="w-6 text-center font-bold">{item.quantity}</span>
                      <button
                        onClick={() => onAdd(item)}
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform hover:scale-110"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="border-t border-border p-4">
              {deliveryMode === "delivery" && (
                <div className="mb-2 flex items-center justify-between text-sm text-muted-foreground">
                  <span>Cena dostave:</span>
                  <span>250 RSD</span>
                </div>
              )}
              <div className="mb-4 flex items-center justify-between text-lg font-bold">
                <span>Ukupno:</span>
                <span className="text-primary">{total + deliveryFee} RSD</span>
              </div>
              <button
                onClick={onCheckout}
                className="glow-primary w-full rounded-xl bg-primary py-3.5 text-lg font-bold text-primary-foreground transition-all hover:opacity-90 active:scale-[0.98]"
              >
                Naruči →
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
