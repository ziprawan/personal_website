export default function ContentfulDate({ date, prefix }: { date: string | Date, prefix?: string | undefined }) {
  const dateParsed = new Date(date);
  const showDate = dateParsed.toLocaleString("id-ID");
  return <div className="date text-gray-400 text-sm">{prefix}{showDate}</div>;
}
