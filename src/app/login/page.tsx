import LoginForm from "@/components/login/login-form";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: 'Login | Dogs',
  description: 'Faça login na sua conta Dogs',
}

export default async function LoginPage() {
  return (
    <section>
      <h1 className="title">Login</h1>
      <LoginForm/>
    </section>
  );
}