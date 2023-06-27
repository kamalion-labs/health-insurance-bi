type Props = {
  title: string;
};

export function Header({ title }: Props) {
  return (
    <header className="sticky bg-[var(--color-header-bg)] p-5">
      <div className=" text-3xl font-light">{title}</div>
    </header>
  );
}
