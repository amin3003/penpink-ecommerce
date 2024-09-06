import React from 'react';
import { BreakpointKey, useBreakpoint } from './useBreakpoint';

/**
 * if the gievn breakpoint does not hit remove the target element
 * @param breakpointKey
 * @param element
 */
export function useOnlyOnSize(
	breakpointKey: BreakpointKey,
	element: string,
	above = true
) {
	const isElementRemoved = React.useRef(false);
	const { isBelow } = useBreakpoint(breakpointKey);
	React.useEffect(() => {
		if (isElementRemoved.current) return;
		if (isBelow === above) {
			const elem = document.getElementById(element);
			if (elem) {
				elem.remove();
				isElementRemoved.current = true;
			}
		}
	}, [isBelow, element, above]);
}
