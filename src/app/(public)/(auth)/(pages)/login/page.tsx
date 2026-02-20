import { Metadata } from "next";
import { SignInForm } from "../../_components/sign-in-form";
import { OAuthButtons } from "../../_components/o-auth-buttons";



export const metadata: Metadata = {
  title: "Entrar | App Name",
  description: "Faça login na sua conta",
};

export default function LoginPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Bem-vindo de volta</h2>
        <p className="text-muted-foreground text-sm mt-2">
          Faça login para continuar
        </p>
      </div>

      <SignInForm />

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-muted" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            ou continue com
          </span>
        </div>
      </div>

      <OAuthButtons />
    </div>
  );
}
