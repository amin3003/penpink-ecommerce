import { Order } from '@codespase/core';
import fs from 'fs';

const mailStyles = `.header,th{color:#333}.content,.footer,.fun-element,.header{text-align:center}body{font-family:'B Titr',Arial,sans-serif;margin:0;padding:20px;background:linear-gradient(180deg,#f0e6e6,#f2e6e6 60%,#f0e6e6);direction:rtl}.container{max-width:600px;margin:0 auto;padding:20px;background-color:#fefefe;box-shadow:0 0 10px rgba(0,0,0,.1);box-sizing:border-box}.content,.header img,table{margin-bottom:20px}.total,th{background-color:#f8f8f8}.content,td{color:#666}.header img{max-width:100px}.header h1{margin:0;font-size:24px}.content p,.header p{margin:10px 0}.header p{color:green;font-weight:bolder;font-size:16px}.content{font-size:16px}table{width:100%;border-collapse:collapse}td,th{padding:12px;text-align:right;border-bottom:1px solid #ddd}.total{font-weight:700}.footer{margin-top:20px}.footer a,.footer p{font-size:14px;color:#999}.fun-element{font-size:18px;color:#ff91b9;margin:20px 0}`;

export async function EmailTemplate(order: Order) {
	let res = '';
	res += '<html>';
	res += `<style>${mailStyles}</style>`;
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
            <p>از خرید شما، {customerFirstName} {customerLastName}، بسیار خوشحالیم و امیدواریم که از محصولات ما لذت ببرید.</p>
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
