import { DBId, DBManager, ObjectHelper, RequestHelper } from '@azrico/nodeserver';
import { object_clean, object_isEmpty, wrap_array } from '@azrico/object';
import { OrderProduct, Product, ProductVariation } from '@codespase/core';
import Logger from '@azrico/debug';
import { NextRequest } from 'next/server';

export async function saveProduct(req: NextRequest, data: any) {
	const [sq, insertbody] = await ObjectHelper.getSqBodyPair(Product, req, data);

	//variations are saved seperately
	const variations = insertbody.variations;
	delete insertbody.variations;

	//save the product
	const res: any = await DBManager.upsert(Product, sq, insertbody, {
		user: RequestHelper.getSafeUser(req),
	});

	if (variations) {
		const product_id = DBId.getObjectIdList([sq, res]).shift();
		if (product_id) {
			//save the variations
			const var_res = await Promise.all(
				variations.map(async (variationData) => {
					return await saveVariation(req, product_id, variationData);
				})
			);

			const variationSaveError = wrap_array(var_res).filter((s) => s instanceof Error);
			if (variationSaveError) {
				Logger.error_message('saveProduct', JSON.stringify(variationSaveError));
				res['variations'] = variationSaveError;
			}
		}

		// if (variationSaveError) {
		// 	return await RequestHelper.sendResponse(variationSaveError);
		// }
	}
	return res;
}
async function saveVariation(
	req: NextRequest,
	product_id: any,
	variation: Partial<ProductVariation>
) {
	variation.product_id = product_id;
	const [sq, insertbody] = await ObjectHelper.getSqBodyPair(ProductVariation, variation);
	const hasData = !object_isEmpty(object_clean(variation.variation_data));
	const hasSearch = !object_isEmpty(sq);

	if (!hasData && !hasSearch) return;

	if (insertbody._deleted === true && hasSearch) {
		//make sure there is no ORDER with this variation!
		const delVariation = await DBManager.first(ProductVariation, sq);
		const orderItems = await DBManager.find(OrderProduct, {
			variation_id: DBId.getObjectId(delVariation._id),
		});
		if (!object_isEmpty(orderItems))
			return Error('[500] cant delete variation if there is any order from it');
		return await DBManager.delete(
			ProductVariation,
			DBId.getIdSearchObject(delVariation._id),
			{
				user: RequestHelper.getSafeUser(req),
			}
		);
	}
	if (hasData) {
		return await DBManager.upsert(ProductVariation, sq, insertbody, {
			user: RequestHelper.getSafeUser(req),
		});
	}
}
