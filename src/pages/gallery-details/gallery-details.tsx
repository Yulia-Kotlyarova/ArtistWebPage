import { Link, useParams } from "react-router-dom"
import {GallerySwiper} from '@/widgets/gallery-swiper';

const TITLES: Record<string, string> = {
	landscape: "Landscape",
	"still-life": "Still life",
	abstract: "Abstract",
	cats: "Cats",
	graphic: "Graphic",
}

export function GalleryDetails() {
	const { slug } = useParams<{ slug: string }>()
	const title = (slug && TITLES[slug]) || "Gallery"

	return (
		<section className="w-full px-6 lg:px-10">
			<div className="mb-10">
				<Link to="/gallery" className="muted no-underline cursor-pointer">
					← Назад
				</Link>
			</div>

			<header className="mb-8">
				<h1>{title}</h1>
			</header>

			<GallerySwiper/>
		</section>
	)
}
