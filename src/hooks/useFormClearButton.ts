import React from 'react';
import { ReadonlyURLSearchParams, useSearchParams } from 'next/navigation';
import { usePathname, useRouter } from '@/navigation';

export function useFormClearButton(form: HTMLElement | undefined, keysToClear: string[]) {
	const sp = useSearchParams();
	const router = useRouter();
	const pathname = usePathname();
	/* -------------------- reference to latest search params ------------------- */
	const currentSp = React.useRef<ReadonlyURLSearchParams>();
	React.useEffect(() => {
		currentSp.current = sp;
	}, [sp]);

	const onClearClick = React.useCallback(() => {
		if (!form || !currentSp.current) return;
		const newSp = new URLSearchParams(currentSp.current.toString());
		for (const key of keysToClear) {
			newSp.delete(key);
		}
		// cast to string
		const search = newSp.toString();
		// or const query = `${'?'.repeat(search.length && 1)}${search}`;
		const query = search ? `?${search}` : '';
		router.push(`${pathname}${query}`);
		return true;
	}, [form, keysToClear, router, pathname]);

	React.useEffect(() => {
		if (!form) return;
		const clearButton = form.querySelector('button[name="clear"]');
		if (clearButton) {
			clearButton.removeEventListener('click', onClearClick);
			clearButton.addEventListener('click', onClearClick);
		}
	}, [form, onClearClick]);

	return onClearClick;
}
