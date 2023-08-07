import { SMTPClient } from "emailjs";

export default function emailClient() {
  return new SMTPClient({
    user: process.env.NEXT_PUBLIC_GMAIL_USER,
    password: process.env.NEXT_PUBLIC_GMAIL_PASSWORD,
    host: "smtp.gmail.com",
    ssl: false,
    tls: {
      rejectUnauthorized: false,
    },
  });
}
