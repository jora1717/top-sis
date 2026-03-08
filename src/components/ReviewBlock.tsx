import { useState } from "react";
import { Star } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export function ReviewBlock() {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const activeRating = hoverRating || rating;

  const handleStarClick = (starIndex: number, isHalf: boolean) => {
    const value = isHalf ? starIndex + 0.5 : starIndex + 1;
    setRating(value);
  };

  const handleSubmit = async () => {
    if (!name.trim()) {
      toast.error("Unesite vaše ime.");
      return;
    }
    if (rating === 0) {
      toast.error("Izaberite ocenu.");
      return;
    }

    setSubmitting(true);
    const { error } = await supabase.from("reviews").insert({
      ime: name.trim(),
      komentar: comment.trim() || null,
      ocena: rating
    });
    setSubmitting(false);

    if (error) {
      toast.error("Greška pri slanju recenzije.");
      return;
    }

    toast.success("Hvala na recenziji! ⭐");
    setRating(0);
    setName("");
    setComment("");
  };

  return (
    <div className="rounded-xl border border-border bg-card p-5 space-y-4">
      <h3 className="text-lg font-bold">Ostavite recenziju</h3>
      <p className="text-sm text-muted-foreground">Podelite vaše iskustvo sa nama!</p>

      {/* Star rating */}
      <div>
        <p className="mb-2 text-sm font-medium">Ocena</p>
        <div className="flex items-center gap-1">
          {[0, 1, 2, 3, 4].map((starIndex) => {
            const fullValue = starIndex + 1;
            const halfValue = starIndex + 0.5;
            return (
              <div
                key={starIndex}
                className="relative h-8 w-8 cursor-pointer"
                onMouseLeave={() => setHoverRating(0)}>
                
                {/* Left half */}
                <div
                  className="absolute inset-y-0 left-0 w-1/2 z-10"
                  onMouseEnter={() => setHoverRating(halfValue)}
                  onClick={() => handleStarClick(starIndex, true)} />
                
                {/* Right half */}
                <div
                  className="absolute inset-y-0 right-0 w-1/2 z-10"
                  onMouseEnter={() => setHoverRating(fullValue)}
                  onClick={() => handleStarClick(starIndex, false)} />
                
                {/* Star visual */}
                <Star
                  className={`h-8 w-8 transition-colors ${
                  activeRating >= fullValue ?
                  "fill-primary text-primary" :
                  activeRating >= halfValue ?
                  "text-primary" :
                  "text-muted-foreground/30"}`
                  }
                  style={
                  activeRating >= halfValue && activeRating < fullValue ?
                  {
                    clipPath: "inset(0 50% 0 0)",
                    position: "absolute",
                    fill: "hsl(var(--primary))"
                  } :
                  undefined
                  } />
                
                {/* Background star for half-fill */}
                {activeRating >= halfValue && activeRating < fullValue &&
                <Star className="absolute inset-0 h-8 w-8 text-muted-foreground/30" />
                }
              </div>);

          })}
          {rating > 0 &&
          <span className="ml-2 text-sm font-semibold text-primary">{rating}/5</span>
          }
        </div>
      </div>

      {/* Name */}
      <div>
        <label className="mb-1 block text-sm font-medium">Vaše ime </label>
        <Input
          placeholder="Unesite ime"
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={100} />
        
      </div>

      {/* Comment */}
      <div>
        <label className="mb-1 block text-sm font-medium">
          Komentar <span className="text-muted-foreground">(opciono)</span>
        </label>
        <Textarea
          placeholder="Napišite vaš utisak..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          maxLength={500}
          rows={3} />
        
      </div>

      <button
        onClick={handleSubmit}
        disabled={submitting}
        className="w-full rounded-xl bg-primary px-4 py-3 font-bold text-primary-foreground transition-all hover:opacity-90 active:scale-95 disabled:opacity-50">
        
        {submitting ? "Šaljem..." : "Pošalji recenziju"}
      </button>
    </div>);

}