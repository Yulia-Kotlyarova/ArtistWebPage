import {Header} from '@/widgets/header';
import {Footer} from '@/widgets/footer';
import {Outlet} from 'react-router-dom';

export function SiteLayout() {
	return (
			<div className="w-full flex min-h-screen flex-col bg-background text-foreground">
				<Header/>

				<main className="flex-1 w-full py-10 px-6 lg:px-10">
					<Outlet/>
				</main>

				<Footer/>
			</div>
	)
}
