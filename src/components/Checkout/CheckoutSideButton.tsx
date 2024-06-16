'use client';
import React, { FormEvent } from 'react';
import Link, { useRouter } from '@/navigation';
import clsx from 'clsx';
import { saveOrderAction, savePreferenceAction } from './checkoutActions';
import { useFormState, useFormStatus } from 'react-dom';
import { findCheckoutPath } from './CheckoutBox';
import { combineUrls } from '@azrico/string';
type PropTypes = {
	url: any;
	disabled: boolean;
	text: string;
};
export const CheckoutSideButton = (props: PropTypes) => {
	const router = useRouter();

	async function saveFormsAndGo(fd: any) {
		const cpath = findCheckoutPath(window.location.pathname);

		if (!cpath) {
			router.push(props.url);
			return false;
		}

		/* -------------------------------------------------------------------------- */
		const addressForm = document.getElementById('address-form') as HTMLFormElement;
		let url = props.url;
		let formRes = false;
		let useResInUrl = false;
		if (addressForm) {
			/**
			 * if there is a address form update user address
			 */
			const formData = new FormData(addressForm);
			const formDataString = JSON.stringify(Object.fromEntries(formData));
			formRes = await savePreferenceAction('address', formDataString);
		} else if (cpath.options.confirm) {
			/**
			 * if this is the final step, save the order
			 */
			formRes = await saveOrderAction();
			useResInUrl = true;
		}

		if (formRes) {
			if (useResInUrl) url = combineUrls(url, '?id=' + formRes);
			router.push(url, {});
		} else {
			//show error
		}

		return Boolean(formRes) as any;
	}
	return (
		<form action={saveFormsAndGo}>
			<FormButton {...props} />
		</form>
	);
};
function FormButton(props: PropTypes) {
	const { pending } = useFormStatus();

	return (
		<button
			className={clsx(`btn btn-success w-full text-white`)}
			type="submit"
			aria-disabled={props.disabled || pending}
			disabled={props.disabled || pending}
		>
			{pending && <span className="loading loading-dots loading-lg text-white"></span>}

			{props.text}
		</button>
	);
}