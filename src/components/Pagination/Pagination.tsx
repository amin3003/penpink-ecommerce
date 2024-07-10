import { getServerSearchParams } from '@/navigation';
import { array_first, array_last, array_remove_duplicates } from '@azrico/object';
import { useSearchParams } from 'next/navigation';
import React from 'react';
 
import FormInputs from '../shared/forminput/FormInputs';
import clsx from 'clsx';
import AdvancedForm from '../shared/forminput/AdvancedForm';

export const Pagination = () => {
	//TODO Fix pagination
	const sp = getServerSearchParams();

	const cpage = Math.max(1, Number(sp.get('page')));
	let pgBtnsToDisplay = [cpage - 1, cpage, cpage + 1];
	//make sure we show pages >= 1
	const minPage = Math.min(...pgBtnsToDisplay);
	if (minPage <= 0) pgBtnsToDisplay = pgBtnsToDisplay.map((r) => r + 1 - minPage);

	pgBtnsToDisplay = array_remove_duplicates(pgBtnsToDisplay);

	return (
		<>
			<AdvancedForm
				method="GET"
				className="hidden lg:flex join mt-5 mx-auto"
				action={'products'}
				exclude={['page', '__page']}
			>
				<button
					disabled={Number(cpage - 1) <= 0}
					className="join-item btn "
					type="submit"
					name="page"
					value={cpage - 1}
				>
					<i className="bi bi-chevron-right"></i>
					صفحه قبل
				</button>

				{Number(cpage - 1) > 1 && (
					<>
						<button className="join-item btn" type="submit" name="page" value={1}>
							1
						</button>
						<button className="join-item btn btn-disabled">...</button>
					</>
				)}
				{pgBtnsToDisplay.map((r, i) => {
					return (
						<button
							key={i}
							type="submit"
							name="page"
							value={r}
							className={clsx('join-item btn', r === cpage && 'btn-primary')}
						>
							{r}
						</button>
					);
				})}
				{Number(array_last(pgBtnsToDisplay)) < 99 ? (
					<>
						<button className="join-item btn btn-disabled">...</button>
						<button className="join-item btn" type="submit" name="page" value={99}>
							99
						</button>
					</>
				) : (
					<></>
				)}
				<button
					disabled={Number(cpage + 1) >= 99}
					className="join-item btn"
					type="submit"
					name="page"
					value={cpage + 1}
				>
					صفحه بعد
					<i className="bi bi-chevron-left"></i>
				</button>
			</AdvancedForm>
		</>
	);
};
