'client side'
import React from 'react'

export const ModelLayout = (props:any) => {
    const { dialog } = props;
  return (
		<>
			{/* Open the modal using document.getElementById('ID').showModal() method */}
			<dialog id={dialog} className="modal modal-bottom sm:modal-middle">
				<div className="modal-box">{props.children}</div>
				<form method="dialog" className="modal-backdrop !cursor-default">
					<button className="!cursor-default">close</button>
				</form>
			</dialog>
		</>
	);
}
