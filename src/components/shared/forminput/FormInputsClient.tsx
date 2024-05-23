'use client';
import { getServerSearchParams } from '@/navigation';
import { useSearchParams } from 'next/navigation';
import { FormInputProps, FormInputRenderKeys } from './FormInputRenderKeys';

export function FormInputsClient(props: FormInputProps) {
	const sp = useSearchParams();
	return <FormInputRenderKeys {...props} sp={sp} />;
}
export default FormInputsClient;
