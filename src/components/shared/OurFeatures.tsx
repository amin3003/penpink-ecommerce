import React from 'react';
import { Product, ProductVariation } from '@codespase/core';
import Image from 'next/image';
import { array_first, wrap_array } from '@azrico/object';

export default function OurFeatures() {
	const features = ['7/24 Support', 'Good Quality', 'Secure Payment', 'Famous Brands'];
	return (
		<div className="w-full flex flex-row gap-4 text-sm">
			{features.map((r, i) => {
				return (
					<div key={i} className="bg-base-100 border-2 rounded-lg p-2 shadow-md">
						{r}
					</div>
				);
			})}
		</div>
	);
}
