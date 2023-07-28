"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  nome: z.string().nonempty("Campo obrigatório"),
  email: z.string().nonempty("Campo obrigatório").email("E-mail inválido"),
  senha: z
    .string()
    .refine((senha) => senha.length > 5, "Senha deve ter 5 caracteres"),
  idade: z.coerce.number(),
});

type FormData = z.infer<typeof formSchema>;

export default function Page() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  function handleEnviar(data: FormData) {
    console.log(data);
  }

  return (
    <form onSubmit={handleSubmit(handleEnviar)}>
      <div>
        <label>Nome</label>
        <input {...register("nome")} />
        {errors?.nome && (
          <div className="text-red-400">{errors.nome.message}</div>
        )}
      </div>

      <div>
        <label>Email</label>
        <input {...register("email")} />
        {errors?.email && (
          <div className="text-red-400">{errors.email.message}</div>
        )}
      </div>

      <div>
        <label>Senha</label>
        <input {...register("senha")} />
        {errors?.senha && (
          <div className="text-red-400">{errors.senha.message}</div>
        )}
      </div>

      <div>
        <label>Idade</label>
        <input {...register("idade")} />
        {errors?.idade && (
          <div className="text-red-400">{errors.idade.message}</div>
        )}
      </div>

      <button type="submit">Enviar</button>
    </form>
  );
}
