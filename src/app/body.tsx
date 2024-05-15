"use client";
import Navbar from "@/components/navbar/navbar";
import DarkModeContext, { DarkModeContextProps } from "@/context/darkmode/darkmode";
import { usePathname } from "next/navigation";
import { useContext } from "react";

export default function BodyLayout({ children, className }: { children: React.ReactNode; className: string }) {
  const path = usePathname();
  const isSR = path.startsWith("/sr");
  const { darkMode } = useContext(DarkModeContext) as DarkModeContextProps;

  const themeClass = darkMode ? "text-white bg-slate-950 shadow-slate-800" : "text-black bg-white";

  return isSR ? (
    <html lang="en">
      <body className={`transition-all duration-300 bg-[#092635] text-white`}>{children}</body>
    </html>
  ) : (
    <html lang="en">
      <body className={`transition-all duration-300 ${className} ${themeClass}`}>
        <div>
          <Navbar />
          <div className="px-2 pt-[80px]">{children}</div>
        </div>
      </body>
    </html>
  );
}
