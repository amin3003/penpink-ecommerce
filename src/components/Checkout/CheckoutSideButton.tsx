'use client';
import React from 'react';
import Link, { useRouter } from '@/navigation';
import clsx from 'clsx';
import { cookies } from 'next/headers';
import { SimpleUserPreference } from '@codespase/core';
import { gfunc } from '@azrico/global';
import savePreferenceAction from './savePreferenceAction';
import { wrap_array } from '@azrico/object';
import { redirect } from '@/navigation';

export const CheckoutSideButton = (props: {
	url: any;
	disabled: boolean;
	text: string;
	className: string;
}) => {
	const router = useRouter();

	async function saveFormsAndGo() {
		/**
		 * if there is a address form update user address
		 */
		const addressForm = document.getElementById('address-form') as HTMLFormElement;
		if (addressForm) {
			const formData = new FormData(addressForm);
			const formDataString = JSON.stringify(Object.fromEntries(formData));
			const prefres = await savePreferenceAction('address', formDataString);
		}

		router.push(props.url);
	}
	return (
		<button
			type="button"
			onClick={saveFormsAndGo}
			disabled={props.disabled}
			className={clsx(props.className, `btn w-full text-white mt-3`)}
		>
			{props.text}
		</button>
	);
};
