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

export async function loadProductSearchQuery(sq: any) {
	const resultSq: any = { $and: [] };
	/**
	 * search for category and sub category
	 */
	if (sq['category']) {
		const all_cats = await Category.getCategoryWithSubs(sq['category']);
		resultSq.$and.push({
			categories: { $in: all_cats.map((r) => DBId.getObjectId(r.getID())) },
		});
		delete sq['category'];
	}
	if (sq['name'] || sq['search']) {
		resultSq.$and.push({
			name: new RegExp(String(sq['name'] || sq['search'] || ''), 'i'),
		});
		delete sq['name'];
		delete sq['search'];
	}
	/* -------------------------------------------------------------------------- */
	/*                     check for variation search queries                     */
	/* -------------------------------------------------------------------------- */
	const variationSearches: any[] = [];
	if (sq['variation']) {
		variationSearches.push(sq['variation']);
		delete sq['variation'];
	}
	if (sq['special']) {
		variationSearches.push({
			$and: [{ saleprice: { $gt: 0 } }, { $expr: { $gt: ['$price', '$saleprice'] } }],
		});
		delete sq['special'];
	}
	for (const key in sq) {
		if (!key.startsWith('v-')) continue;
		const rawkey = key.substring(2);
		/**
		 * check for variation search queries
		 * when searching for variations we use $and with $or because only 1 match per type is enough
		 * example: (brand=papco OR nahal) AND (color=red OR blue)
		 */
		variationSearches.push({
			$or: wrap_array(sq[key]).map((value) => {
				return {
					['variation_data.' + rawkey]: new RegExp(value, 'gi'),
				};
			}),
		});
		delete sq[key];
	}
	if (!object_isEmpty(variationSearches)) {
		const variationSq = { $and: variationSearches };
		const resultVariations = await DBManager.aggregate(ProductVariation, [
			{ $match: variationSq },
			{ $group: { _id: '$product_id' } },
		]);

		resultSq.$and.push({
			_id: { $in: resultVariations.map((r) => DBId.getObjectId(r._id)) },
		});
	}

	/* --------------------------- add remaining keys --------------------------- */
	for (const key in sq) {
		if (key in resultSq) continue;
		resultSq[key] = sq[key];
	}

	/* -------------------------------- finalize -------------------------------- */
	if (!resultSq['__sort']) resultSq['__sort'] = { _created_date: 1 };

	return DBFilters.prepareSearch(object_clean(resultSq));
}
