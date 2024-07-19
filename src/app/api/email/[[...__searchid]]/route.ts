import { NextRequest, NextResponse } from 'next/server';
import { DBId, ObjectHelper, RequestHelper, ServerApi } from '@azrico/nodeserver';
import fs from 'fs';
import { Order } from '@codespase/core';
import { object_isEmpty } from '@azrico/object';
export async function POST(req: NextRequest, data: any) {
	//send email for the given order
	ServerApi.init();
	const rd = await RequestHelper.get_request_data([req, data]);
	const sid = DBId.getIdSearchObject(rd);

	if (object_isEmpty(sid))
		return await RequestHelper.sendResponse(new Error('[404] order not found'));
	const targetOrder = await Order.get_single(sid);

	if (object_isEmpty(targetOrder))
		return await RequestHelper.sendResponse(new Error('[404] order not found'));

	let emailFormText = fs.readFileSync('./src/assets/invoice.html').toString();
	const allprops = targetOrder.allproperties as any;
	// for (const key in allprops) {
	// 	const replText = `{${key}}`;

	// 	emailFormText = emailFormText.replaceAll(replText, allprops[key]);
	// }

	return await RequestHelper.sendResponse(emailFormText);
}
