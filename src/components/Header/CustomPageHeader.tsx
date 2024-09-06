import { getServerPathname } from '@/navigation';
import ProductSearchbar from '../search/ProductSearchbar';
import clsx from 'clsx';

/**
 * each page can have a different header that we need to render it here (under main header)
 * and not in the page itself !
 */
export function CustomPageHeader() {
	const pathname = getServerPathname();
	let PageHeader;
	// if (pathname.endsWith('products')) {
	// 	PageHeader = ;
	// }

	return PageHeader;
}
