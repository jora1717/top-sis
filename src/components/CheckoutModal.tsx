import { useState } from "react";
import { X, Check } from "lucide-react";

interface CheckoutModalProps {
  open: boolean;
  onClose: () => void;
  total: number;
  deliveryMode: "delivery" | "pickup";
  onSubmit: () => void;
}

export function CheckoutModal({ open, onClose, total, deliveryMode, onSubmit }: CheckoutModalProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      onSubmit();
      setSubmitted(false);
      setName("");
      setPhone("");
      setAddress("");
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-background/70 backdrop-blur-sm p-4">
      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6 animate-slide-up">
        {submitted ? (
          <div className="flex flex-col items-center gap-4 py-8">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/20">
              <Check className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-xl font-bold">Narudžbina primljena! 🎉</h2>
            <p className="text-center text-muted-foreground">
              Hvala vam! Vaša narudžbina će biti spremna uskoro.
            </p>
          </div>
        ) : (
          <>
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-bold">Završi narudžbinu</h2>
              <button onClick={onClose} className="rounded-lg p-2 text-muted-foreground hover:bg-muted">
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-muted-foreground">Ime</label>
                <input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-lg border border-border bg-input px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Vaše ime"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-muted-foreground">Telefon</label>
                <input
                  required
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full rounded-lg border border-border bg-input px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="06x xxx xxxx"
                />
              </div>
              {deliveryMode === "delivery" && (
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-muted-foreground">Adresa za dostavu</label>
                  <input
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full rounded-lg border border-border bg-input px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Ulica i broj"
                  />
                </div>
              )}
              <div className="flex items-center justify-between rounded-lg bg-muted p-3">
                <span className="font-medium text-muted-foreground">Ukupno</span>
                <span className="text-xl font-bold text-primary">{total} RSD</span>
              </div>
              <button
                type="submit"
                className="glow-primary w-full rounded-xl bg-primary py-3.5 text-lg font-bold text-primary-foreground transition-all hover:opacity-90 active:scale-[0.98]"
              >
                Potvrdi narudžbinu
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
