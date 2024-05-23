import FormInputsClient from './FormInputsClient';
import FormInputsServer from './FormInputsServer';

type FormInputProps = { include?: string[]; exclude?: string[] };

/**
 * this component add `<input>`s from all other forms based on current search parameter
 * so when we submit a form data of other forms is not lost
 * @param props
 * @returns
 */
export default function FormInputs(props: FormInputProps) {
	if (typeof window === 'undefined') return <FormInputsServer {...props} />;
	return <FormInputsClient {...props} />;
}
