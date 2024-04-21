'use client';
import { ModelLayout } from '../ModelLayout/ModelLayout';
import LoginDialogContent from './LoginDialogContent';

export default function LoginButton(props: any) {
  return (
    <>
      <button
        className="btn-sm"
        onClick={() => (document.getElementById('my_modal') as any).showModal()}
      >
        <div className="flex flex-row gap-2">
          <i className="bi bi-person-circle text-lg"/>
        </div>
      </button>
      <ModelLayout dialog={"my_modal"}>
        <LoginDialogContent />
      </ModelLayout>
    </>
  );
}
