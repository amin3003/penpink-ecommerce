import React from 'react';
import { Accordion } from '../Accordion/Accordion';
import clsx from 'clsx';
import { VariationProperty } from '@codespase/core';
import { getProductSQFromUrl } from '../product/ProductList/ProductList';
import AzFetch from '@azrico/fetch';
import { wrap_array } from '@azrico/object';

/**
 * get a list of all Variation properties of the current product search query
 * @param params
 */
export async function findCurrentVariationProperties(): Promise<
	Array<{ key: string; values: string[]; variation_object: Partial<VariationProperty> }>
> {
	const sq = await getProductSQFromUrl();
	const res = await AzFetch.get('@/api/search/variation_properties', sq);
	return wrap_array(res.data);
}
export async function SearchSideBox() {
	const vplist = await findCurrentVariationProperties();
	return (
		<div>
			<div className={clsx(`form-control rounded-xl p-[0] lg:p-[0] my-3 w-full`)}>
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
			</div>
			<div className={clsx('bg-white rounded-md')}>
				{vplist.map((item, index: any) => {
					return (
						<div
							className={clsx(
								`collapse collapse-arrow rounded-none ${index !== 0 ? 'divide-y-2' : ''}`
							)}
							key={index}
							dir="rtl"
						>
							<input type="radio" name="my-accordion-2" />
							<div className={clsx('collapse-title text-md font-medium')}>
								{item.variation_object.name}
							</div>
							<div className="collapse-content !p-1" key={index}>
								{item.values.map((item: any, index: any) => {
									return (
										<div key={index} className="form-control">
											<label className="label cursor-pointer">
												<span className="label-text">{item}</span>
												<input
													type="radio"
													name={item}
													className="radio checked:bg-red-500"
												/>
											</label>
										</div>
									);
								})}
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}
 