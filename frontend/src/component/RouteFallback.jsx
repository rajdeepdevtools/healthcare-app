export default function RouteFallback() {
  return (
    <div className="grid min-h-[60vh] place-items-center">
      <div className="flex flex-col items-center gap-4 text-primary-700 dark:text-primary-300">
        <span className="size-10 animate-spin rounded-full border-[3px] border-primary-200 border-t-primary-700 dark:border-primary-800 dark:border-t-primary-300" aria-hidden="true" />
        <p className="text-sm font-semibold">Loading…</p>
      </div>
    </div>
  );
}
