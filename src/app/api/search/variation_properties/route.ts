import {
	DBFilters,
	DBId,
	DBManager,
	ObjectHelper,
	RequestHelper,
	ServerApi,
} from '@azrico/nodeserver';
import { array_first } from '@azrico/object';
import { Order, Product, VariationProperty } from '@codespase/core';
import { loadProductSearchQuery } from '../../products/loadProductSearchQuery';
/**
 * get a list of all Variation properties of the current product search query
 * @param params
 */
export async function GET(req: Request, data: any) {
	ServerApi.init(req);
	const rd = await RequestHelper.get_request_data([req, data]);
	const sq = await loadProductSearchQuery(rd);
	const aggr = [
		{
			$match: sq,
		},
		{
			$lookup: {
				from: 'product_variations',
				localField: '_id',
				foreignField: 'product_id',
				as: 'variations',
			},
		},
		{
			$project: {
				vars: '$variations.variation_data',
			},
		},
		{
			$unwind: '$vars',
		},
		{
			$project: {
				vars: { $objectToArray: '$vars' },
			},
		},
		{
			$unwind: '$vars',
		},
		{
			$group: {
				_id: '$vars.k',
				values: {
					$addToSet: '$vars.v',
				},
			},
		},
		{
			$lookup: {
				from: 'variation_properties',
				localField: '_id',
				foreignField: 'slug',
				as: 'variation_object',
			},
		},
	];
	const used_variations = (await DBManager.aggregate(Product, aggr)).map((r: any) => ({
		key: r._id,
		values: r.values,
		variation_object: array_first(r.variation_object),
	}));
	return Response.json({ data: used_variations });
}
export const dynamic = 'force-dynamic';
