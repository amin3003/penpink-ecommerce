'use client';
import React from 'react';
import { useFormStatus } from 'react-dom';

export default function AddToBasketButton(props: {
	small?: boolean;
	cart?: boolean;
	cartValue?: number;
}) {
	const { pending } = useFormStatus();

	if (props.cart) {
		return (
			<div
				className="rounded-xl bg-base-100 border-solid flex items-center px-2 py-1 gap-2"
				dir="rtl"
			>
				<button
					className="btn btn-ghost btn-circle"
					type="submit"
					name="quantity"
					defaultValue="remove"
				>
					<i className="bi bi-dash" />
				</button>
				<div>
					<p>{props.cartValue ?? '0'}</p>
				</div>
				<button
					className="btn btn-ghost btn-circle"
					type="submit"
					name="quantity"
					defaultValue="add"
				>
					<i className="bi bi-plus" />
				</button>
			</div>
		);
	}
	if (props.small)
		return (
			<button
				type="submit"
				name="quantity"
				defaultValue="add"
				className="btn btn-circle btn-ghost"
				disabled={pending}
			>
				<i className="bi bi-bag-plus" />
			</button>
		);
	return (
		<button
			type="submit"
			name="quantity"
			defaultValue="add"
			className="btn btn-md text-xs md:text-md btn-primary flex items-center w-full"
			disabled={pending}
		>
			{pending && <span className="loading loading-dots loading-md text-white"></span>}
			افزودن به سبد خرید
		</button>
	);
}
