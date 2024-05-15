export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <div className={`transition-all p-10`}>{children}</div>;
}
