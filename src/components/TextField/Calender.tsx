'use client';
import React, { useState, useEffect } from 'react';
import { DayValue, utils } from 'norama-react-modern-calendar-datepicker';
import DatePicker from 'norama-react-modern-calendar-datepicker';
import 'norama-react-modern-calendar-datepicker/lib/DatePicker.css'; // Import the required styles
import clsx from 'clsx';
import Link from 'next/link';
import { Modify } from '@azrico/types';
import TextFieldErrorController from './TextFieldErrorController';

// Ensure Bootstrap Icons are imported
import 'bootstrap-icons/font/bootstrap-icons.css';

interface CalenderProps {
  wrapperClassName?: string;
  label?: string;
  placeholder?: string;
  error?: string;
  errors?: { [key: string]: string };
  labelUrl?: URL;
  inputClass?: string;
  name?: string;
}

const Calender: React.FC<CalenderProps> = ({
  wrapperClassName = 'relative w-full',
  placeholder = 'تاریخ تولد',
  label,
  inputClass,
  errors,
  error,
  labelUrl,
  name,
  ...restprops
}) => {
  const [selectedDate, setSelectedDate] = useState<DayValue | null>(null);

  useEffect(() => {
    const today = utils('fa').getToday(); // Get today's date in Persian calendar
    setSelectedDate(today); // Set it as the default selected date
  }, []);

  const onChange = (newValue: DayValue) => {
    setSelectedDate(newValue);
    console.log(newValue); // Optionally log the new date
  };

  // Handle error
  if (typeof errors === 'object' && errors && !error) {
    error = errors[name || ''];
  }

  const hasError = Boolean(error);

  return (
    <div className={wrapperClassName} data-inputname={name}>
      {hasError && <TextFieldErrorController name={String(name)} />}

      <div className="relative">
        <i className="bi bi-calendar-check absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 !z-[1000]"/>
        {/* Bootstrap Icon */}
        <DatePicker
          value={selectedDate} // Use the state value
          onChange={onChange} // Update the state on date change
          inputPlaceholder={placeholder}
          locale="fa" // Ensure locale is correct
          wrapperClassName='w-full bg-red'
          calendarPopperPosition="bottom"
          inputClassName={clsx(
            'peer input input-sm h-[45px] input-bordered',
            'block rounded-t-lg w-full appearance-none', // Add padding to the left for the icon
            'focus:outline-none focus:ring-0',
            'aria-[errormessage]:border-error',
            inputClass
          )}
        />
      </div>

      {label && (
        <label
          className={clsx(
            'absolute top-2 left-3 text-xs text-gray-500 duration-300 transform -translate-y-4 scale-75 origin-top-left',
            'peer-placeholder-shown:translate-y-1 peer-placeholder-shown:scale-100 peer-placeholder-shown:text-gray-500',
            'peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-indigo-600',
            'z-10' // Ensure the label is above the input
          )}
        >
          {label}
        </label>
      )}

      <label
        tabIndex={-1}
        className={clsx(
          'px-1 text-xs text-error peer-aria-[errormessage]:flex hidden'
        )}
      >
        {error}
      </label>

      {labelUrl && (
        <div className="label" tabIndex={-1}>
          <Link href={`#${labelUrl}`} tabIndex={-1}>
            <span className="label-text-alt" tabIndex={-1}>
              {label}
            </span>
          </Link>
        </div>
      )}

      <label
        tabIndex={-1}
        className={clsx(
          'bg-base-100 px-1',
          'top-0 -translate-y-1/2',
          'select-none pointer-events-none',
          'absolute text-xs duration-300 transform z-[10000] origin-[0] start-2.5',
          'peer-focus:text-primary peer-aria-[errormessage]:text-error'
        )}
      >
        {placeholder}
      </label>
    </div>
  );
};

export default Calender;
