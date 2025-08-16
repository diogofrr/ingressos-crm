import { InfoIcon } from "@/assets/img/info-icon";
import { UserIcon } from "@/assets/img/user-icon";
import { LoginForm } from "./components/login-form";

export default function Login() {
  return (
    <section className="bg-base-200 h-dvh min-h-[750px] xs:min-h-[800px] flex items-center justify-center xs:p-4">
      <div className="bg-base-100 xs:rounded-3xl xs:shadow-xl h-dvh min-h-[750px] xs:h-[750px] w-full max-w-[420px] flex flex-col items-center justify-center p-6">
        <header className="text-base-content flex flex-col items-center justify-center mb-8">
          <UserIcon className="size-24 sm:size-28" />
          <h1 className="text-2xl sm:text-3xl font-medium text-center mt-4">
            Realize seu login
          </h1>
        </header>
        <LoginForm />
        <footer className="text-center mt-8 sm:mt-12">
          <div className="alert alert-info bg-info/10 border-info/20 text-white">
            <InfoIcon className="size-5" />
            <span className="text-sm sm:text-base">
              Os acessos serão gerados manualmente por um administrador.
            </span>
          </div>
        </footer>
      </div>
    </section>
  );
}
