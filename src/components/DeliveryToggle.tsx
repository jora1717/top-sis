interface DeliveryToggleProps {
  mode: "delivery" | "pickup";
  onChange: (mode: "delivery" | "pickup") => void;
}

export function DeliveryToggle({ mode, onChange }: DeliveryToggleProps) {
  return (
    <div className="inline-flex rounded-lg bg-muted p-1">
      <button
        onClick={() => onChange("delivery")}
        className={`rounded-md px-4 py-2 text-sm font-medium transition-all ${
          mode === "delivery"
            ? "bg-primary text-primary-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        🚚 Dostava
      </button>
      <button
        onClick={() => onChange("pickup")}
        className={`rounded-md px-4 py-2 text-sm font-medium transition-all ${
          mode === "pickup"
            ? "bg-primary text-primary-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        🏪 Lično preuzimanje
      </button>
    </div>
  );
}
