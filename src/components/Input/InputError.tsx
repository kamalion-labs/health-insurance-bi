interface InputErrorsProps {
  error?: any;
}

export function InputError({ error }: InputErrorsProps) {
  if (!error) return null;

  return <div className="text-sm text-red-400">{error}</div>;
}
