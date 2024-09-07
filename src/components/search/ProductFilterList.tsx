import React from 'react';
import clsx from 'clsx';
import { VariationProperty } from '@codespase/core';
import AzFetch from '@azrico/fetch';
import { wrap_array } from '@azrico/object';
import AdvancedForm from '@/components/shared/forminput/AdvancedForm';
import Link, { getServerPathname, getServerSearchParams } from '@/navigation';
import { getProductSQFromUrl } from '../product/ProductList/ProductList';

function convertVPName(item: vpObject) {
	return 'v-' + item.variation_object.slug;
}
export async function ProductFilterList(props: any) {
	const vplist = await findCurrentVariationProperties();
	const vpNameList = vplist.map((r) => convertVPName(r));

	const formid = props.id || 'ProductSearchSidebar-form';

	const sp = getServerSearchParams();
	const checkedItemsMap: { [key: string]: string[] } = {};
	for (const r of vpNameList) {
		checkedItemsMap[r] = sp.getAll(r).map((r) => r.toLowerCase());
	}

	/* ---------------------------- clear button link --------------------------- */
	for (const vp of vpNameList) {
		sp.delete(vp);
	}
	let clearButtonLink = getServerPathname() + '?' + sp.toString();

	return (
		<>
			<AdvancedForm
				id={formid}
				method="GET"
				action={'products'}
				className="relative flex flex-col gap-3 min-w-[200px]"
				has={vpNameList}
			>
				{/* TODO show only in stock */}
				{/* <div className={clsx(`form-control rounded-xl p-[0] lg:p-[0] my-3 w-full`)}>
			 <label className="flex items-center rounded-xl p-3 w-full justify-center md:justify-start cursor-pointer bg-base-100 label gap-0 lg:gap-4">
					  <span className="label-text text-[13px] font-bold w-full text-start">
						نمایش کالا های موجود
					</span>  
					<input
						type="checkbox"
						className="toggle toggle-secondary w-12 h-5"
						defaultChecked
					/>
				</label>  
			</div> */}
				<div className={clsx('bg-white rounded-md z-10')}>
					{vplist.map((item, index: any) => {
						return (
							<div
								className={clsx(
									'group ',
									`collapse collapse-arrow rounded-none ${index !== 0 ? 'divide-y-2' : ''}`
								)}
								key={index}
								dir="rtl"
							>
								<input type="radio" />
								<div className={clsx('collapse-title text-md font-medium flex gap-2')}>
									<span className="group-has-[.checkbox:checked]:underline">
										{item.variation_object.name}
									</span>
									{/* <span className="badge">{`${item.values.length}`}</span> */}
								</div>
								<div className="collapse-content !p-1" key={index}>
									{item.values.map((subitem: any, index: any) => {
										const prefixedSlug = convertVPName(item);
										const itemsOfSlug = checkedItemsMap[prefixedSlug];
										const isChecked = itemsOfSlug.includes(String(subitem).toLowerCase());
										return (
											<label key={index} className="label cursor-pointer">
												<span className="label-text">{subitem}</span>
												<input
													type="checkbox"
													name={prefixedSlug}
													value={String(subitem).toLowerCase()}
													className="checkbox checkbox-sm checkbox-primary"
													defaultChecked={isChecked}
												/>
											</label>
										);
									})}
								</div>
							</div>
						);
					})}
				</div>
				{vplist.length > 0 && (
					<div className={clsx('sticky bottom-3 z-20 flex')}>
						<div
							className={clsx(
								'join join-horizontal rounded-xl bg-white shadow-md size-full',
								'flex-1 flex align-middle justify-center items-center p-1 '
							)}
						>
							<button type="submit" className="btn btn-sm btn-ghost w-full flex-1">
								اعمال فیلتر ها
							</button>
							{Object.keys(checkedItemsMap).length > 0 && (
								<Link href={clearButtonLink}>
									<button
										type="button"
										name="clear"
										className="btn btn-sm text-xs btn-ghost"
									>
										پاک کردن فیلتر ها
									</button>
								</Link>
							)}
						</div>
					</div>
				)}
			</AdvancedForm>
		</>
	);
}

type vpObject = {
	key: string;
	values: string[];
	variation_object: Partial<VariationProperty>;
};
/**
 * get a list of all Variation properties of the current product search query
 * @param params
 */
export async function findCurrentVariationProperties(): Promise<Array<vpObject>> {
	const sq = await getProductSQFromUrl();
	//we only care about cateogry of current page
	const res = await AzFetch.get('@/api/search/variation_properties', {
		category: sq['category'],
	});
	const resultdata = wrap_array(res.data) as vpObject[];
	resultdata.sort((a: vpObject, b: vpObject) => a.key.localeCompare(b.key));
	resultdata.map((r) => {
		r.values.sort((a, b) => a.localeCompare(b));
	});

	return resultdata;
}
export default ProductFilterList;
