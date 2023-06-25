import * as Progress from "@radix-ui/react-progress";

export function ProgressBar({ progress }: { progress: number | undefined }) {
  if (!progress) return null;

  return (
    <Progress.Root
      className="h-3 w-full overflow-hidden rounded-full bg-white dark:bg-gray-900"
      value={progress}
    >
      <Progress.Indicator
        className="h-full bg-[var(--color-primary)] transition-width duration-300 ease-in-out"
        style={{ width: `${progress}%` }}
      />
    </Progress.Root>
  );
}
