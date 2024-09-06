'use client';
import React, { useState } from 'react';
import { useEffect } from 'react';
import state from '@c/shared/Store';
/**
 * only purpose of this element is to update scroll position into the document so CSS knows the scroll
 * we dont put this code in our header component directly because this code has to be 'use client'
 * @returns
 */
export default function ScrollDetector() {
	const headerElements = React.useRef<HTMLElement[]>();
	const lastScroll = React.useRef<number>();

	/* -------------------------- detect current scroll ------------------------- */
	const onScroll = React.useCallback((e: any) => {
		//we can use isTop in css to update css based on scroll
		if (!headerElements.current) {
			headerElements.current = Array.from(
				document.getElementsByClassName('header-data')
			) as HTMLElement[];
		}
		const currentScroll = window.scrollY;
		const isTop = String(currentScroll <= 0);
		state.top.current = Number(currentScroll);

		if (!headerElements.current) return;

		/* ----------------------- detecting if we are at top ----------------------- */
		headerElements.current.forEach((element) => {
			element.dataset.isTop = isTop;
		});

		/* ---------------------- detecting scroll up and down ---------------------- */
		let isGoingDown = '';
		if (!lastScroll.current || lastScroll.current == -1) {
			isGoingDown = 'false';
			lastScroll.current = currentScroll;
		} else {
			const scrollDelta = lastScroll.current - currentScroll;

			if (scrollDelta < -66) {
				/* ------------------------------- going down ------------------------------- */
				isGoingDown = 'true';
				lastScroll.current = currentScroll;
			} else if (scrollDelta > 66) {
				/* -------------------------------- going up -------------------------------- */
				isGoingDown = 'false';
				lastScroll.current = currentScroll;
			}
		}
		if (isGoingDown)
			headerElements.current.forEach((element) => {
				element.dataset.isGoingDown = isGoingDown;
			});
	}, []);
	React.useEffect(() => {
		document.addEventListener('scroll', onScroll);
		onScroll(null); //initial state
		return () => {
			document.removeEventListener('scroll', onScroll);
		};
	}, [onScroll]);
	return null;
}
