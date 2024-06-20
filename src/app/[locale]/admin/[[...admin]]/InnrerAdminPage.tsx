'use client';
import '@codespase/adminui/dist/packages/source/src/styles';
import dynamic from 'next/dynamic';
import React from 'react';

const DynamicAdmin = dynamic(() => import('@codespase/adminui/dist/packages/source'), {
	ssr: false,
});

export default function InnrerAdminPage(props: {
	token: string;
	username: string;
	user: any;
}) {
	return (
		<div className="h-screen overflow-hidden">
			<DynamicAdmin useRouter="admin" {...props} />
		</div>
	);
}
