import { Link } from "react-router-dom";
import { ArtworkCard, type ArtworkCardProps } from "@/entities/artwork";
import { Subtitle } from "@/shared/subtitle";

export type GalleryCardProps = ArtworkCardProps & {
  slug: string;
  to: string;
};

export function GalleryCard({ title, to, src, alt }: GalleryCardProps) {
  return (
    <Link
      to={to}
      aria-label={`Open ${title}`}
      className="group block cursor-pointer bg-muted/40"
    >
      <div className="aspect-[4/3] w-full">
        <ArtworkCard key={to} title={title} to={to} src={src} alt={alt} />
      </div>

      <Subtitle as={"h3"} className="my-4 text-center">
        {title}
      </Subtitle>
    </Link>
  );
}
