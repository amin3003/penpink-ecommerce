'use client';

import { useSearchParams } from 'next/navigation';
// import LangSwitcher from '@c/Header/LangSwitcher';
import { Link } from '@src/navigation';
import { Category } from '@codespase/core';
import AppLogo from '../Header/AppLogo';
import React from 'react';
import clsx from 'clsx';
export default function SidebarContent(props: any) {
	const sp = useSearchParams();
	const spcategory = sp.get('category');

	const categories = React.useMemo(
		() => Category.mapto(Category, props.categories as any[]),
		[props.categories]
	);
	const selectedCategory = React.useMemo(
		() => categories.find((s: any) => Category.equals(s, spcategory)),
		[categories, spcategory]
	);
	const mainCategories = React.useMemo(
		() => categories.filter((s) => s.isMain),
		[categories]
	);
	const currentCategories = React.useMemo(() => {
		if (selectedCategory == null) {
			/**
			 *  no category is selected. return main categories
			 */
			return mainCategories;
		}
		/**
		 *  get sub-categories of the currently selected category
		 */
		return categories.filter((s) => s.parent_id == selectedCategory._id);
	}, [categories, mainCategories, selectedCategory]);
	const displayCurrentCategories = React.useMemo(() => {
		// return currentCategories;

		/**
		 *  if current category has no sub categories show main categories
		 */
		if (currentCategories.length === 0 && selectedCategory != null) return mainCategories;
		return currentCategories;
	}, [currentCategories, mainCategories, selectedCategory]);
	/**
	 *  if current category has no sub categories close the sidebar
	 */
	React.useEffect(() => {
		if (selectedCategory && currentCategories.length === 0) {
			closeDrawer();
		}
	}, [selectedCategory, currentCategories]);
	return (
		<section className="flex flex-col flex-1 gap-4">
			<nav className="flex flex-col gap-4">
				<div className="flex flex-row align-middle">
					<div className="flex flex-1 items-center justify-center">
						<AppLogo className="self-center" />
					</div>

					<button
						onClick={closeDrawer}
						className="btn btn-sm btn-ghost btn-circle self-center"
					>
						<i className="bi bi-x-lg text-xl md:text-3xl"></i>
					</button>
				</div>
				<div className="flex flex-row align-middle gap-3 flex-nowrap">
					<Link href={`products`}>
						<button className={clsx('btn btn-ghost  p-1 m-0 flex-nowrap')}>
							<i
								className={clsx(
									'bi bi-caret-right-fill transition-all',
									selectedCategory ? 'opacity-100 w-4' : 'opacity-0 w-0'
								)}
							></i>

							<p className="text-xs text-ellipsis text-nowrap">دسته بندی ها</p>
						</button>
					</Link>

					<p
						className={clsx(
							'text-xs self-center transition-all',
							selectedCategory ? 'opacity-100 w-max' : 'opacity-0 w-0'
						)}
					>
						{selectedCategory?.name}
					</p>
				</div>
			</nav>
			<ul className="menu flex-1 gap-2">
				{displayCurrentCategories.length == 0 && (
					<>
						<p>
							{`زیرمجموعه ای برای`} <b>{selectedCategory?.name}</b> {'پیدا نشد'}
						</p>
					</>
				)}
				{displayCurrentCategories.map((r, i) => {
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
function getDrawer() {
	return document.getElementById('my-drawer') as any;
}
function closeDrawer() {
	getDrawer().checked = false;
}
