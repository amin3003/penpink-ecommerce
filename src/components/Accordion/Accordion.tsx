import clsx from 'clsx';
import React from 'react'

export const Accordion = (props :any) => {
  return (
    <>
      {props.data.map((item: any, index: any) => {
        return (
          <div
            className={clsx(
              `collapse collapse-arrow rounded-none ${
                index !== 0 ? 'divide-y-2' : ''
              }`
            )}
            key={index}
            dir="rtl"
          >
            <input type="radio" name="my-accordion-2" />
            <div
              className={clsx(
                'collapse-title text-md font-medium',
                props.className
              )}
            >
              {item.title}
            </div>
            <div className="collapse-content" key={index}>
              {item.content.map((item: any, index: any) => {
                return (
                  <div className="form-control" key={index}>
                    <label className="label cursor-pointer">
                      <span className="label-text">{item.desc}</span>
                      <input
                        type="radio"
                        name={item.desc}
                        className="radio checked:bg-red-500"
                      />
                    </label>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </>
  );
}
