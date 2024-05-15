export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <div className={`transition-all p-5`}>{children}</div>;
}
