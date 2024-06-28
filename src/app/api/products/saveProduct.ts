import ConvertHelper from '@azrico/convert';
import {
	DBFiles,
	DBFilters,
	DBId,
	DBManager,
	DBOptions,
	ObjectHelper,
	RequestHelper,
} from '@azrico/nodeserver';
import { object_clean, object_isEmpty, wrap_array } from '@azrico/object';
import { Category, Product, ProductVariation } from '@codespase/core';

export async function saveProduct(...body: any[]) {
	const [sq, insertbody] = await ObjectHelper.getSqBodyPair(Product, ...body);

	//variations are saved seperately
	const variations = insertbody.variations;
	delete insertbody.variations;

	//save the product
	const res = await DBManager.upsert(Product, sq, insertbody);

	if (variations) {
		const product_id = DBId.getObjectIdList([sq, res]).shift();
		if (product_id) {
			//save the variations
			const var_res = await Promise.all(
				variations.map(async (variationData) => {
					return await saveVariation(product_id, variationData);
				})
			);

			const variationSaveError = wrap_array(var_res).find((s) => s instanceof Error);
			console.log('variationSaveError', JSON.stringify(variationSaveError));
		}

		// if (variationSaveError) {
		// 	return await RequestHelper.sendResponse(variationSaveError);
		// }
	}
	return res;
}
async function saveVariation(product_id: any, variation: Partial<ProductVariation>) {
	variation.product_id = product_id;
	const [sq, insertbody] = await ObjectHelper.getSqBodyPair(ProductVariation, variation);
	const hasData = !object_isEmpty(object_clean(variation.variation_data));
	const hasSearch = !object_isEmpty(sq);

	if (!hasData && !hasSearch) return;
	if (insertbody._deleted === true && hasSearch) {
		console.log('delete the variation', sq, insertbody);
		return await DBManager.delete(ProductVariation, sq);
	}
	if (hasData) {
		console.log('save the variation', sq, insertbody);
		return await DBManager.upsert(ProductVariation, sq, insertbody);
	}
}
