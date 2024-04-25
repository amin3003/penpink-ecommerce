import React from 'react';
import { Product, ProductVariation } from '@codespase/core';
import Image from 'next/image';
import { array_first, wrap_array } from '@azrico/object';
import Rating from '../../Rating';
import clsx from 'clsx';
export default function SingleComment(props: { comment: any }) {
	const { comment } = props;
	return (
		<div
			className={clsx('flex flex-col gap-2 border-2 rounded-lg', 'p-3 min-w-64 min-h-20')}
		>
			<div className="flex flex-row px-2">
				<b className="self-start opacity-80 flex-1">{comment.user}</b>
				<Rating className="rating-xs" />
			</div>
			<div className="flex flex-row gap-2">
				<p className="self-start">{comment.text}</p>
			</div>
		</div>
	);
}
