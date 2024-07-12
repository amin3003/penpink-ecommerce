import Link from 'next/link';
import Layout from './[locale]/layout';
export default function NotFound() {
  //TODO better 404 page
  return (
		<Layout params={{ lang: 'fa' }}>
			<body>
				<div className="flex flex-col items-center justify-center h-screen bg-gray-100">
					<h1 className="text-9xl font-bold text-red-500">404</h1>
					<p className="mt-4 text-2xl text-gray-700">صفحه مورد نظر پیدا نشد!</p>
					<Link href="/">برو به خانه</Link>
					<div className="relative w-48 h-48 mt-8">
						<div className="absolute inset-0 w-full h-full bg-red-500 rounded-full animate-bounce"></div>
						<div className="absolute top-12 left-12 w-16 h-16 bg-white rounded-full"></div>
					</div>
				</div>
			</body>
		</Layout>
	);
}
