'use client';
import React, { useState } from 'react';
import Link from '@/navigation';
import { Category } from '@codespase/core';
import { autoPlacement } from '@floating-ui/dom';
import clsx from 'clsx';
import {
	useFloating,
	autoUpdate,
	size,
	useHover,
	offset,
	shift,
	useRole,
	useDismiss,
	useInteractions,
	useListNavigation,
	useTypeahead,
	FloatingPortal,
	FloatingFocusManager,
	FloatingOverlay,
	safePolygon,
	useTransitionStyles,
	useTransitionStatus,
	FloatingArrow,
} from '@floating-ui/react';
import { object_isEmpty } from '@azrico/object';

export function HeaderDropdown(props: { categories: Partial<Category>[] }) {
	const { categories } = props;
	const [currentItemId, setCurrentItemId] = useState('');
	const isOpen = Boolean(currentItemId);

	const mainCategories = React.useMemo(() => {
		return categories.filter((s) => !s.parent_id);
	}, [categories]);

	const isFirstLastActive = React.useMemo(() => {
		if (object_isEmpty(mainCategories)) return '';
		if (mainCategories[0]._id === currentItemId) return 'first';
		if (mainCategories[mainCategories.length - 1]._id === currentItemId) return 'last';
		return '';
	}, [mainCategories, currentItemId]);
	const { refs, floatingStyles, context } = useFloating({
		open: isOpen,
		onOpenChange: (op) => {
			if (!op) setCurrentItemId('');
		},
		middleware: [
			size({
				apply({ rects, elements }) {
					Object.assign(elements.floating.style, {
						width: `${rects.reference.width}px`,
					});
				},
			}),
		],
		placement: 'bottom',
		whileElementsMounted: autoUpdate,
	});

	const { isMounted, styles } = useTransitionStyles(context, {
		duration: 300,
	});
	const role = useRole(context, { role: 'menu' });
	const dismiss = useDismiss(context);

	const hover = useHover(context, {
		restMs: 100,
		move: false,
		handleClose: safePolygon({
			requireIntent: false,
			buffer: 1,
		}),
	});

	const { getFloatingProps, getReferenceProps, getItemProps } = useInteractions([
		role,
		dismiss,
		hover,
	]);

	const handleMouseEnter = (id: string | undefined) => {
		setCurrentItemId(id ?? '');
	};
	const handleMouseClick = (id: string | undefined) => {
		if (currentItemId === id) setCurrentItemId('');
		else setCurrentItemId(id ?? '');
	};

	return (
		<>
			<div
				ref={refs.setReference}
				{...getReferenceProps()}
				className={clsx(
					'hidden lg:flex flex-row gap-1 lg:gap-2',
					'justify-between items-center w-full z-[150]',
					'relative'
				)}
			>
				{mainCategories.map((v, i) => {
					const isActive = v._id === currentItemId;
					return (
						<li
							key={i}
							data-active={isActive}
							className={clsx(
								'flex flex-row justify-center px-1 lg:px-1.5 py-2 rounded-t-lg list-none outline-none',
								'z-[200] data-[active=true]:z-[250] data-[active=true]:bg-base-200',
								'text-sm gap-1'
							)}
							onMouseEnter={() => handleMouseEnter(v._id)}
							onClick={() => handleMouseClick(v._id)}
							dir="rtl"
						>
							<Link href={``}>
								<b className="">{v.name}</b>
							</Link>
							<i className="bi bi-caret-down-fill opacity-60"></i>
						</li>
					);
				})}
			</div>
			{isOpen && (
				<FloatingOverlay
					className={clsx(
						'bg-black',
						'transition-colors duration-200 z-[100]',
						isMounted ? 'bg-opacity-15' : 'bg-opacity-0'
					)}
					style={styles}
				>
					<FloatingFocusManager context={context} initialFocus={refs.floating}>
						<div
							className="outline-none z-[1000]"
							ref={refs.setFloating}
							style={floatingStyles}
							{...getFloatingProps()}
						>
							<HeaderDropDownInner
								categories={categories}
								currentItemId={currentItemId}
								isFirstLastActive={isFirstLastActive}
							/>
						</div>
					</FloatingFocusManager>
				</FloatingOverlay>
			)}
			<FloatingPortal></FloatingPortal>
		</>
	);
}
function HeaderDropDownInner(props: {
	isFirstLastActive: string;
	categories: Partial<Category>[];
	currentItemId: string;
}) {
	const { isFirstLastActive, categories, currentItemId } = props;
	const currentSubCategories = React.useMemo(() => {
		return categories.filter((s) => s.parent_id == currentItemId);
	}, [categories, currentItemId]);
	return (
		<ul
			className={clsx(
				'size-full menu menu-horizontal bg-base-200 outline-none',
				'rounded-md',
				isFirstLastActive === 'first' && '!rounded-tl-none',
				isFirstLastActive === 'last' && '!rounded-tr-none'
			)}
		>
			{currentSubCategories.map((r) => {
				const subcats = categories.filter((s) => s.parent_id === r._id);
				return (
					<li key={r._id}>
						<a>{r.name}</a>
						<ul>
							{subcats.map((sub) => {
								return (
									<li key={sub._id}>
										<a>{sub.name}</a>
									</li>
								);
							})}
						</ul>
					</li>
				);
			})}
		</ul>
	);
}
export default HeaderDropdown;
