import React from 'react';
import { Accordion } from '../../Accordion/Accordion';
import clsx from 'clsx';
import { VariationProperty } from '@codespase/core';
import { getProductSQFromUrl } from '../../product/ProductList/ProductList';
import AzFetch from '@azrico/fetch';
import { wrap_array } from '@azrico/object';
import FormInputs from '@/components/shared/forminput/FormInputs';
import AdvancedForm from '@/components/shared/forminput/AdvancedForm';
import { getServerSearchParams } from '@/navigation';

function convertVPName(item: vpObject) {
	return 'v-' + item.variation_object.slug;
}
export async function ProductSearchSidebar() {
	const vplist = await findCurrentVariationProperties();
	const vpNameList = vplist.map((r) => convertVPName(r));
	const sp = getServerSearchParams();

	return (
		<AdvancedForm
			id="sidebar-searchform"
			method="GET"
			action={'products'}
			className="relative flex flex-col gap-3 min-w-[200px]"
			exclude={vpNameList}
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
									const itemsOfSlug = sp.getAll(prefixedSlug);
									const isChecked = itemsOfSlug.includes(subitem);
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
			<div className="sticky bottom-3 rounded-xl bg-white p-2 shadow-md z-20">
				<button type="submit" className="btn btn-sm btn-ghost w-full">
					اعمال فیلتر ها
				</button>
			</div>
		</AdvancedForm>
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
export default ProductSearchSidebar;
