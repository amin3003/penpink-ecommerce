import { NextRequest, NextResponse } from 'next/server';
import { DBId, ObjectHelper, RequestHelper, ServerApi } from '@azrico/nodeserver';
import fs from 'fs';
import { Order } from '@codespase/core';
import { array_isEmpty, object_isEmpty, object_isTrue } from '@azrico/object';
import nodemailer from 'nodemailer';
import { EmailTemplate } from './EmailTemplate';
import Logger from '@azrico/debug';
import { saveOrder } from '../orders/orderFunctions';

export async function sendOrderMail(orderId: string | number | Order) {
	if (object_isEmpty(orderId)) return new Error('[404] order not found');
	const targetOrder = await Order.get_single(orderId);
	if (object_isEmpty(targetOrder)) return new Error('[404] order not found');
	/* ------------------- check if we already sent the email ------------------- */
	if (object_isTrue(targetOrder.getMetaValue('mail_sent'))) {
		return await RequestHelper.sendResponse(
			new Error('[400] order mail is already sent')
		);
	}

	/* ---------------------------- sending the mail ---------------------------- */

	const targetMail = targetOrder.get('address')?.email;
	Logger.log_message('mail', 'sending mail to: ', targetMail);

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
	const mailHtml = await EmailTemplate(targetOrder);

	var inLineCss = require('nodemailer-juice');
	transporter.use('compile', inLineCss());

	const mailres = await transporter.sendMail({
		from: 'Penpink <info@penpink.com>',
		to: targetMail,
		subject: 'سفارش شما دریافت شد',
		html: mailHtml,
	});

	const isSent =
		!array_isEmpty(mailres.accepted) && mailres.accepted.includes(targetMail);

	if (isSent) {
		/* ------------------------- mark order as mail sent ------------------------ */
		await targetOrder.setMetaValue('mail_sent', 'true');
		await saveOrder(targetOrder, false);
	} else {
		await targetOrder.setMetaValue('mail_error', JSON.stringify(mailres));
		await saveOrder(targetOrder, false);
	}

	return isSent;
}
