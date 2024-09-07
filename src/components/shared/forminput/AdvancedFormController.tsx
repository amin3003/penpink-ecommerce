'use client';
import React from 'react';
import { AdvancedFormProps } from './AdvancedForm';
import {
	useDynamicFormEnabled,
	useDynamicFormEnabledProps,
} from '@/hooks/useDynamicFormEnabled';

export default function AdvancedFormController(
	props: AdvancedFormProps & useDynamicFormEnabledProps & { formid: string }
) {
	const [form, set_form] = React.useState<HTMLElement>();

	/* ------------------- check if the form should be active ------------------- */

	const formInputs = React.useMemo(() => {
		return Array.from(form?.getElementsByTagName('input') || []);
	}, [form]);

	const submitFunction = React.useCallback(() => {
		formInputs.forEach((input) => {
			if (input.name && !input.value) {
				input.name = '';
			}
		});
	}, [formInputs]);
	/* ------------------------------- setup form ------------------------------- */
	React.useEffect(() => {
		const advForm = document.getElementById(props.formid);
		set_form(advForm || undefined);
		if (!advForm) console.error('advanced form failed to load: ', props.formid);
	}, [props.formid]);

	/* -------------------------------------------------------------------------- */
	React.useEffect(() => {
		if (form) {
			form.removeEventListener('submit', submitFunction);
			form.addEventListener('submit', submitFunction);
		}
		return () => {
			form?.removeEventListener('submit', submitFunction);
		};
	}, [form, submitFunction]);

	useDynamicFormEnabled(form, props.breakpoint, false !== props.above);

	return <></>;
}
