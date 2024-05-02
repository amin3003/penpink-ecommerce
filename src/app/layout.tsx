import './globals.css';
import '../styles/styles';

import '../../public/fonts/fonts.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { DBManager } from '@azrico/nodeserver';

export default async function RootLayout({ children }: any) {
	DBManager.extra_logs = false;
	DBManager.init();
	await DBManager.tryToConnect(false);
	await DBManager.get_client(); 
	return children;
}
