interface InputErrorsProps {
  error?: any;
}

export function InputError({ error }: InputErrorsProps) {
  if (!error) return null;

  return <div className="text-red-400 text-sm">{error}</div>;
}
