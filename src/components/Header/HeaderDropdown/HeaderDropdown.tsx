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

	const isFirstLastActive = React.useMemo(() => {
		if (mainCategories[0]._id === currentItemId) return 'first';
		if (mainCategories[mainCategories.length - 1]._id === currentItemId) return 'last';
		return false;
	}, [mainCategories, currentItemId]);

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
							<HeaderDropDownInner isFirstLastActive={isFirstLastActive} />
						</div>
					</FloatingFocusManager>
				</FloatingOverlay>
			)}
			<FloatingPortal></FloatingPortal>
		</>
	);
};
function HeaderDropDownInner(props: any) {
	const isFirstLastActive = props.isFirstLastActive;
	return (
		<ul
			className={clsx(
				'size-full menu menu-horizontal bg-base-200 outline-none',
				'rounded-md',
				isFirstLastActive === 'first' && '!rounded-tl-none',
				isFirstLastActive === 'last' && '!rounded-tr-none'
			)}
		>
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
