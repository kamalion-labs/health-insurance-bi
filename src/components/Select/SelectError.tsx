interface SelectErrorsProps {
  error?: any;
}

export function SelectError({ error }: SelectErrorsProps) {
  if (!error) return null;

  return <div className="text-sm text-red-400">{error}</div>;
}
