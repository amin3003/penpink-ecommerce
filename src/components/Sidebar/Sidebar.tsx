import { Category } from '@codespase/core';
import React from 'react';
import SidebarContent from './SidebarContent';

export default async function Sidebar() {
	const categories = await Category.get_basicList();

	return (
		<div className="p-2 px-2 md:px-4 min-h-full !w-[80%] bg-base-100 flex flex-col">
			<SidebarContent categories={categories} />
		</div>
	);
}
