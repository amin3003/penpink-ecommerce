import React from 'react';
import clsx from 'clsx';
export default function Rating(props: { rate?: number; className?: string }) {
	return (
		<div className={clsx('rating h-min', props.className)}>
			<input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
			<input
				type="radio"
				name="rating-2"
				className="mask mask-star-2 bg-orange-400"
				defaultChecked
			/>
			<input
				type="radio"
				name="rating-2"
				defaultChecked
				className="mask mask-star-2 bg-orange-400"
			/>
			<input
				type="radio"
				name="rating-2"
				defaultChecked
				className="mask mask-star-2 bg-orange-400"
			/>
			<input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
		</div>
	);
}
