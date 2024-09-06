'use client';

import { BreakpointKey } from '@/hooks/useBreakpoint';
import { useOnlyOnSize } from '@/hooks/useOnlyOnSize';

/**
 * Removes target component based on screen size
 * this is mostly used to avoid rendering Search components twice on different screens
 */
export default function ScreenSizeComponentController(props: {
	element: string;
	above: boolean;
	breakpoint: BreakpointKey;
}) {
	useOnlyOnSize(props.breakpoint, props.element, props.above ?? true);
	return <></>;
}
