export default function dateTimeConvert(value: Date) {
  const itemDate = new Date(value);
  const isoDate = itemDate.toISOString();
  const date = isoDate.substring(0, 10);
  const time = itemDate.getHours() + ':' + isoDate.substring(14, 16);
  return date + '\n' + time;
}
