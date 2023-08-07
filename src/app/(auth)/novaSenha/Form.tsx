"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { FaChevronRight } from "react-icons/fa6";
import { z } from "zod";
import { useSearchParams, useRouter } from "next/navigation";

import { Button, Input } from "@/components";

import logo from "../../../assets/interliga.png";
import { handleResponse } from "@/lib/api/handleResponse";

const formSchema = z
  .object({
    senha: z.string().nonempty("Campo obrigatório").default(""),
    senhaConfirma: z.string().nonempty("Campo obrigatório").default(""),
  })
  .refine((data) => data.senha === data.senhaConfirma, {
    path: ["senhaConfirma"],
    message: "As senhas devem coincidir",
  })
  .refine((data) => data.senha.length >= 8, {
    path: ["senha"],
    message: "A senha deve possuir no mínimo 8 caracteres",
  });

type FormData = z.infer<typeof formSchema>;

export function Form() {
  const { get } = useSearchParams();
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting, errors },
    setError,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  async function handleLogin(formData: FormData) {
    try {
      const token = get("token");

      const response = await fetch("/api/usuario/mudarSenha", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          senha: formData.senha,
          token,
        }),
      });

      const { success } = await handleResponse<{ success: boolean }>(response);

      if (success) {
        router.push("/login");
      }
    } catch (e: any) {
      setError("root", { message: e.message });
    }
  }

  return (
    <div className="flex h-full w-full max-w-md flex-col space-y-10 bg-white p-5 dark:bg-slate-700 md:h-fit md:w-full md:rounded-md">
      <div className="flex w-full justify-center">
        <Image alt="Interliga" src={logo} className="w-full md:w-[200px]" />
      </div>

      <form
        onSubmit={handleSubmit(handleLogin)}
        className="flex flex-col space-y-5"
      >
        <Input.Root>
          <Input.Label htmlFor="senha" text="Nova Senha:" />
          <Input.Control control={control} name="senha" type="password" />
        </Input.Root>

        <Input.Root>
          <Input.Label htmlFor="senhaConfirma" text="Confirme a Nova Senha:" />
          <Input.Control
            control={control}
            name="senhaConfirma"
            type="password"
          />
        </Input.Root>

        <div className="text-red-400">{errors.root?.message}</div>

        <Button.Root submit isLoading={isSubmitting}>
          <Button.Content>Entrar</Button.Content>
          <Button.Icon>
            <FaChevronRight />
          </Button.Icon>
        </Button.Root>
      </form>
    </div>
  );
}
