export default function SRPage() {
  return (
    <div>
      <div className="text-xl italic font-semibold">Honkai: Star Rail Data ?</div>
      <div className="text-lg">Select your language</div>
      <div className="text-lg text-blue-500 hover:underline hover:text-blue-700">
        <a href="/sr/en">EN | English</a>
      </div>
      <div className="text-lg text-blue-500 hover:underline hover:text-blue-700">
        <a href="/sr/id">ID | Indonesia</a>
      </div>
    </div>
  );
}
