'use client';
import { BrowserRouter } from 'react-router-dom';
import { AdminPage } from '@codespase/adminui/dist/source';
export default function Page() {
	return (
		<BrowserRouter basename="fa/admin">
			<AdminPage />
		</BrowserRouter>
	);
}
