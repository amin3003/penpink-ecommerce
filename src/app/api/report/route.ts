import { DBManager, RequestHelper, ServerApi } from '@azrico/nodeserver';
import { array_makeArrayMap, array_sum } from '@azrico/object';
import { date_parse } from '@azrico/string';
import { Order, Product, SimpleUser } from '@codespase/core';
import { headers } from 'next/headers';
import { NextRequest } from 'next/server';

/**
 * get reports
 * @param req
 * @param data
 */
export async function GET(req: NextRequest, data: any) {
	ServerApi.init(req);
	const res = { stats: await loadStats(), report: await loadReport() };
	return RequestHelper.sendResponse(res);
}
async function loadReport() {
	const startDate = new Date();
	startDate.setDate(startDate.getDate() - 30 * 6);
	const allOrders = await Order.get_list({
		_created_date: { $gte: startDate.toISOString() },
	});
	for (const order of allOrders) {
		const odate = date_parse(order._created_date);
		if (!odate) continue;
		const orderMonth = `${odate.getFullYear()}-${odate.getMonth()}-1`;
		order.setTemp('month', orderMonth);
	}
	const ordersMap = array_makeArrayMap(allOrders, (order) => order.getTemp('month'));

	for (const key in ordersMap) {
		const orders = ordersMap[key];
		ordersMap[key] = {
			orders: orders.length,
			items: array_sum(orders.map((r) => r.items.length)),
			profit: array_sum(orders, 'profit'),
			total: array_sum(orders, 'total'),
			totalbuy: array_sum(orders, 'totalbuy'),
		} as any;
	}
	return ordersMap;
}
async function loadStats() {
	const startDate = new Date();
	startDate.setDate(startDate.getDate() - 7);
	return {
		order: {
			text: 'سفارشات',
			total: await DBManager.count(Order, {}),
			new: await DBManager.count(Order, {
				status: 'pending',
				_created_date: { $gte: startDate.toISOString() },
			}),
		},
		product: {
			text: 'محصولات',
			total: await DBManager.count(Product, {}),
			new: await DBManager.count(Product, {
				_created_date: { $gte: startDate.toISOString() },
			}),
		},
		users: {
			text: 'کاربران',
			total: await DBManager.count(SimpleUser, {}),
			new: await DBManager.count(SimpleUser, {
				_created_date: { $gte: startDate.toISOString() },
			}),
		},
	};
}
export const dynamic = 'force-dynamic';
