import { Html } from "@react-email/html";
import { Text } from "@react-email/text";
import { Body } from "@react-email/body";
import { Container } from "@react-email/container";
import { Img } from "@react-email/img";
import { Link } from "@react-email/link";
import { Tailwind } from "@react-email/tailwind";

export default function EmailNovaSenha({
  name,
  link,
}: {
  name: string;
  link: string;
}) {
  return (
    <Html>
      <Tailwind>
        <Body className="mx-auto my-auto bg-[#FEFEFE] font-sans">
          <Container className="w-[580px] py-10 text-slate-700">
            <Img
              src="https://interliga.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Finterliga.428c2bef.png&w=1080&q=75"
              alt="Interliga"
              width="500"
              height="300"
            />

            <Text className="text-lg font-bold ">Olá, {name}!</Text>
            <Text>
              Clique no link abaixo para definir sua nova senha de acesso ao
              Interliga BI:
            </Text>

            <Link href={link}>{link}</Link>

            <Text>Obs: O link expira em 24 horas</Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
