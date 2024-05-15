export async function GET(req: Request, data: any) {}
export async function POST(req: Request) {
	const reqbody = await req.json();
	console.log(reqbody);
	//TODO auth the user and return token
	return Response.json({ data: 0 });
}
