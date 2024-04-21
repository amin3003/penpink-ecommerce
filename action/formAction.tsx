'use server';
import { DBManager } from '@azrico/nodeserver';

export type CustomFormData = Partial<{
  fullname: string;
  email: string;
  password: any;
}>;

export const submitRequest = async (formData: CustomFormData) => {
  const { fullname, email, password } = formData;
  /* ------------------------------ insert to db ------------------------------ */
  await DBManager.tryToConnect();
  const result = await DBManager.insert(
    'user_requests',
    {
      fullname,
      email,
      password,
    },
    { noindex: true }
  );
};
