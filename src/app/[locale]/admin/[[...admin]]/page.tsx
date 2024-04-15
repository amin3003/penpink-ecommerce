'use client';
import { DBManager } from '@azrico/nodeserver';
import '@codespase/adminui/dist/source/src/styles/index';
import dynamic from 'next/dynamic';
import React from 'react';
const DynamicAdmin = dynamic(() => import('@codespase/adminui/dist/source'), {
	ssr: false,
});

export default function Page() {
	return (
		<div className="h-screen overflow-hidden">
			<DynamicAdmin useRouter="admin" />
		</div>
	);
}
