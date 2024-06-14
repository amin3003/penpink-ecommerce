import { DBId, DBManager, RequestHelper, ServerApi } from '@azrico/nodeserver';
import { array_first, array_makeArrayMap } from '@azrico/object';
import { Order, OrderProduct } from '@codespase/core';

export async function GET(req: Request, data: any) {
	ServerApi.init();
	const search = decodeURIComponent(data.params.search ?? '');
	let loaded_orders: Order[] = [];

	/* ----------------------------- get the orders ----------------------------- */
	if (!search) {
		loaded_orders = await Order.get_list({ __limit: 100, ...data.params });
	} else loaded_orders = [(await Order.get_single(search)) as Order];

	/* ------------------------- get items of the order ------------------------- */
	const sq = {
		order_id: { $in: loaded_orders.map((r) => r.getID()) },
	};
	const orderProducts = await OrderProduct.get_list(sq);

	/* -------------- add all the items we loaded into their order -------------- */
	const orderProductsMap = array_makeArrayMap(orderProducts, 'order_id');
	loaded_orders.forEach((r) => {
		r.items = orderProductsMap[r.getID()];
	});
	return await RequestHelper.sendResponse(search ? loaded_orders : array_first(loaded_orders));
}
