'use server';
import { PASSWORD_LOST, PASSWORD_RESET, TOKEN_POST, USER_POST } from "@/functions/api";
import apiError from "@/functions/api-error";
import { redirect } from "next/navigation";

export default async function passwordReset(state: {}, formData: FormData) {

  const login = formData.get('login') as string | null;
  const key = formData.get('key') as string | null;
  const password = formData.get('password') as string | null;

  try {
    if(!login || !key || !password) throw new Error('Preencha os dados');
    const {url} = PASSWORD_RESET();
    const response = await fetch(url, {  
      method: 'POST',
      body: formData,
    })
    if(!response.ok) throw new Error('Não autorizado.');
    const data = await response.json();
  } catch(error: unknown) {
    return apiError(error);
  }
  redirect('/login');
}