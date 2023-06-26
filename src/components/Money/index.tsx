import { Prisma } from "@prisma/client";

export function Money({
  value,
  percent,
}: {
  value: string | number | Prisma.Decimal;
  percent?: boolean;
}) {
  return (
    <>
      {!percent && <>R$ </>}
      {(+value).toLocaleString("pt-br", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}
      {percent && <>%</>}
    </>
  );
}
