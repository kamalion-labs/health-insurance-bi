import { prisma } from "@/lib/db/prisma";
import emailClient from "@/lib/email/emailClient";
import { Usuario } from "@prisma/client";
import { addHours } from "date-fns";
import EmailNovaSenha from "../../../../emails/EmailNovaSenha";
import { render } from "@react-email/render";

export default async function resetarSenha(user: Usuario, req: Request) {
  const token = await prisma.resetToken.create({
    data: {
      idUsuario: user.id,
      dataExpiracao: addHours(new Date(), 24),
    },
  });

  const link = new URL(`/novaSenha?token=${token.token}`, req.url).href;

  const client = emailClient();
  const mailContent = render(EmailNovaSenha({ name: user.nome, link }));

  await client.sendAsync({
    text: mailContent,
    from: process.env.NEXT_PUBLIC_GMAIL_USER!,
    to: user.email,
    subject: "Novo Acesso - Interliga BI",
    attachment: [{ data: mailContent, alternative: true }],
  });
}
