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
interface HeaderDropdownContentProps {}

const categories: Category[] = [
	new Category({ _id: '1', name: 'لوازم التحریر' }),
	new Category({ _id: '12', name: 'کتاب ها' }),
	new Category({ _id: '13', name: 'زونکن و کلاسورجدید' }),
	new Category({ _id: '14', name: 'اکسپندینگ و کلیربوک' }),
	new Category({ _id: '15', name: 'زیر دستی و آلبوم' }),
	new Category({ _id: '16', name: 'کیف و کوله پشتی' }),
	new Category({ _id: '17', name: 'ست محصول ها' }),
	new Category({ _id: 'zir1', parentid: '1', name: 'zir محصول ها' }),
	new Category({ _id: '3123232', parentid: 'zir1', name: 'subsub' }),
];

const mainCategories = categories.filter((s) => !s.parentid);

const HeaderDropdown: React.FC<HeaderDropdownContentProps> = ({}) => {
	const [currentItemId, setCurrentItemId] = useState('');
	const isOpen = Boolean(currentItemId);

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

	const handleMouseEnter = (id: string) => {
		setCurrentItemId(id);
	};

	return (
		<>
			<div
				ref={refs.setReference}
				{...getReferenceProps()}
				className={clsx(
					'justify-between items-center w-full px-1',
					'hidden lg:flex lg:w-auto relative z-0'
				)}
			>
				{mainCategories.map((v, i) => {
					const isActive = v._id === currentItemId;
					return (
						<li
							data-active={isActive}
							key={i}
							className={clsx(
								'mx-0 lg:mx-1 py-2 px-1 lg:px-2 rounded-t-lg list-none outline-none',
								'z-0 data-[active=true]:z-50 data-[active=true]:bg-base-200'
							)}
							onMouseEnter={() => handleMouseEnter(v._id)}
						>
							<Link href={``}>
								<b>{v.name}</b>
							</Link>
							<i className="bi bi-caret-down-fill text-xs px-1 opacity-60"></i>
						</li>
					);
				})}
			</div>
			<FloatingPortal>
				{isOpen && (
					<FloatingOverlay
						className={clsx(
							'bg-black z-50',
							'transition-colors duration-200',
							isMounted ? 'bg-opacity-15' : 'bg-opacity-0'
						)}
						style={styles}
					>
						<FloatingFocusManager context={context} initialFocus={refs.floating}>
							<div
								className="outline-none"
								ref={refs.setFloating}
								style={floatingStyles}
								{...getFloatingProps()}
							>
								<HeaderDropDownInner />
							</div>
						</FloatingFocusManager>
					</FloatingOverlay>
				)}
			</FloatingPortal>
		</>
	);
};
function HeaderDropDownInner(props: any) {
	return (
		<ul className="size-full menu menu-horizontal bg-base-200 rounded-md outline-none">
			<li>
				<a>Solutions</a>
				<ul>
					<li>
						<a>Design</a>
					</li>
					<li>
						<a>Development</a>
					</li>
					<li>
						<a>Hosting</a>
					</li>
					<li>
						<a>Domain register</a>
					</li>
				</ul>
			</li>
			<li>
				<a>Enterprise</a>
				<ul>
					<li>
						<a>CRM software</a>
					</li>
					<li>
						<a>Marketing management</a>
					</li>
					<li>
						<a>Security</a>
					</li>
					<li>
						<a>Consulting</a>
					</li>
				</ul>
			</li>
			<li>
				<a>Products</a>
				<ul>
					<li>
						<a>UI Kit</a>
					</li>
					<li>
						<a>Wordpress themes</a>
					</li>
					<li>
						<a>Wordpress plugins</a>
					</li>
					<li>
						<a>Open source</a>
						<ul>
							<li>
								<a>Auth management system</a>
							</li>
							<li>
								<a>VScode theme</a>
							</li>
							<li>
								<a>Color picker app</a>
							</li>
						</ul>
					</li>
				</ul>
			</li>
			<li>
				<a>Company</a>
				<ul>
					<li>
						<a>About us</a>
					</li>
					<li>
						<a>Contact us</a>
					</li>
					<li>
						<a>Privacy policy</a>
					</li>
					<li>
						<a>Press kit</a>
					</li>
				</ul>
			</li>
		</ul>
	);
}
export default HeaderDropdown;
