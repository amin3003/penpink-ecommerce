import { NextRequest, NextResponse } from 'next/server';
import { DBId, ObjectHelper, RequestHelper, ServerApi } from '@azrico/nodeserver';
import fs from 'fs';
import { Order } from '@codespase/core';
import { array_isEmpty, object_isEmpty, object_isTrue } from '@azrico/object';
import nodemailer from 'nodemailer';
import { EmailTemplate } from '../EmailTemplate';
import Logger from '@azrico/debug';
import { sendOrderMail } from '../mailFunctions';

export async function GET(req: NextRequest, data: any) {
	return NextResponse.rewrite('hi');
}
export async function POST(req: NextRequest, data: any) {
	/* --------------------- send email for the given order --------------------- */
	ServerApi.init();
	const rd = await RequestHelper.get_request_data([req, data]);
	const sid = DBId.getIdSearchObject(rd);
	return await RequestHelper.sendResponse(sendOrderMail(sid));
}