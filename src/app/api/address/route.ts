import { RequestHelper } from '@azrico/nodeserver';
import { object_excludeKeys } from '@azrico/object';
import { string_isEmail, string_isEmpty } from '@azrico/string';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
	const uid = req.cookies.get('x-uid')?.value;
	const reqbody = await req.json();
	if (!uid) return Response.json({ error: 'user not found' }, { status: 404 });
	/* ----------------------------- verify address ----------------------------- */
	const addressObject = object_excludeKeys(reqbody, ['_']);
	console.log('SAVE ADDR:', addressObject);

	let response: string | Error = 'ok';
	if (string_isEmpty(addressObject.name)) response = Error('[400] "name" is invalid');
	if (string_isEmpty(addressObject.lastname))
		response = Error('[400] "lastname" is invalid');
	if (!string_isEmail(addressObject.email)) response = Error('[400] "email" is invalid');
	if (string_isEmpty(addressObject.address))
		response = Error('[400] "address" is invalid');

	return await RequestHelper.sendResponse(response);
}
export const dynamic = 'force-dynamic';
