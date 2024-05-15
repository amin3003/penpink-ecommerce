'use client'
import React from 'react'
import { IoMdAdd } from 'react-icons/io';
import { GoDash } from 'react-icons/go';

export const CountUpp = () => {
  return (
    <>
      <div className="rounded-xl bg-base-100 border-solid flex items-center px-2 py-1 gap-2">
        <button className="size-5">
          <IoMdAdd />
        </button>
        <div>
          <p>2</p>
        </div>
        <button className="size-5">
          <GoDash />
        </button>
      </div>
    </>
  );
};
