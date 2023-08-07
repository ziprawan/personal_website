export default function ContentfulDate({
  date,
  prefix,
  className,
}: {
  date: string | Date;
  prefix?: string | undefined;
  className?: string | undefined;
}) {
  const dateParsed = new Date(date);
  const showDate = dateParsed.toLocaleString("id-ID");
  return (
    <div className={`text-gray-400 duration-300 text-sm ${className}`}>
      {prefix}
      {showDate}
    </div>
  );
}
