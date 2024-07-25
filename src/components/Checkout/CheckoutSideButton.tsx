'use client';
import React, { FormEvent } from 'react';
import Link, { useRouter } from '@/navigation';
import clsx from 'clsx';
import { saveOrderAction, saveAddressAction } from './checkoutActions';
import { useFormState, useFormStatus } from 'react-dom';
import { findCheckoutPath } from './CheckoutBox';
import { combineUrls, sanitize_slug } from '@azrico/string';
import { wrap_array } from '@azrico/object';
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
		let formRes: any = false;
		let goodResult = false;
		if (addressForm) {
			/**
			 * if there is a address form update user address
			 */
			const formData = new FormData(addressForm);
			const formDataString = JSON.stringify(Object.fromEntries(formData));
			formRes = await saveAddressAction(formDataString);

			if (formRes === true) {
				goodResult = true;
			} else {
				/**
				 * we have an error in one of the forms
				 * usually the bad field is sent like this:
				 * => {field} is invalid
				 * we send this field to the URL so server components can show the error for the field
				 */
				const newUrl = wrap_array(formRes)
					.map((err) => {
						return (
							`error=` +
							sanitize_slug((String(formRes).split('{').pop() ?? '').split('}').shift())
						);
					})
					.join('&');
				router.push(`?${newUrl}`, {});
			}
		} else if (cpath.options.confirm) {
			/**
			 * if this is the final step, save current order of the current user
			 */
			formRes = await saveOrderAction();

			console.log('formRes', formRes);
			if (formRes !== false) {
				goodResult = true;
				const idResult =
					typeof formRes === 'object'
						? (formRes._index_value ?? formRes._id)
						: String(formRes);
				url = combineUrls(url, '?order=' + idResult);
			}
		}

		if (goodResult) {
			router.push(url, {});
		}
		return goodResult;
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
			{Boolean(pending) && (
				<span className="loading loading-dots loading-lg text-white"></span>
			)}

			{String(props.text)}
		</button>
	);
}
