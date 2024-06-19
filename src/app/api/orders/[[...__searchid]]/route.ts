import { DBId, DBManager, RequestHelper, ServerApi } from '@azrico/nodeserver';
import {
	array_first,
	array_makeArrayMap,
	array_makeMap,
	object_isClass,
	object_isEmpty,
} from '@azrico/object';
import { string_isEmpty } from '@azrico/string';
import { Order, OrderProduct, Product } from '@codespase/core';

export async function GET(req: Request, data: any) {
	DBManager.init();
	const search = decodeURIComponent(data.params.search ?? '');
	const isSingle = !string_isEmpty(search);
	let loaded_orders: Order[] = [];

	/* ----------------------------- get the orders ----------------------------- */
	let searchQuery = {};
	if (isSingle) {
		searchQuery = DBId.getIdSearchObject(search);
	} else searchQuery = data.params;
	loaded_orders = await Order.get_list({ __limit: 100, ...searchQuery }); 
	return await RequestHelper.sendResponse(
		isSingle ? array_first(loaded_orders) : loaded_orders
	);
}
