'use client';
import { BrowserRouter } from 'react-router-dom';
import { AdminPage } from '@codespase/adminui/dist/source';
export default function Page() {
	return (
		<div className="h-screen overflow-hidden">
			<BrowserRouter basename="fa/admin">
				<AdminPage />
			</BrowserRouter>
		</div>
	);
}
