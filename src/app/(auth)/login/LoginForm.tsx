"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { FaChevronRight } from "react-icons/fa6";
import { z } from "zod";
import { useSearchParams, useRouter } from "next/navigation";

import { Button, Input } from "@/components";
import { handleResponse } from "@/lib/api/handleResponse";

import logo from "../../../assets/interliga.png";

const loginFormSchema = z.object({
  email: z.string().nonempty("Campo obrigatório").default(""),
  senha: z.string().nonempty("Campo obrigatório").default(""),
});

type LoginFormData = z.infer<typeof loginFormSchema>;

export function LoginForm() {
  const { get } = useSearchParams();
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
  });

  async function handleLogin(formData: LoginFormData) {
    try {
      const response = await fetch(
        `/api/auth/login?redirect=${get("redirect")}`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
            senha: formData.senha,
          }),
        }
      );

      const { success, redirect } = await handleResponse<{
        success: boolean;
        token: string;
        redirect: string;
      }>(response);

      if (success) {
        router.push(redirect);
      }
    } catch (e: any) {
      setError("root", { message: e.message });
    }
  }

  return (
    <div className="flex h-full w-full max-w-md flex-col space-y-10 bg-white p-5 md:h-fit md:w-full md:rounded-md">
      <div className="flex w-full justify-center">
        <Image alt="Interliga" src={logo} className="w-full md:w-[200px]" />
      </div>

      <form
        onSubmit={handleSubmit(handleLogin)}
        className="flex flex-col space-y-5"
      >
        <Input.Root>
          <Input.Label htmlFor="email" text="E-mail:" />
          <Input.Control control={control} name="email" />
        </Input.Root>

        <Input.Root>
          <Input.Label htmlFor="senha" text="Senha:" />
          <Input.Control control={control} name="senha" type="password" />
        </Input.Root>

        <div className="text-red-400">{errors.root?.message}</div>

        <Button.Root submit>
          <Button.Content>Entrar</Button.Content>
          <Button.Icon>
            <FaChevronRight />
          </Button.Icon>
        </Button.Root>
      </form>
    </div>
  );
}
