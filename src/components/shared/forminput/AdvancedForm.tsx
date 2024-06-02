import AdvancedFormController from './AdvancedFormController';
import FormInputs from './FormInputs';
import uid from '@azrico/uid';

type FormInputProps = { include?: string[]; exclude?: string[]; children: any };

/**
 * this component add `<input>`s from all other forms based on current search parameter
 * so when we submit a form data of other forms is not lost
 * @param props
 * @returns
 */
export default function AdvancedForm(
	props: React.DetailedHTMLProps<
		React.FormHTMLAttributes<HTMLFormElement>,
		HTMLFormElement
	> &
		FormInputProps
) {
	const formid = 'advancedform-' + uid.localuid();
	const { include, exclude, children, ...restprops } = props;
	return (
		<form {...restprops} id={formid}>
			<AdvancedFormController formid={formid} />
			{/* enable submit by enter */}
			<input type="submit" hidden />

			{/* hidden inputs so we dont forget some searches when submiting form again */}
			<FormInputs exclude={exclude} include={include}></FormInputs>
			{children}
		</form>
	);
}
