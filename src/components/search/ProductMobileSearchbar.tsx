'use client';
import React from 'react';

export const ProductMobileSearchbar = (props: any) => {
	return (
		<div className="flex md:hidden shrink justify-center items-center ">
			<button
				type="button"
				className="flex flex-1 !justify-center !items-center"
				onClick={() => (document.getElementById('filter-dialog') as any).showModal()}
			>
				<div className="flex gap-2 justify-center items-center text-xs">
					<i className="bi bi-funnel-fill"></i>
					فیلتر
				</div>
			</button>
			<div className="divider divider-horizontal m-0" />
			<button
				type="button"
				className="flex flex-1 justify-center items-center"
				onClick={() => (document.getElementById('sort-dialog') as any).showModal()}
			>
				<div className="flex gap-2 justify-center items-center text-xs">
					<i className="bi bi-filter"></i>
					مرتب سازی
				</div>
			</button>
		</div>
	);
};
