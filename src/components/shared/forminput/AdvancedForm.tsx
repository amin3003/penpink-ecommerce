import AdvancedFormController from './AdvancedFormController';
import FormInputs from './FormInputs';
import uid from '@azrico/uid';
import { useDynamicFormEnabledProps } from '../../../hooks/useDynamicFormEnabled';
import { FormInputProps } from './FormInputRenderKeys';

export type AdvancedFormProps = FormInputProps & {
	children: any;
};

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
		AdvancedFormProps &
		useDynamicFormEnabledProps
) {
	const formid = String(props.id ?? 'advancedform-' + uid.localuid()).trim();
	const { has, children, above, breakpoint, ...restprops } = props;
	return (
		<form {...restprops} id={formid}>
			<AdvancedFormController
				{...props}
				above={above}
				breakpoint={breakpoint}
				formid={formid}
			/>
			{/* enable submit by enter */}
			<input type="submit" hidden />

			{/* hidden inputs so we dont forget some searches when submiting form again */}
			<FormInputs has={has} />
			{children}
		</form>
	);
}
