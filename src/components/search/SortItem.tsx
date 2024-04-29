import React from 'react';

export const SortItem = (props: any) => {
  return (
    <div className=''>
      {props.data.map((item: any, index: any) => {
        return (
          <div className="form-control my-2" key={index}>
            <label className="label cursor-pointer">
              <span className="label-text">{item.name}</span>
              <input
                type="radio"
                name="radio-10"
                className="radio checked:bg-blue-500"
                checked
              />
            </label>
          </div>
        );
      })}
    </div>
  );
};
