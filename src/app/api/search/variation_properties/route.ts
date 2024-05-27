import {
	DBFilters,
	DBId,
	DBManager,
	ObjectHelper,
	RequestHelper,
	ServerApi,
} from '@azrico/nodeserver';
import { Order, Product, VariationProperty } from '@codespase/core';
/**
 * get a list of all Variation properties of the current product search query
 * @param params
 */
export async function GET(req: Request, data: any) {
	ServerApi.init();
	const sq = DBFilters.prepareSearch(await RequestHelper.get_request_data([req, data]));

	const used_variations = (
		await DBManager.aggregate(Product, [
			{
				$match: sq,
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
		])
	).map((r: any) => ({ key: r._id, values: r.values }));
	// console.log('sq:', sq);
	// console.log('used_variations:', used_variations);
	return Response.json({ data: used_variations });
}
