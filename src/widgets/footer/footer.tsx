import {Link} from 'react-router-dom';
import {Camera, Mail} from 'lucide-react';
import {Subtitle} from '@/shared/subtitle';
import {ActionLink} from '@/shared/link';

export function Footer() {
	return (
		<footer className="mt-auto border-t bg-muted/30">
			<div className="w-full px-6 py-16 lg:px-10">

				<div className="grid gap-12 md:grid-cols-12">

					{/* LEFT — Brand */}
					<div className="md:col-span-5 space-y-4">
						<div className="text-lg font-semibold tracking-tight">
							MySite
						</div>

						<p className="muted max-w-sm">
							Художник. Работаю с цветом, формой и сериями.
							Здесь — избранные проекты и галереи.
						</p>
					</div>

					{/* RIGHT — Links */}
					<div className="grid gap-10 sm:grid-cols-3 md:col-span-7">

						<div className="space-y-3">
							<Subtitle as={"p"}>Навигация</Subtitle>

							<ul className="space-y-2">
								<li><ActionLink><Link to="/">Главная</Link></ActionLink></li>
								<li><ActionLink><Link to="/gallery">Галерея</Link></ActionLink></li>
								<li><ActionLink><Link to="/about">Обо мне</Link></ActionLink></li>
							</ul>
						</div>

						<div className="space-y-3">
							<Subtitle as={"p"}>Контакты</Subtitle>

							<ul className="space-y-2">
								<li>
									<a
										href="mailto:email@example.com"
										aria-label="Email"
										className="text-muted-foreground transition-opacity hover:opacity-70"
									>
										<Mail className="rounded-md p-1 text-muted-foreground transition hover:bg-muted" strokeWidth={1.25} size={36}/>
									</a>
								</li>

								<li>
									<a
										href="https://instagram.com"
										target="_blank"
										rel="noreferrer"
										aria-label="Instagram"
										className="text-muted-foreground transition-opacity hover:opacity-70"
									>
										<Camera className="rounded-md p-1 text-muted-foreground transition hover:bg-muted" strokeWidth={1.25}  size={36}/>
									</a>
								</li>
							</ul>
						</div>

						<div className="space-y-3">
							<Subtitle as={"p"}>Другое</Subtitle>

							<ul className="space-y-2">
								<li><ActionLink><Link to="/contact">Написать</Link></ActionLink></li>
							</ul>
						</div>

					</div>
				</div>

				{/* Bottom line */}
				<div className="mt-16 flex flex-col gap-3 border-t pt-6 muted sm:flex-row sm:justify-between">
					<p>© {new Date().getFullYear()} MySite</p>

					<a href="#top">
						Наверх ↑
					</a>
				</div>

			</div>
		</footer>
	)
}
