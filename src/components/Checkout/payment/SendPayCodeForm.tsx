'use client';
import SubmitButton from '@/components/SubmitButton/SubmitButton';
import { useFormState } from 'react-dom';
import { submitPaymentAction } from '../checkoutActions';
import { object_isEmpty } from '@azrico/object';

/**
 *
 * @param props
 * @returns
 */
export function SendPayCodeForm(props: { orderid: string }) {
	const [formState, formAction] = useFormState(async (p: any, fd: FormData) => {
		const res = await submitPaymentAction(props.orderid, String(fd.get('code')));
		return res as any;
	}, {});
	return (
		<form
			action={formAction}
			id="payment-confirm-form"
			className="flex flex-col  max-w-min w-min gap-2 self-center "
		>
			<div className="flex flex-1">
				{object_isEmpty(formState) || typeof formState !== 'object' ? (
					<span className="label-text">شماره پیگیری خود را وارد کنید</span>
				) : formState.payment_code ? (
					<>
						<span className="label-text text-success flex-1">شماره پیگیری ثبت شد!</span>
						<span className="label-text text-success">{formState.payment_code}</span>
					</>
				) : (
					<>
						<span className="label-text text-error  flex-1">خطا</span>
						<span className="label-text text-error">{String(formState.error)}</span>
					</>
				)}
			</div>
			<div className="flex gap-2">
				<input
					name="code"
					type="text"
					placeholder="---"
					className="input input-sm md:input-md input-bordered input-primary min-w-10"
				/>
				<SubmitButton>ارسال</SubmitButton>
			</div>
		</form>
	);
}
