import './globals.css';
import '../styles/styles';

import '../../public/fonts/fonts.css';
import 'bootstrap-icons/font/bootstrap-icons.css'; 
import { DBManager } from '@azrico/nodeserver';

export default async function RootLayout(props: any) {
	return props.children;
}
