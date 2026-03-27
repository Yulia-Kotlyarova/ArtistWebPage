import { useState } from "react";
import { ImagePlaceholder } from "@/shared/image-placeholder";
import { WatermarkedCanvasImage } from "@/shared/watermark";
import { cn } from "@/shared/lib/utils.ts";

export type ArtworkCardProps = {
  title: string;
  picId?: string;
  to?: string;
  src?: string;
  alt?: string;
  size?: string;
  materials?: string;
  isSold?: boolean;
  swiperClassName?: string;
};

export type ArtworkCardList = ArtworkCardProps[];

export function ArtworkCard({
  title,
  src,
  alt,
  swiperClassName,
}: ArtworkCardProps) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const [readyWatermarkImage, setReadyWatermarkImage] = useState(false);

  const showImage = Boolean(src) && !error;

  return (
    <div className={cn("relative h-full w-full", swiperClassName)}>
      <ImagePlaceholder src={src} error={error} loaded={loaded} />

      {src && showImage && (
        <WatermarkedCanvasImage
          src={src}
          alt={alt ?? title}
          ready={readyWatermarkImage}
          setReady={setReadyWatermarkImage}
          onError={setError}
          onLoad={setLoaded}
          className="h-[70vh] w-full object-contain"
          watermark={{
            text: "Yulia • example.com",
          }}
        />
      )}
    </div>
  );
}
