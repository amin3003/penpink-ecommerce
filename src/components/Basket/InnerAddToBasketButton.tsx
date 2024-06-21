'use client';
import { useRouter } from '@/navigation';
import React from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import addToBasketAction from './addToBasketAction';
import { ProductVariation } from '@codespase/core';
import DBImage from '../Image/DBImage';

export type SharedAddToBasketButtonProps = {
	small?: boolean;
	cart?: boolean;
	showprice?: boolean;
	overview?: boolean;
	cartValue?: number;
};
type InnerAddToBasketButtonProps = SharedAddToBasketButtonProps & {
	name?: string;
	product_id: string;
	variation_id: string;
	variation_data: Partial<ProductVariation>;
};
export default function InnerAddToBasketButton(props: InnerAddToBasketButtonProps) {
	const use_variation = new ProductVariation(props.variation_data);

	const router = useRouter();
	const [formState, formAction] = useFormState(async (p: any, fd: FormData) => {
		const res = await addToBasketAction(fd);
		if (res) router.refresh();
		return res as any;
	}, {});

	const btnElement = props.overview === true ? null : <ButtonComponent {...props} />;
	if (!props.showprice) return <span className="flex flex-col">{btnElement}</span>;

	return (
		<form className="flex flex-row gap-2 flex-1" dir="rtl" action={formAction}>
			<input hidden name="name" defaultValue={props.name} />
			<input hidden name="product_id" defaultValue={props.product_id} />
			<input hidden name="variation_id" defaultValue={props.variation_id} />
			<span className="felx flex-col flex-1">
				<div className="flex gap-2 items-center">
					<div className="flex flex-col justify-end items-end">
						<span>
							<p>{use_variation.useprice}</p>
						</span>
						<span>
							{use_variation.discount_percent > 0 && (
								<p className="line-through text-xs">{use_variation.price}</p>
							)}
						</span>
					</div>
					<DBImage height={32} width={32} src="toman.svg" />
				</div>
			</span>
			<span className="flex">{btnElement}</span>
		</form>
	);
}
function ButtonComponent(props: InnerAddToBasketButtonProps) {
	const { pending } = useFormStatus();

	if (props.cart) {
		return (
			<div
				className="rounded-xl bg-base-100 border-solid flex items-center px-2 py-1 gap-2 "
				dir="rtl"
			>
				<button
					disabled={pending}
					className="btn btn-md btn-ghost btn-square"
					type="submit"
					name="quantity"
					value="decrease"
				>
					<i className="bi bi-dash" />
				</button>
				<div>
					<p>{props.cartValue ?? '0'}</p>
				</div>
				<button
					disabled={pending}
					className="btn btn-md btn-ghost btn-square"
					type="submit"
					name="quantity"
					value="increase"
				>
					<i className="bi bi-plus" />
				</button>
				<button
					disabled={pending}
					className="btn btn-md btn-ghost btn-square"
					type="submit"
					name="quantity"
					value="delete"
				>
					<i className="bi bi-x-circle" />
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
			defaultValue="increase"
			className="btn btn-md text-xs md:text-md btn-primary flex items-center w-full"
			disabled={pending}
		>
			{pending && <span className="loading loading-dots loading-md text-white"></span>}
			افزودن به سبد خرید
		</button>
	);
}