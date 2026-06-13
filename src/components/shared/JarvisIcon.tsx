import { cn } from "@/lib/utils";

// Jarvis mascot icon (icons8 robot). Rendered as an <img> with a drop-in,
// lucide-compatible API ({ className }) so it can replace the Sparkles icon
// anywhere Jarvis is branded — the nav item and the Jarvis page.
// The asset is a white silhouette, so it reads well on the dark sidebar and on
// the primary/convert gradient avatars.
export function JarvisIcon({ className }: { className?: string }) {
  return (
    <img
      src="/jarvis-icon.png"
      alt=""
      aria-hidden="true"
      draggable={false}
      className={cn("object-contain", className)}
    />
  );
}
