import { Order } from '@codespase/core';
import fs from 'fs';
export async function EmailTemplate(order: Order) {
	let res = '';
	res += '<html>';
	res += `<style>${getStyles()}</style>`;
	res += `<body class='container'>`;

	res += `<div class="header">
			<img src="https://penpink.com/images/logo/f2bed1.svg" alt="Logo">
			<h1>فروشگاه لوازم التحریر</h1>
			<p id="orderStatus">
				${order.get('status')}
			</p>
			</div>`;
	/* -------------------------------------------------------------------------- */
	res += `<div class="content">
			<p>از خرید شما بسیار خوشحالیم و امیدواریم که از محصولات ما لذت ببرید.</p>
		</div>`;
	/* -------------------------------------------------------------------------- */
	res += `<table id="invoiceTable">
			<thead>
				<tr>
					<th>مورد</th>
					<th>تعداد</th>
					<th>قیمت</th>
					<th>کل</th>
				</tr>
			</thead>
			<tbody>
				<!-- script --> `;

	order.get('items').forEach((opr) => {
		const product = opr.__original_product;
		res += `<tr>
					<th>${product?.name}</th>
					<th>${opr.get('quantity')}</th>
					<th>${opr.get('price')}</th>
					<th>${opr.total}</th>
				</tr>`;
	});
	res += ` 
			</tbody>
		</table>`;
	/* -------------------------------------------------------------------------- */
	res += `<div class="footer">
			<p> از خرید شما متشکریم ! اگر سوالی دارید، لطفا با ما تماس بگیرید. </p>
			<bdi>
				<a href="https://wa.me/+905346545810" class="">+90 534 654 58 10</a>

			</bdi>
		</div>
		<div class="fun-element">
			<p>با احترام، فروشگاه لوازم التحریر صورتی ✏️ </p>
		</div>`;

	res += '</body>';
	res += '</html>';

	res = res.replaceAll('\t', '').replaceAll('\n', '');
	return res;
}
export function getStyles() {
	let emailFormText = fs.readFileSync('./src/assets/mailStyles.css').toString();
	return emailFormText;
}
