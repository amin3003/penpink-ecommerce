'use client';
import React from 'react';
import { useFormStatus } from 'react-dom';

interface ButtonProps {
	disabled?: boolean; // Define the type of disabled prop explicitly
	children?: any;
}

function SubmitButton(props: ButtonProps) {
	const { pending } = useFormStatus();
	const disableBtn = pending || props.disabled;
	return (
		<button
			type="submit"
			className="btn btn-primary btn-sm md:btn-md"
			aria-disabled={disableBtn}
			disabled={disableBtn}
		>
			{pending && <span className="loading loading-dots loading-lg text-white"></span>}
			{props.children}
		</button>
	);
}

export default SubmitButton;
