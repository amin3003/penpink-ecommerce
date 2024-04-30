'use client';

import { useSearchParams } from 'next/navigation';
// import LangSwitcher from '@c/Header/LangSwitcher';
import { Link, getServerPathname, getServerSearchParams } from '@src/navigation';

import { SidebarController } from './SidebarController';
import { Category } from '@codespase/core';
import AppLogo from '../Header/AppLogo';
import React from 'react';
import clsx from 'clsx';
export default function SidebarContent(props: any) {
	const sp = useSearchParams();
	const spcategory = sp.get('category');
	const categories = Category.mapto(Category, props.categories as any[]);

	const selectedCategory = React.useMemo(
		() => categories.find((s: any) => Category.equals(s, spcategory)),
		[categories, spcategory]
	);
	const currentCategories = React.useMemo(
		() =>
			selectedCategory == null
				? categories.filter((s: any) => !s.parent_id)
				: categories.filter((s: any) => s.parent_id == selectedCategory._id),
		[categories, selectedCategory]
	);
	return (
		<section className="flex flex-col flex-1 gap-4">
			<nav className="flex flex-col gap-4">
				<div className="flex flex-row align-middle">
					<div className="flex flex-1 items-center justify-center">
						<AppLogo text className="self-center" />
					</div>

					<button
						id="btn-close-sidebar"
						className="btn btn-sm btn-ghost btn-circle self-center"
					>
						<i className="bi bi-x-lg text-xl md:text-3xl"></i>
					</button>
				</div>
				<div className="flex flex-row align-middle gap-3 flex-nowrap">
					<Link href={`products`}>
						<button className="btn btn-ghost p-0 m-0 flex-nowrap">
							<i
								className={clsx(
									'bi bi-caret-right-fill transition-all',
									selectedCategory ? 'opacity-100 w-4' : 'opacity-0 w-0'
								)}
							></i>

							<p className="text-xs text-ellipsis text-nowrap">دسته بندی ها</p>
						</button>
					</Link>

					<p className="text-xs self-center">{selectedCategory?.name}</p>
				</div>
			</nav>
			<ul className="menu flex-1 gap-2">
				{currentCategories.length == 0 && <p>موردی یافت نشد</p>}
				{currentCategories.map((r, i) => {
					return (
						<li key={i} className="text-md ">
							<Link
								href={`/products?category=${r.get('slug')}`}
								className="flex-1 flex flex-row"
							>
								<p className="flex-1">{r.get('name')}</p>
								<i className="bi bi-caret-left-fill self-center"></i>
							</Link>
						</li>
					);
				})}
			</ul>
		</section>
	);
}
