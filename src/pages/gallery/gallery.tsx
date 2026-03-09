import {GalleryCard} from '@/features/gallery-card';

export type GalleryCategory = Readonly<{
	title: string
	slug: string
}>

export const CATEGORIES = [
	{ title: "Landscape", slug: "landscape" },
	{ title: "Still life", slug: "still-life" },
	{ title: "Abstract", slug: "abstract" },
	// { title: "Cats", slug: "cats" },
	{ title: "Graphic", slug: "graphic" },
] satisfies readonly GalleryCategory[]

export const CATEGORIES_WITH_PATHS = CATEGORIES.map(({ title, slug }) => ({
	title,
	to: `/gallery/${slug}`,
	src: `/images/${slug}/cover/cover-full.jpeg`,
	slug,
}))


export function GalleryPage() {
	return (
		<section className="w-full px-6 lg:px-10">
			<div className="grid gap-12 sm:grid-cols-3">
				{CATEGORIES_WITH_PATHS.map((c) => (
					<GalleryCard
					key={c.to}
					title={c.title}
					to={c.to}
					src={c.src}
					slug={c.slug}
					/>
				))}
			</div>
		</section>
	)
}

