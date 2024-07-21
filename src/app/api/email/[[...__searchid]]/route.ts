import { NextRequest, NextResponse } from 'next/server';
import { DBId, ObjectHelper, RequestHelper, ServerApi } from '@azrico/nodeserver';
import fs from 'fs';
import { Order } from '@codespase/core';
import { object_isEmpty } from '@azrico/object';
import nodemailer from 'nodemailer';
import { EmailTemplate } from '../EmailTemplate';

export async function GET(req: NextRequest, data: any) {
	return NextResponse.rewrite('hi');
}
export async function POST(req: NextRequest, data: any) {
	/* --------------------- send email for the given order --------------------- */
	ServerApi.init();
	const rd = await RequestHelper.get_request_data([req, data]);
	const sid = DBId.getIdSearchObject(rd);

	if (object_isEmpty(sid))
		return await RequestHelper.sendResponse(new Error('[404] order not found'));
	const targetOrder = await Order.get_single(sid);

	if (object_isEmpty(targetOrder))
		return await RequestHelper.sendResponse(new Error('[404] order not found'));

	const mailres = await sendMail();
	return await RequestHelper.sendResponse(mailres);
}
async function sendMail() {
	const MAIL_HOST = process.env.MAIL_HOST;
	const MAIL_PORT = process.env.MAIL_PORT;
	const MAIL_USER = process.env.MAIL_USER;
	const MAIL_PASSWORD = process.env.MAIL_PASSWORD;
	const transporter = nodemailer.createTransport({
		host: MAIL_HOST,
		port: MAIL_PORT,
		tls: true,
		auth: {
			user: MAIL_USER,
			pass: MAIL_PASSWORD,
		},
	} as any);
	const mailHtml = await EmailTemplate();

	var inLineCss = require('nodemailer-juice');
	transporter.use('compile', inLineCss());
	return await transporter.sendMail({
		from: 'Penpink <info@penpink.com>',
		to: 'mehrdadtavangar@gmail.com',
		subject: 'سفارش شما دریافت شد',
		html: mailHtml,
	});
}