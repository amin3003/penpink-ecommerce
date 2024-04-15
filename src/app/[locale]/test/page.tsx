import { DBManager } from '@azrico/nodeserver';
import '@codespase/adminui/dist/source/src/styles/index';
import dynamic from 'next/dynamic';
import React from 'react';

export default async function Page() {
	await DBManager.init();

	return <div>s</div>;
}
