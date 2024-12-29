import { AuthHelper, DBManager, RequestHelper } from '@azrico/nodeserver';
import { object_excludeKeys, object_isEmpty } from '@azrico/object';
import { string_isEmail, string_isEmpty } from '@azrico/string';
import { SimpleUserPreference } from '@codespase/core';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
	const uid = req.cookies.get('x-uid')?.value;
	const reqbody = await req.json();
	if (!uid) return Response.json({ error: 'user not found' }, { status: 404 });
	/* ----------------------------- verify address ----------------------------- */
	const addressObject = object_excludeKeys(reqbody, ['_']);

	let errors: string[] = [];
	if (string_isEmpty(addressObject.name)) errors.push('[400] {name} is invalid');
	if (string_isEmpty(addressObject.lastname)) errors.push('[400] {lastname} is invalid');
	if (string_isEmpty(addressObject.address)) errors.push('[400] {address} is invalid');
	if (string_isEmpty(addressObject.address)) errors.push('[400] {address} is invalid');

	if (!string_isEmail(addressObject.email)) errors.push('[400] {email} is invalid');

	if (!object_isEmpty(errors))
		return await RequestHelper.sendResponse({ error: errors }, '', 400);

	const key = 'address';
	const value = JSON.stringify(addressObject);
	const res = await DBManager.upsert(
		SimpleUserPreference.get_dbname(),
		{
			userid: uid,
			key: key,
		},
		{ value: value },
		{
			history: false,
			user: AuthHelper.getSystemUser(),
		}
	);
	return await RequestHelper.sendResponse(res);
}
export const dynamic = 'force-dynamic';
