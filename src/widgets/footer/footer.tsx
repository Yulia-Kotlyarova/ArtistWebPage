import {Link} from 'react-router-dom';
import {Camera, Mail} from 'lucide-react';

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
							<p className="footer-title">Навигация</p>

							<ul className="space-y-2">
								<li><Link className="footer-link" to="/">Главная</Link></li>
								<li><Link className="footer-link" to="/gallery">Галерея</Link></li>
								<li><Link className="footer-link" to="/about">Обо мне</Link></li>
							</ul>
						</div>

						<div className="space-y-3">
							<p className="footer-title">Контакты</p>

							<ul className="space-y-2">
								<li>
									<a
										href="mailto:email@example.com"
										aria-label="Email"
										className="text-muted-foreground transition-opacity hover:opacity-70"
									>
										<Mail className="mx-auto rounded-md p-1 text-muted-foreground transition hover:bg-muted" strokeWidth={1.25} size={36}/>
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
										<Camera className="mx-auto rounded-md p-1 text-muted-foreground transition hover:bg-muted" strokeWidth={1.25}  size={36}/>
									</a>
								</li>
							</ul>
						</div>

						<div className="space-y-3">
							<p className="footer-title">Другое</p>

							<ul className="space-y-2">
								<li><a className="footer-link" href="#contact">Написать</a></li>
								<li><a className="footer-link" href="#">Политика</a></li>
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
