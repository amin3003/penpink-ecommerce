'use client';
import Image from 'next/image';
import { ModalLayout } from '../ModalLayout/ModalLayout';
import LoginDialogContent from './LoginDialogContent';
import { AzNextHelper } from '@azrico/fetch';

export default function LoginButton() {
	return (
    <>
      <button
        className="btn btn-ghost btn-sm btn-circle"
        onClick={() => (document.getElementById('my_modal') as any).showModal()}
      >
        <div className="flex flex-row gap-2">
          <Image
            src={'/images/profile-avatar-2.svg'}
            alt="profile"
            width={73}
            height={73}
          />
        </div>
      </button>
      <ModalLayout
        dialogClassName={'modal-bottom lg:modal-middle '}
        dialog={'my_modal'}
      >
        <LoginDialogContent />
      </ModalLayout>
    </>
  );
}
