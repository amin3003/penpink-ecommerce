'use client';
import LoginDialogContent from './LoginDialogContent';

export default function LoginButton(props: any) {
  return (
    <>
      <button
        className="btn-sm"
        onClick={() =>
          (document.getElementById('login_modal') as any).showModal()
        }
      >
        <div className="flex flex-row gap-2">
          <i className="bi bi-person-circle text-lg"></i>
          {/* <p className="md:block hidden">Login</p> */}
        </div>
      </button>
      <dialog id="login_modal" className="modal">
        <div className="modal-box">
          <LoginDialogContent />
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}
