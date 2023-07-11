interface SelectErrorsProps {
  error?: any;
}

export function SelectError({ error }: SelectErrorsProps) {
  if (!error) return null;

  return <div className="text-red-400 text-sm">{error}</div>;
}
