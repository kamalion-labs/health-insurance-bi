"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { FormProvider, useForm } from "react-hook-form";
import { FaChevronRight } from "react-icons/fa6";
import { z } from "zod";
import { useSearchParams, useRouter } from "next/navigation";

import { handleResponse } from "@/lib/api/handleResponse";

import logo from "../../../assets/interliga.png";
import { Button, Form, Input } from "@kamalion/ui";

const loginFormSchema = z.object({
  email: z.string().nonempty("Campo obrigatório").default(""),
  senha: z.string().nonempty("Campo obrigatório").default(""),
});

type LoginFormData = z.infer<typeof loginFormSchema>;

export function LoginForm() {
  const { get } = useSearchParams();
  const router = useRouter();

  const form = useForm<LoginFormData>({
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
        router.push(redirect !== "null" ? redirect : "/1");
      }
    } catch (e: any) {
      form.setError("root", { message: e.message });
    }
  }

  return (
    <div className="flex w-full max-w-md flex-col space-y-10 bg-white p-5 dark:bg-slate-700 md:h-fit md:w-full md:rounded-md">
      <div className="flex w-full justify-center">
        <Image alt="Interliga" src={logo} className="w-full md:w-[200px]" />
      </div>

      <FormProvider {...form}>
        <Form.Root
          onSubmit={form.handleSubmit(handleLogin)}
          className="flex flex-col space-y-5"
        >
          <Input.Root>
            <Input.Label htmlFor="email">E-mail:</Input.Label>
            <Input.Text {...form.register("email")} />
          </Input.Root>

          <Input.Root>
            <Input.Label htmlFor="senha">Senha:</Input.Label>
            <Input.Text type="password" {...form.register("senha")} />
          </Input.Root>

          <Form.Error />

          <Button.Root
            variant="accent"
            type="submit"
            isLoading={form.formState.isSubmitting}
          >
            <Button.Content>Entrar</Button.Content>
            <Button.Icon>
              <FaChevronRight />
            </Button.Icon>
          </Button.Root>
        </Form.Root>
      </FormProvider>
    </div>
  );
}
