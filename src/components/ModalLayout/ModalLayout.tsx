import clsx from 'clsx';
import React from 'react';

export const ModalLayout = (props: any) => {
	const { dialog } = props;
	return (
		<>
			{/* Open the modal using document.getElementById('ID').showModal() method */}
			<dialog id={dialog} className={clsx('modal', props.dialogClassName)}>
				<div className={clsx('modal-box rounded-t-3xl lg:rounded-3xl', props.className)}>
					{props.children}
				</div>
				<form method="dialog" className="modal-backdrop !cursor-default">
					<button className="!cursor-default">
						<i className="bi bi-x-lg"></i>
					</button>
				</form>
			</dialog>
		</>
	);
};
