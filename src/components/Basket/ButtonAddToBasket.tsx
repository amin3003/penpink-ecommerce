'use client';
import React from 'react';
import { Product } from '@codespase/core';

export default function ButtonAddToBasket(props: { productid: string; small?: boolean }) {
	//TODO: when button is clicked add to basket

	function btnClicked(e: any) {
		e.stopPropagation();
		e.preventDefault();
	}
	if (props.small)
		return (
			<button onClick={btnClicked}>
				<i className="bi bi-bag-plus" />
			</button>
		);
	return (
		<button className="btn btn-md btn-primary flex items-center" onClick={btnClicked}>
			Add to basket
		</button>
	);
}
