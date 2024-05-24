'use client';
import React from 'react';

export default function AdvancedFormController(props: { formid: string }) {
	const myForm = React.useRef<HTMLElement>();
	const submitFunction = React.useCallback(() => {
		if (!myForm.current) return;
		var allInputs = myForm.current.getElementsByTagName('input');
		for (var i = 0; i < allInputs.length; i++) {
			var input = allInputs[i];
			if (input.name && !input.value) {
				input.name = '';
			}
		}
	}, []);
	React.useEffect(() => {
		if (myForm.current) {
			myForm.current.removeEventListener('submit', submitFunction);
		}
		myForm.current = document.getElementById(props.formid) || undefined;
		if (!myForm.current) return;
		myForm.current.addEventListener('submit', submitFunction);
	}, [props.formid, submitFunction]);
	return <></>;
}
