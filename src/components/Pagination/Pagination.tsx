import { getServerSearchParams } from '@/navigation';
import { array_first, array_last, array_remove_duplicates } from '@azrico/object';
import { useSearchParams } from 'next/navigation';
import React from 'react';
import { GoChevronRight } from 'react-icons/go';
import { GoChevronLeft } from 'react-icons/go';
import FormInputs from '../shared/forminput/FormInputs';
import clsx from 'clsx';

export const Pagination = () => {
	const sp = getServerSearchParams();

	const cpage = Math.max(1, Number(sp.get('__page')));
	let pgBtnsToDisplay = [cpage - 1, cpage, cpage + 1];
	//make sure we show pages >= 1
	const minPage = Math.min(...pgBtnsToDisplay);
	if (minPage <= 0) pgBtnsToDisplay = pgBtnsToDisplay.map((r) => r + 1 - minPage);

	pgBtnsToDisplay = array_remove_duplicates(pgBtnsToDisplay);

	return (
		<>
			<form className="hidden lg:flex join mt-5 mx-auto">
				<FormInputs exclude={['__page']} />

				<button
					disabled={Number(cpage - 1) <= 0}
					className="join-item btn "
					type="submit"
					name="__page"
					value={cpage - 1}
				>
					<GoChevronRight />
					صفحه قبل
				</button>

				{Number(cpage - 1) > 1 && (
					<>
						<button className="join-item btn" type="submit" name="__page" value={1}>
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
							name="__page"
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
						<button className="join-item btn" type="submit" name="__page" value={99}>
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
					name="__page"
					value={cpage + 1}
				>
					صفحه بعد
					<GoChevronLeft />
				</button>
			</form>
		</>
	);
};
