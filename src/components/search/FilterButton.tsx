import clsx from 'clsx';
import React from 'react'

export const FilterButton = (props: { className: any }) => {
  return (
    <div className={clsx('w-full p-3', props.className)}>
      <button className="btn w-full btn-secondary">اعمال فیلتر</button>
    </div>
  );
};
