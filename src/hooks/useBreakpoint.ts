import { useMediaQuery } from 'react-responsive';

const breakpoints = {
	xs: '480px',
	sm: '640px',
	md: '768px',
	lg: '1024px',
	xl: '1280px',
};

export type BreakpointKey = keyof typeof breakpoints;

export function useBreakpoint<K extends BreakpointKey>(breakpointKey: K) {
	const breakpointValue = breakpoints[breakpointKey as keyof typeof breakpoints];
	const bool = useMediaQuery({
		query: `(max-width: ${breakpointValue})`,
	});
	const capitalizedKey = breakpointKey[0].toUpperCase() + breakpointKey.substring(1);

	type KeyAbove = `isAbove${Capitalize<K>}`;
	type KeyBelow = `isBelow${Capitalize<K>}`;

	return {
		[breakpointKey]: Number(String(breakpointValue).replace(/[^0-9]/g, '')),
		[`isAbove`]: !bool,
		[`isAbove${capitalizedKey}`]: !bool,
		[`isBelow`]: bool,
		[`isBelow${capitalizedKey}`]: bool,
	} as Record<K, number> &
		Record<KeyAbove | KeyBelow, boolean> & { isAbove: boolean; isBelow: boolean };
}
