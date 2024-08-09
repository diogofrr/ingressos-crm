import Link from "next/link";
import { LoginForm } from "./components/login-form";
import { UserIcon } from '@/assets/img/user-icon'

export default function Login() {
  return (
    <section className="bg-slate-50 h-dvh min-h-[650px] xs:min-h-[700px] flex items-center justify-center">
      <div className="bg-white rounded-3xl shadow-xl h-dvh min-h-[650px] xs:h-[650px] w-dvw xs:w-[420px] flex flex-col items-center justify-center">
        <header className="text-black flex flex-col items-center justify-center">
          <UserIcon className="size-28" />
          <h1 className="text-3xl font-medium">
            Realize seu login  
          </h1>
        </header>
        <LoginForm />
        <footer className="text-center mt-12">
          Não possui uma conta? 
          <br />
          <Link
            href="https://wa.me/5531971890386?text=Pede%20pro%20Diogo%20cadastrar%20meu%20acesso."
            className="text-blue-500 hover:underline text-base"
            target="_blank"
          >
            Solicite seu acesso
          </Link>
        </footer>
      </div>
    </section>
  )
}