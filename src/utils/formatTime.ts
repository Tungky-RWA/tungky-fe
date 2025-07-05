export function formatTimestampToIndoDate(dateTime: string): string {
  const date = new Date(dateTime);
  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
