import React from 'react';
import { Container } from './Container';
import { CustomerInfo } from './Info';

import OrdersBar from './OrdersBar';
import { Orders } from './Orders';

export const Dashboard = () => {
	return (
		<div className="flex flex-col gap-6 justify-between items-center text-sm p-4">
			<CustomerInfo previous={true} />
			<Orders useCategories={true} />
		</div>
	);
};
