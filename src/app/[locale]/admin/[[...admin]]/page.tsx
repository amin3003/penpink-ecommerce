'use client';
import '@codespase/adminui/dist/packages/source/src/styles';
import dynamic from 'next/dynamic';
import React from 'react';

const DynamicAdmin = dynamic(() => import('@codespase/adminui/dist/packages/source'), {
	ssr: false,
});

export default function Page() {
	//TODO send auth token to admin page using the `auth` prop
	return (
		<div className="h-screen overflow-hidden">
			<DynamicAdmin useRouter="admin" auth="admin" />
		</div>
	);
}
