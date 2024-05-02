'use client';
import React from 'react';
import { Product, ProductVariation } from '@codespase/core';
import { gstorage, gbasket } from '@azrico/global';
import Image from 'next/image';
export default function AddToBasketController(props: {
	buttonid: string;
	variation_code: string;
}) {
	const { buttonid, variation_code } = props;
	const [itemBasket, set_itemBasket] = React.useState<any>();

	const addToBasket = React.useCallback(() => {}, []);
	React.useEffect(() => {
		const btnElement = document.getElementById(buttonid);
		btnElement?.addEventListener('click', addToBasket);
		//we must use variation codes for items in basket
		//because user maybe add same id to basket with different colors
		// const item_in_basket = await gbasket.get(vcode);
		gbasket.get(variation_code).then(set_itemBasket);
	}, [variation_code, addToBasket, buttonid]);

	return <></>;
}
