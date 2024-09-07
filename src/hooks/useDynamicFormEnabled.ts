import React from 'react';
import { BreakpointKey, useBreakpoint } from './useBreakpoint';
import { array_merge } from '@azrico/object';

export type useDynamicFormEnabledProps = {
	breakpoint?: BreakpointKey;
	above?: boolean;
};
/**
 * disable form inputs and butons on specefic size
 * @param breakpointKey
 * @param element
 */
export function useDynamicFormEnabled(
	form: HTMLElement | undefined,
	breakpoint: BreakpointKey | undefined,
	above: boolean
) {
	const { isAbove } = useBreakpoint(breakpoint || 'xs');

	const formElements = React.useMemo(() => {
		return array_merge(
			Array.from(form?.getElementsByTagName('input') || []),
			Array.from(form?.getElementsByTagName('button') || [])
		);
	}, [form]);

	const isActive = React.useMemo(() => {
		if (!breakpoint) return true;
		if (isAbove === above) return true;
		return false;
	}, [above, isAbove, breakpoint]);

	React.useLayoutEffect(() => {
		formElements.forEach((input) => {
			if (!input.dataset.name) input.dataset.name = input.name;
			if (!input.dataset.disabled) input.dataset.disabled = input.disabled;

			if (isActive) {
				input.disabled = false;
				input.name = input.dataset.name;
			} else {
				input.disabled = Boolean(input.dataset.disabled);
				input.name = '';
			}
		});
	}, [formElements, isActive]);
	React.useLayoutEffect(() => {
		if (!form) return;
		form.hidden = !isActive;
	}, [form, isActive, isAbove, breakpoint]);
}
