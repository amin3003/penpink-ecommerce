'use client';
import { ModalLayout } from '../ModalLayout/ModalLayout';
import LoginDialogContent from './LoginDialogContent';
import { AzNextHelper } from '@azrico/fetch';

export default function LoginButton() {
	return (
		<>
			<button
				className="btn btn-ghost btn-sm"
				onClick={() => (document.getElementById('my_modal') as any).showModal()}
			>
				<div className="flex flex-row gap-2">
					<i className="bi bi-person-circle text-lg" />
				</div>
			</button>
			<ModalLayout className={'!w-full '} dialog={'my_modal'}>
				<LoginDialogContent />
			</ModalLayout>
		</>
	);
}
