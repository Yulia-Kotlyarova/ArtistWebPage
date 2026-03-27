import { Square } from "lucide-react";

export type ImagePlaceholderProps = {
  src?: string;
  loaded?: boolean;
  error?: boolean;
};

export function ImagePlaceholder({
  src,
  loaded,
  error,
}: ImagePlaceholderProps) {
  return (
    <>
      {(!src || (!loaded && !error)) && (
        <div className="absolute inset-0 flex h-full w-full items-center justify-center">
          <Square
            size={44}
            strokeWidth={1}
            className="text-muted-foreground/60"
          />
        </div>
      )}

      {/* Error fallback */}
      {error && (
        <div className="absolute inset-0 flex h-full w-full items-center justify-center">
          <Square
            size={44}
            strokeWidth={1}
            className="text-muted-foreground/60"
          />
        </div>
      )}
    </>
  );
}
