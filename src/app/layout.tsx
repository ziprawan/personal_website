import "./globals.css";
import { Ubuntu } from "next/font/google";
import BodyLayout from "./body";
import { DarkModeProvider } from "@/context/darkmode/darkmode";

const ubuntu = Ubuntu({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  style: ["normal", "italic"],
  variable: "--font-ubuntu",
});

export const metadata = {
  title: "Aziz's Website",
  description: "Aziz's website that powered by Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DarkModeProvider>
      <BodyLayout className={ubuntu.className}>{children}</BodyLayout>
    </DarkModeProvider>
  );
}
