import Image from 'next/image';
import Link from '@/navigation';
import LoginModalForm from './LoginModalForm';
export default function LoginDialogContent(props: any) {
  return (
    <div className="" dir="rtl">
      {/* <h3 className="font-bold text-xl md:text-3xl text-center m-0 mb-5">ورود</h3>
      <p className='mb-8'>
        سلام!
        <br />
        لطفا اطلاعات خواسته شده را وارد کنید
      </p> */}
      <LoginModalForm/>
    </div>
  );
}
