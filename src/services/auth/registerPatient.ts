/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import z from "zod";
import { loginUser } from "./loginUser";

const registerValidationZodSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    email: z.email({ message: "Valid email is required" }),
    password: z.string().min(6, {
        error: "Password is required and must be at least 6 characters long",
    }).max(100, {
        error: "Password must be at most 100 characters long",
    }),
    confirmPassword: z.string().min(6, {
        error: "Confirm Password is required and must be at least 6 characters long",
    }),
    role: z.enum(["USER", "HOST"]).default("USER"),
}).refine((data: any) => data.password === data.confirmPassword, {
    error: "Passwords do not match",
    path: ["confirmPassword"],
});


export const registerPatient = async (_currentState: any, formData: any): Promise<any> => {
    try {
        const becomeHost = formData.get("becomeHost"); // "HOST" or null

const role = becomeHost ? "HOST" : "USER";
        const validationData = {
            name: formData.get('name'),
            email: formData.get('email'),
            password: formData.get('password'),
            confirmPassword: formData.get('confirmPassword'),
            role: role
        }

        const validatedFields = registerValidationZodSchema.safeParse(validationData);

        // console.log(validatedFields, "val");

        if (!validatedFields.success) {
            return {
                success: false,
                errors: validatedFields.error.issues.map(issue => {
                    return {
                        field: issue.path[0],
                        message: issue.message,
                    }
                }
                )
            }
        }

        const registerData = {
                name: formData.get('name'),
                email: formData.get('email'),
                 password: formData.get('password'),
                 role: role
        }

        // const newFormData = new FormData();

        // newFormData.append("data", JSON.stringify(registerData));

        const res = await fetch("http://localhost:5000/api/v1/users/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json", 
            },
            body: JSON.stringify(registerData),
            // body:newFormData
        })

       

    if (!res.ok) {
      // এখানেই HTTP error detect হবে
      const errorData = await res.json();
      throw new Error(errorData.message || "Login Failed. You might have entered incorrect email or password.");
    }
    
 const result = await res.json();

        // console.log(result, "result");

        if (result.success) {
            await loginUser(_currentState, formData);
        }

        return result;



    } catch (error:any) {
        if (error?.digest?.startsWith('NEXT_REDIRECT')) {
            throw error;
        }
        console.log("error",error);
         return { success: false, message: `${process.env.NODE_ENV === 'development' ? error.message : "Login Failed. You might have entered incorrect email or password."}` };
    }
}