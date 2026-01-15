"use client";
import Navbar from "@/components/navbar/navbar";
import DarkModeContext, { DarkModeContextProps } from "@/context/darkmode/darkmode";
import { useContext, useEffect } from "react";

export default function BodyLayout({ children, className }: { children: React.ReactNode; className: string }) {
  const { darkMode } = useContext(DarkModeContext) as DarkModeContextProps;

  // We no longer apply theme classes directly on the body; root-level CSS variables
  // and the `html.dark` class control base background and text colors.

  useEffect(() => {
    // Avoid changing server-rendered <html> attributes to prevent hydration mismatch.
    // Toggle the `dark` class on the root element after hydration instead.
    if (typeof document !== "undefined") {
      const root = document.documentElement;
      if (darkMode) root.classList.add("dark");
      else root.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <html lang="en">
      <body className={`transition-all duration-300 ${className}`}>
        <div>
          <Navbar />
          <div className="px-2 pt-[80px]">{children}</div>
        </div>
      </body>
    </html>
  );
}
