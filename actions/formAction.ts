"use server"
import { DBManager } from "@azrico/nodeserver";

export interface CustomFormData {
    fullname: string;
    email: string;
    desc: string;
}

export const submitRequest = async (formData: CustomFormData) => {
    const { fullname, email, desc } = formData;

    // Example: Create a new FormData object
    const formDataToSend = new FormData();
    
    // Example: Append fields to the FormData object
    formDataToSend.append('fullname', fullname);
    formDataToSend.append('email', email);
    formDataToSend.append('desc', desc);

    /* ------------------------------ insert to db ------------------------------ */
    await DBManager.tryToConnect();
    const result = await DBManager.handle_update(
        'user_requests',
        undefined,
        {
            fullname,
            email,
            desc,
        },
        { noindex: true }
    );

    console.log(fullname, email, desc, result);
}
