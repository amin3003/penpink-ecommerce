'use client';

import clsx from 'clsx';
import React from 'react';

const final_date = new Date('2024/04/2');

export default function ComingSoon() {
	const [days, setDays] = React.useState(0);
	const [hours, setHours] = React.useState(0);
	const [minutes, setMinutes] = React.useState(0);
	const [seconds, setSeconds] = React.useState(0);

	function updateValues() {
		const now = new Date().getTime();
		const distance = final_date.getTime() - now;

		const daysLeft = Math.floor(distance / (1000 * 60 * 60 * 24));
		const hoursLeft = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
		const minutesLeft = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
		const secondsLeft = Math.floor((distance % (1000 * 60)) / 1000);

		setDays(daysLeft);
		setHours(hoursLeft);
		setMinutes(minutesLeft);
		setSeconds(secondsLeft);
	}
	React.useEffect(() => {
		updateValues();
		const intervalId = setInterval(() => {
			updateValues();
		}, 1000);

		return () => clearInterval(intervalId);
	}, []);
	return (
		<div
			className={clsx(
				'h-lvh overflow-clip p-12 justify-center text-center flex flex-col'
			)}
		>
			<h2 className="flex flex-row self-center">
				pen<p className="text-primary">pink</p>
			</h2>
			<h4>{'Coming soon'}</h4>
			<div className="grid grid-flow-col gap-5  self-center text-center auto-cols-max">
				<div className="flex flex-col">
					<span className="countdown font-mono text-5xl">
						<span style={{ '--value': days } as any}></span>
					</span>
					day
				</div>
				<div className="flex flex-col">
					<span className="countdown font-mono text-5xl">
						<span style={{ '--value': hours } as any}></span>
					</span>
					hour
				</div>
				<div className="flex flex-col">
					<span className="countdown font-mono text-5xl">
						<span style={{ '--value': minutes } as any}></span>
					</span>
					min
				</div>
				<div className="flex flex-col">
					<span className="countdown font-mono text-5xl">
						<span style={{ '--value': seconds } as any}></span>
					</span>
					sec
				</div>
			</div>
		</div>
	);
}
