import React from 'react';
import SidebarCu from '@/components/Customer/SidebarCu';
import { Dashboard } from '@/components/Customer/Dashboard';
import { ChangePassword } from '@/components/Customer/ChangePassword';
import { Wishlist } from '@/components/Customer/Wishlist';
import { Addresses } from '@/components/Customer/Addresses';
import { Orders } from '@/components/Customer/Orders';
import { CustomerInfo } from '@/components/Customer/Info';
import { getServerPathname } from '@/navigation';

const componentsMap: { [key: string]: any } = {
	dashboard: Dashboard,
	'change-password': ChangePassword,
	wishlist: Wishlist,
	addresses: Addresses,
	orders: Orders,
	info: CustomerInfo,
};

export default async function Page(props: any) {
	const pathname = getServerPathname();
	const modifiedPathname = pathname.split('/').slice(1).join('/');

	const SelectedComponent = componentsMap[modifiedPathname] || Dashboard; // Default to Dashboard if no match

	return (
		<div className="flex flex-col justify-center md:flex-row gap-4 p-5">
			<SidebarCu />
			<div className="flex-1">
				<SelectedComponent />
			</div>
		</div>
	);
}
