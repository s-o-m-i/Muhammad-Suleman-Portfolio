export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function formatPeriod(start: string, end: string) {
  return `${start} — ${end}`;
}
