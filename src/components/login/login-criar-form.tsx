'use client';

import login from '@/actions/login'
import { useFormState, useFormStatus } from 'react-dom';
import Button from '@/components/forms/button';
import Input from '@/components/forms/input';
import ErrorMessage from '../helper/error-message';
import React from 'react';
import Link from 'next/link';
import styles from './login-form.module.css'
import userPost from '@/actions/user-post';

function FormButton() {

  const {pending} = useFormStatus();

  return (
    <>
    {pending ? <Button disabled={pending}>Cadastrando. . .</Button> : <Button disabled={pending}>Cadastrar</Button>}
    </>
  ) 
}

export default function LoginCriarForm() {

  const [state, action] = useFormState(userPost, {
    ok: false,
    error: '',
    data: null
  });

  React.useEffect(() => {
    if(state.ok) {
      window.location.href = '/conta';
    }
  }, [state.ok])

  return (
    <>
      <form action={action} className={styles.form}>
        <Input label='Usuário' name="username" type="text"/>
        <Input label='Senha' name="password" type="password"/>
        <Input label='Email' name="email" type="email"/>
        <ErrorMessage error={state.error}/>
        <FormButton/>     
      </form>
    </>
  );
}