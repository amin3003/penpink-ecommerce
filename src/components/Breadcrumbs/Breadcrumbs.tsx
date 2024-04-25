import clsx from 'clsx';
import React from 'react';

export const Breadcrumbs = (props: { className?: string; header?: boolean }) => {
	return (
		<div className={clsx('pb-1 w-min', props.className)}>
			{props.header !== false && (
				<div className="flex flex-col justify-center mr-2">
					<b className="text-start" dir="auto">
						دفاتر
					</b>
					<p className="text-xs text-start" dir="auto">
						(5,074 محصول)
					</p>
				</div>
			)}

			<div className="text-xs breadcrumbs">
				<ul>
					<li>
						<a>خانه</a>
					</li>
					<li>
						<a>محصولات</a>
					</li>
					<li>کتاب ها</li>
				</ul>
			</div>
		</div>
	);
};
