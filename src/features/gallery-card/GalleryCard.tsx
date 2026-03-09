import { Link } from "react-router-dom";
import {ArtworkCard, type ArtworkCardProps} from '@/entities/artwork';

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
				<ArtworkCard key={to}
				       title={title}
				       to={to}
				       src={src}
				       alt={alt}
				/>
		</div>

	<h3 className="my-4 text-center footer-title">{title}</h3>
	</Link>
	)
		;
	}
