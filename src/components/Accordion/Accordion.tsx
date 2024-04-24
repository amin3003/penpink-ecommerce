import React from 'react'

export const Accordion = (props :any) => {
      const lastItem = (data: any) => data[data.length - 1];
  return (
    <>
      {props.data.map((item: any, index: any) => {
        return (
          <div className="collapse collapse-arrow rounded-none" key={index} dir="rtl">
            <input type="radio" name="my-accordion-2" />
            <div className="collapse-title text-md font-medium">
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
            {index !== lastItem(props.data) - 1 && (
              <div className="divider m-0 mx-auto h-1 w-[90%]" />
            )}
          </div>
        );
      })}
    </>
  );
}
