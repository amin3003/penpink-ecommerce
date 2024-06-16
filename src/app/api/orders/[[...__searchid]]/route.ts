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
	if (isSingle) {
		loaded_orders = [(await Order.get_single(search)) as Order];
	} else loaded_orders = await Order.get_list({ __limit: 100, ...data.params });

	/* ------------------------- get items of the order ------------------------- */
	const sq = {
		order_id: { $in: loaded_orders.map((r) => r.getID()) },
	};
	const orderProducts = (await OrderProduct.get_list(sq)) as OrderProduct[];

	/* --------------- load original products of each OrderProduct -------------- */
	const origProducts = await Product.get_list({
		_id: { $in: orderProducts.map((r) => r.product_id) },
	});
	const origProductsMap = array_makeMap(origProducts, '_id');
	orderProducts.forEach((r) => {
		if (!r.product_id) return;
		r.__original_product = origProductsMap[r.product_id];
	});

	/* -------------- add all the items we loaded into their order -------------- */
	const orderProductsMap = array_makeArrayMap(orderProducts, 'order_id');
	loaded_orders.forEach((r) => {
		r.items = orderProductsMap[r.getID()];
	});
	return await RequestHelper.sendResponse(
		isSingle ? array_first(loaded_orders) : loaded_orders
	);
}
