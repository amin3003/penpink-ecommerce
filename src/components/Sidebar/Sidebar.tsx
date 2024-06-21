'use client';
import { SidebarController } from './SidebarController';
import { Category } from '@codespase/core';
import React from 'react';
import SidebarContent from './SidebarContent';
import { useBreakpoint } from '@/classes/useBreakpoint';

export default function Sidebar() {
	const { md } = useBreakpoint('md');
	const [categories, set_categories] = React.useState<Category[]>();

	//sidebar is only active in below md
	React.useEffect(() => {
		if (!md) Category.get_list({}).then(set_categories);
	}, [md]);
	if (md) return <></>;
	return (
		<div className="p-2 px-2 md:px-4 min-h-full !w-[80%] bg-base-100 flex flex-col">
			<SidebarController />
			<SidebarContent categories={categories} />
		</div>
	);
}
