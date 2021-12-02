export function toLocaleTimeString(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleTimeString();
}
