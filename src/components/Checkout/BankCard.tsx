'use client';
import React from 'react';
import Image from 'next/image';
const copyToClipboard = (text: any) => {
	// Remove spaces from the text
	const textWithoutSpaces = text.replace(/\s+/g, '');
	// Copy to clipboard
	navigator.clipboard
		.writeText(textWithoutSpaces)
		.then(() => {
			alert('Copied to clipboard!');
		})
		.catch((err) => {
			console.error('Failed to copy: ', err);
		});
};
export const BankCard = () => {
	return (
		<div className="mx-auto w-[80px] h-[20px] mt-3 overflow-hidden bg-white  rounded-lg shadow-lg">
			<div className="px-6 py-4">
				<div className="flex items-center justify-end w-full">
					<Image
						className="h-10 w-10"
						src="/images/Mellat.png"
						alt="Picture of the author"
						width={500}
						height={500}
						quality={100}
					/>
				</div>
				<div className="mt-4">
					<div
						className="font-bold text-gray-800 md:text-lg text-md cursor-pointer text-center"
						onClick={() => copyToClipboard('3564 8546 9945 1234')}
					>
						3564 8546 9945 1234
					</div>
					<div className="flex justify-between items-center p-1">
						<div className="text-sm text-gray-600">مهدی کلهری</div>
					</div>
				</div>
			</div>
			<div className="bg-gray-100 p-2">
				<span className="flex  flex-row  justify-between items-center">
					<div className="font-medium md:text-md text-xs text-gray-600 self-start gap-4">
						بانک ملی
					</div>
					<p
						className="md:text-xs text-[12px] cursor-pointer"
						onClick={() => copyToClipboard('IR 1234 5678 9876 5432 1234 5678')}
					>
						IR 1234 5678 9876 5432 1234 5678
					</p>
				</span>
			</div>
		</div>
	);
};
