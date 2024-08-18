import clsx from 'clsx';
import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
  className:any;
}

export const Container: React.FC<ContainerProps> = ({ children, className }) => {
  return (
    <div
      className={clsx('w-full bg-[#fff] p-10 rounded-2xl shadow-xl', className)}
    >
      {children}
    </div>
  );
};
