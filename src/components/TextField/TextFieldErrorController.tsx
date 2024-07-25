'use client';
import clsx from 'clsx';
import React from 'react';
import { Modify } from '@azrico/types';
import Link from 'next/link';
import { Url } from 'next/dist/shared/lib/router/router';

/**
 * removes `aria-errormessage` of text field after user makes any changes to it
 * @param props
 * @returns
 */
export function TextFieldErrorController(props: { name: string }) {
	//TODO FIX this...

	// const onChanged = React.useCallback((event: Event) => {
	// 	const target = event.target as HTMLInputElement;
	// 	console.log('onChanged', event);
	// 	/* -------------------------------------------------------------------------- */
	// 	const lastError = String(target.getAttribute('aria-errormessage'));
	// 	if (lastError) {
	// 		target.setAttribute('last-errormessage', lastError);
	// 	}
	// 	target.removeAttribute('aria-errormessage');
	// }, []);
	// const onLoad = React.useCallback((event: Event) => {
	// 	const target = event.target as HTMLInputElement;
	// 	console.log('onLoad', event);
	// }, []);
	// React.useEffect(() => {
	// 	let elements = document.getElementsByName(props.name);
	// 	console.log('elements', elements);
	// 	elements.forEach((r) => {
	// 		r.addEventListener('load', onLoad);
	// 		r.addEventListener('change', onChanged);
	// 	});
	// 	return () => {
	// 		elements.forEach((r) => {
	// 			r.removeEventListener('change', onChanged);
	// 		});
	// 	};
	// }, [onChanged, props.name]);
	return <></>;
}
export default TextFieldErrorController;
