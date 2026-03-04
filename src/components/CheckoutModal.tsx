import { useState, useMemo } from "react";
import { X, Check } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import type { CartItem } from "@/hooks/useCart";

interface CheckoutModalProps {
  open: boolean;
  onClose: () => void;
  total: number;
  items: CartItem[];
  deliveryMode: "delivery" | "pickup";
  onSubmit: () => void;
}

const NAME_REGEX = /^[a-zA-ZčćšžđČĆŠŽĐ]{2,}(\s[a-zA-ZčćšžđČĆŠŽĐ]{2,})?$/;
const PHONE_REGEX = /^06\d{6,9}$/;
const ADDRESS_REGEX = /^[a-zA-ZčćšžđČĆŠŽĐ0-9\s/]+$/;

function validateName(v: string): string | null {
  if (!v.trim()) return "Ime i prezime mogu sadržati samo slova.";
  if (!NAME_REGEX.test(v.trim())) return "Ime i prezime mogu sadržati samo slova.";
  return null;
}

function validatePhone(v: string): string | null {
  if (!v || !PHONE_REGEX.test(v)) return "Unesite ispravan broj telefona (npr. 0641234567).";
  return null;
}

function validateAddress(v: string): string | null {
  if (!v.trim()) return "Unesite ispravnu adresu (slova i brojevi, npr. Bulevar 45a).";
  if (!ADDRESS_REGEX.test(v.trim())) return "Unesite ispravnu adresu (slova i brojevi, npr. Bulevar 45a).";
  return null;
}

function isNameValid(v: string) { return v.trim().length >= 2 && !validateName(v); }
function isPhoneValid(v: string) { return PHONE_REGEX.test(v); }
function isAddressValid(v: string) { return v.trim().length >= 3 && !validateAddress(v); }

function fieldBorderClass(value: string, isValid: boolean, hasError: boolean, showErrors: boolean): string {
  if (!value) return "border-border";
  if (showErrors && hasError) return "border-red-500 ring-1 ring-red-500/30";
  if (isValid) return "border-green-500/60 ring-1 ring-green-500/20";
  return "border-border";
}

export function CheckoutModal({ open, onClose, total, items, deliveryMode, onSubmit }: CheckoutModalProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [showErrors, setShowErrors] = useState(false);
  const [deliveryTime] = useState(() => Math.floor(Math.random() * 11) + 15);

  

  const nameError = validateName(name);
  const phoneError = validatePhone(phone);
  const addressError = validateAddress(address);

  const nameOk = isNameValid(name);
  const phoneOk = isPhoneValid(phone);
  const addressOk = isAddressValid(address);

  const formValid = useMemo(() => {
    if (!nameOk || !phoneOk) return false;
    if (deliveryMode === "delivery" && !addressOk) return false;
    return true;
  }, [nameOk, phoneOk, addressOk, deliveryMode]);

  if (!open) return null;

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/\D/g, "");
    setPhone(digits.slice(0, 11));
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    const filtered = val.replace(/[^a-zA-ZčćšžđČĆŠŽĐ\s]/g, "").replace(/\s{2,}/g, " ");
    setName(filtered);
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    const filtered = val.replace(/[^a-zA-ZčćšžđČĆŠŽĐ0-9\s/]/g, "");
    setAddress(filtered);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formValid) {
      setShowErrors(true);
      return;
    }

    const deliveryFee = deliveryMode === "delivery" ? 250 : 0;

    // Insert order into database
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        customer_name: name.trim(),
        customer_phone: phone,
        delivery_mode: deliveryMode,
        delivery_address: deliveryMode === "delivery" ? address.trim() : null,
        delivery_fee: deliveryFee,
        total: total + deliveryFee,
      })
      .select("id")
      .single();

    if (orderError || !order) {
      console.error("Order error:", orderError);
      return;
    }

    // Insert order items
    const orderItems = items.map((item) => ({
      order_id: order.id,
      item_name: item.name,
      item_price: item.price,
      quantity: item.quantity,
      toppings: item.selectedToppings ?? null,
    }));

    const { error: itemsError } = await supabase.from("order_items").insert(orderItems);
    if (itemsError) {
      console.error("Order items error:", itemsError);
    }

    setSubmitted(true);
    setTimeout(() => {
      onSubmit();
      setSubmitted(false);
      setShowErrors(false);
      setName("");
      setPhone("");
      setAddress("");
    }, 2000);
  };

  const inputBase = "w-full rounded-lg bg-input px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-colors border";

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
            {deliveryMode === "delivery" && (
              <p className="text-sm text-primary font-semibold">Vreme dostave: {deliveryTime} min</p>
            )}
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
                  onChange={handleNameChange}
                  className={`${inputBase} ${fieldBorderClass(name, nameOk, !!nameError, showErrors)}`}
                  placeholder="Vaše ime"
                />
                {showErrors && nameError && <p className="mt-1 text-xs text-red-500">{nameError}</p>}
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-muted-foreground">Telefon</label>
                <input
                  required
                  type="tel"
                  inputMode="numeric"
                  value={phone}
                  onChange={handlePhoneChange}
                  className={`${inputBase} ${fieldBorderClass(phone, phoneOk, !!phoneError, showErrors)}`}
                  placeholder="06x xxx xxxx"
                />
                {showErrors && phoneError && <p className="mt-1 text-xs text-red-500">{phoneError}</p>}
              </div>

              {deliveryMode === "delivery" && (
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-muted-foreground">Adresa za dostavu</label>
                  <input
                    required
                    value={address}
                    onChange={handleAddressChange}
                    className={`${inputBase} ${fieldBorderClass(address, addressOk, !!addressError, showErrors)}`}
                    placeholder="Ulica i broj"
                  />
                  {showErrors && addressError && <p className="mt-1 text-xs text-red-500">{addressError}</p>}
                </div>
              )}




              <div className="flex items-center justify-between rounded-lg bg-muted p-3">
                <span className="font-medium text-muted-foreground">Ukupno</span>
                <span className="text-xl font-bold text-primary">{total + (deliveryMode === "delivery" ? 250 : 0)} RSD</span>
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
