import { Link } from "react-router-dom"
import { Button } from "@/shared/button"
import { Sheet, SheetContent, SheetTrigger } from "@/shared/sheet"
import {NavItem} from '@/shared/navbar';

function MobileNav() {
	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button variant="ghost" size="icon" className="sm:hidden">
					<span className="text-xl leading-none">☰</span>
					<span className="sr-only">Open menu</span>
				</Button>
			</SheetTrigger>

			<SheetContent side="right" className="w-72">
				<div className="mt-6 flex flex-col gap-2">
					<NavItem to="/" label="Главная" />
					<NavItem to="/gallery" label="Галерея" />
					<NavItem to="/about" label="Обо мне" />

					<div className="pt-3">
						<NavItem to="/contact" label="Связаться/Приобрести" />
					</div>
				</div>
			</SheetContent>
		</Sheet>
	)
}

export function Header() {
	return (
		<header className="sticky top-0 z-50 border-b bg-background/70 backdrop-blur-md">
			<div className="mx-auto flex h-16 w-full items-center justify-between px-6 lg:px-10">
				<div className="flex items-center gap-4">
					<Link
						to="/"
						className="text-sm font-semibold tracking-tight transition-opacity hover:opacity-80"
					>
						MySite
					</Link>

					<nav className="hidden items-center gap-2 sm:flex">
						<NavItem to="/" label="Главная" />
						<NavItem to="/gallery" label="Галерея" />
						<NavItem to="/about" label="Обо мне" />
					</nav>
				</div>

				<div className="flex items-center gap-2">
					<Button asChild variant="outline" size="sm" className="hidden sm:inline-flex">
						<Link
							to="/contact"
							className="text-sm font-semibold tracking-tight transition-opacity hover:opacity-80"
						>
							Связаться
						</Link>
					</Button>

					<MobileNav />
				</div>
			</div>
		</header>
	)
}
