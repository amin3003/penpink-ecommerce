import React from 'react';
import { Container } from './Container'; 
import {AddBtn} from './AddBtn';
import { AddressesForm } from '../TextField/AddressesForm';

// Define the type for the address object
type Address = {
  id: number;
  address: string;
  recipient: string;
  phone: string;
  postalCode: string;
};

// Sample data - this could come from props, context, or an API call
const addresses: Address[] = [
  {
    id: 1,
    address: 'تهران، خیابان ولیعصر، کوچه یاس، پلاک 12',
    recipient: 'علی رضایی',
    phone: '09121234567',
    postalCode: '1234567890',
  },
  {
    id: 2,
    address: 'شیراز، خیابان زند، پلاک 45',
    recipient: 'زهرا احمدی',
    phone: '09131234567',
    postalCode: '9876543210',
  },
];

// Define the type for the fields
type AddressField = {
  icon: string;
  label: string;
  key: keyof Address;
};

// Array of icon and label data
const addressFields: AddressField[] = [
  {
    icon: 'bi-geo-alt-fill',
    label: 'آدرس:',
    key: 'address',
  },
  {
    icon: 'bi-person-fill',
    label: 'تحویل گیرنده:',
    key: 'recipient',
  },
  {
    icon: 'bi-telephone-fill',
    label: 'شماره تلفن:',
    key: 'phone',
  },
  {
    icon: 'bi-mailbox2',
    label: 'کد پستی:',
    key: 'postalCode',
  },
];

export const Addresses = () => {
  return (
    <Container className={'!p-3'}>
      <div className="flex justify-between items-center text-sm p-4">
        <b className="text-[13px] md:text-sm">آدرس های من</b>
        <span className="flex flex-row justify-center items-center gap-1 mt-1 md:mt-0">
          <AddBtn
            name={'ثبت آدرس جدید'}
            label={'افزودن آدرس جدید'}
            content={<AddressesForm addressObject={{}} />}
          />
        </span>
      </div>
      <hr />

      <div className="flex flex-col gap-4 mt-5 bg-[#fff]">
        {addresses.map((address, index) => (
          <div key={address.id}>
            <div className="flex flex-col gap-4">
              {addressFields.map((field) => (
                <div
                  key={field.key}
                  className="flex  text-[11px] md:text-xs text-justify text-gray-700"
                >
                  <i className={`bi ${field.icon} mx-2`} /> {/* Dynamic icon */}
                  <b className="opacity-90">{field.label}</b>
                  <span className="mr-2 ">{address[field.key]}</span>
                </div>
              ))}
            </div>
            <span className="flex flex-row justify-end items-end gap-4">
              <button type="button" className="shadow-md p-2 rounded-lg">
                <i className="bi bi-trash3 text-sm" />
              </button>
              <button type="button" className="shadow-md p-2 rounded-lg">
                <i className="bi bi-pencil text-sm" />
              </button>
            </span>
            {/* Conditionally render <hr /> if not the last address */}
            {index < addresses.length - 1 && <hr className="my-4" />}
          </div>
        ))}
      </div>
    </Container>
  );
};
