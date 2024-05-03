import './globals.css';
import '../styles/styles';

import '../../public/fonts/fonts.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { DBManager } from '@azrico/nodeserver';
import AzFetch from '@azrico/fetch';
import Azfetch from '@azrico/fetch';
import { getHost } from '@/navigation';

export default async function RootLayout(props: any) {
	await init();

	return props.children;
}
async function init() {
	DBManager.extra_logs = false;
	DBManager.init();
	await DBManager.tryToConnect(false);
	await DBManager.get_client();
}