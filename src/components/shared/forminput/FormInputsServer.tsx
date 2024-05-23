import { getServerSearchParams } from '@/navigation';
import { useSearchParams } from 'next/navigation';
import { FormInputProps, FormInputRenderKeys } from './FormInputRenderKeys';

export function FormInputsServer(props: FormInputProps) {
	const sp = getServerSearchParams();
	return <FormInputRenderKeys {...props} sp={sp} />;
}
export default FormInputsServer;
