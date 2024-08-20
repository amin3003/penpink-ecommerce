'use client';
import { ModalLayout } from '../ModalLayout/ModalLayout';
import { AddressesForm } from '../TextField/AddressesForm';

export const AddBtn = (props: any) => {
  return (
    <>
      <button
        className=" "
        onClick={() =>
          (document.getElementById('my__AddressesForm') as any).showModal()
        }
      >
        <div className="text-[10px] md:text-[12px] text-primary m-0 flex flex-row gap-1">
          {props.name}
          <i className="bi bi-plus-lg text-primary" />
        </div>
      </button>
      <ModalLayout
        dialogClassName={'modal-bottom lg:modal-middle'}
        // modal-bottom
        // lg:modal-middle
        dialog={'my__AddressesForm'}
      >
        <div className="flex flex-row justify-between items-center mb-3">
          <b> {props.label}</b>
        </div>
        <hr />
        {props.content}
      </ModalLayout>
    </>
  );
};
