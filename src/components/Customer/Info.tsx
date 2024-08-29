import React from 'react';
import { Container } from './Container';
import { AddBtn } from './AddBtn';
import { InfoForm } from '../TextField/InfoForm';
import Link from 'next/link';

// Define the type for the user information
type User = {
  id: number;
  name: string;
  lastName: string;
  nationalCode: string;
  city: string;
  province: string;
  sex: string;
  birthDate: string;
  email: string;
  phoneNumber: string;
};

// Define the type for the fields
type UserField = {
  icon: string;
  label: string;
  key: keyof User;
};

// Define the props for the Info component
interface InfoProps {
  previous: boolean;
}

export const CustomerInfo: React.FC<InfoProps> = ({ previous }) => {
	// Sample user data defined within the component
	const user: User = {
		id: 1,
		name: 'علی',
		lastName: 'رضایی',
		nationalCode: '1234567890',
		city: 'تهران',
		province: 'تهران',
		sex: 'مرد',
		birthDate: '1375/01/15',
		email: 'ali.rezaei@example.com',
		phoneNumber: '09121234567',
	};

	// Array of icon and label data
	const userFields: UserField[] = [
		{ icon: 'bi-person-fill', label: 'نام:', key: 'name' },
		{ icon: 'bi-person-fill', label: 'نام خانوادگی:', key: 'lastName' },
		{
			icon: 'bi-credit-card-2-front-fill',
			label: 'شماره ملی:',
			key: 'nationalCode',
		},
		{ icon: 'bi-geo-alt-fill', label: 'شهر:', key: 'city' },
		{ icon: 'bi-map-fill', label: 'استان:', key: 'province' },
		{ icon: 'bi-gender-male', label: 'جنسیت:', key: 'sex' },
		{ icon: 'bi-calendar-date-fill', label: 'تاریخ تولد:', key: 'birthDate' },
		{ icon: 'bi-envelope-fill', label: 'ایمیل:', key: 'email' },
		{ icon: 'bi-telephone-fill', label: 'شماره تلفن:', key: 'phoneNumber' },
	];

	// Determine which fields to display based on the previous prop
	const displayedFields = previous ? userFields.slice(0, 4) : userFields;

	return (
		<Container className={'!p-1'}>
			<div className="flex justify-between items-center text-sm p-4">
				<b className="text-sm">اطلاعات حساب کاربری</b>
				<span className="flex flex-row justify-center items-center gap-1 mt-1 md:mt-0">
					{previous ? (
						<Link
							href="info"
							className="text-[10px] md:text-[12px] text-primary m-0 flex flex-row gap-1"
						>
							ویرایش اطلاعات
						</Link>
					) : (
						<AddBtn
							name={'ویرایش اطلاعات'}
							label={'افزودن اطلاعات جدید'}
							content={<InfoForm infoObject={{}} />}
						/>
					)}
				</span>
			</div>
			<hr />
			<div className="flex flex-col gap-4 mt-5 bg-[#fff]">
				<div
					className={`${
						previous
							? ' w-full flex flex-col sm:flex-row md:flex-wrap md:justify-around  '
							: 'grid grid-cols-1 md:grid-cols-2 gap-5'
					} p-4`}
				>
					{displayedFields.map((field) => (
						<div
							key={field.key}
							className={`flex flex-row justify-between items-center text-[11px] gap-10 md:text-[13px] w-fit text-#8a929c`}
						>
							<span className="flex gap-2 justify-between w-fit">
								<p className="opacity-90">{field.label}</p>
								{user[field.key] ? (
									<b className="text-[12px] md:text-[14px]">{user[field.key]}</b>
								) : (
									<b className="text-[12px] md:text-[14px]"></b>
								)}
							</span>
						</div>
					))}
				</div>
			</div>
		</Container>
	);
};
