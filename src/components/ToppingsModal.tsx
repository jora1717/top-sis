import { useState } from "react";
import { X, Check } from "lucide-react";
import { AVAILABLE_TOPPINGS, type MenuItem } from "@/data/menu";

interface ToppingsModalProps {
  open: boolean;
  item: MenuItem | null;
  onClose: () => void;
  onConfirm: (item: MenuItem, toppings: string[]) => void;
}

export function ToppingsModal({ open, item, onClose, onConfirm }: ToppingsModalProps) {
  const [selected, setSelected] = useState<string[]>([]);

  if (!open || !item) return null;

  const toggle = (t: string) => {
    setSelected((prev) =>
      prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]
    );
  };

  const handleConfirm = () => {
    onConfirm(item, selected);
    setSelected([]);
  };

  const handleClose = () => {
    setSelected([]);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-background/70 backdrop-blur-sm p-4" onClick={handleClose}>
      <div className="w-full max-w-sm rounded-2xl border border-border bg-card p-5 animate-slide-up" onClick={(e) => e.stopPropagation()}>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold">Dodaj priloge</h2>
          <button onClick={handleClose} className="rounded-lg p-2 text-muted-foreground hover:bg-muted">
            <X className="h-5 w-5" />
          </button>
        </div>

        <p className="mb-3 text-sm text-muted-foreground">{item.name} — {item.price} RSD</p>

        <div className="grid grid-cols-2 gap-2 mb-5">
          {AVAILABLE_TOPPINGS.map((t) => {
            const isSelected = selected.includes(t);
            return (
              <button
                key={t}
                onClick={() => toggle(t)}
                className={`flex items-center gap-2 rounded-lg border px-3 py-2.5 text-sm font-medium transition-all ${
                  isSelected
                    ? "border-primary bg-primary/10 text-foreground"
                    : "border-border text-muted-foreground hover:border-primary/40"
                }`}
              >
                <div className={`flex h-4 w-4 items-center justify-center rounded border transition-colors ${
                  isSelected ? "border-primary bg-primary" : "border-muted-foreground/40"
                }`}>
                  {isSelected && <Check className="h-3 w-3 text-primary-foreground" />}
                </div>
                {t}
              </button>
            );
          })}
        </div>

        <button
          onClick={handleConfirm}
          className="glow-primary w-full rounded-xl bg-primary py-3 text-base font-bold text-primary-foreground transition-all hover:opacity-90 active:scale-[0.98]"
        >
          Dodaj u korpu
        </button>
      </div>
    </div>
  );
}
