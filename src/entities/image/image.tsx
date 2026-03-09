import { useState } from "react";
import {ImagePlaceholder} from '@/shared/image-placeholder/image-placeholder.tsx';

export type ImageProps = {
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

export type ImageList = ImageProps[];

export function Image({ title, src, alt, swiperClassName}: ImageProps) {
	const [loaded, setLoaded] = useState(false);
	const [error, setError] = useState(false);

	const showImage = Boolean(src) && !error;

	return (
		<div className="relative h-full w-full">
			<ImagePlaceholder src={src} error={error} loaded={loaded} />

			{showImage && (
				<img
					src={src}
					alt={alt ?? title}
					loading="lazy"
					draggable={false}
					onLoad={() => setLoaded(true)}
					onError={() => setError(true)}
					className={[
						swiperClassName ? swiperClassName : "h-full w-full object-cover",
						"transition-opacity duration-300",
						loaded ? "opacity-100" : "opacity-0",
					].join(" ")}
				/>
			)}
		</div>
	);
}
