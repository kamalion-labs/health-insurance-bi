import { LoginForm } from "./LoginForm";

export default async function LoginPage() {
  return (
    <div className="flex w-full items-center justify-center bg-login">
      <LoginForm />
    </div>
  );
}
