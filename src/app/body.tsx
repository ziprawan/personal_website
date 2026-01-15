"use client";
import Navbar from "@/components/navbar/navbar";
import DarkModeContext, { DarkModeContextProps } from "@/context/darkmode/darkmode";
import { usePathname } from "next/navigation";
import { useContext } from "react";

export default function BodyLayout({ children, className }: { children: React.ReactNode; className: string }) {
  const { darkMode } = useContext(DarkModeContext) as DarkModeContextProps;

  const themeClass = darkMode ? "text-slate-100 bg-slate-800 shadow-slate-700" : "text-black bg-white";

  return (
    <html lang="en" className={darkMode ? "dark" : ""}>
      <body className={`transition-all duration-300 ${className} ${themeClass}`}>
        <div>
          <Navbar />
          <div className="px-2 pt-[80px]">{children}</div>
        </div>
      </body>
    </html>
  );
}
