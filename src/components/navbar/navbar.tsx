"use client";

import Link from "next/link";
import { useContext, useState } from "react";
import DarkModeContext, {
  DarkModeContextProps,
} from "@/context/darkmode/darkmode";
import { HiMoon, HiSun } from "react-icons/hi";

export default function Navbar() {
  const [count, setCount] = useState(0);
  const { darkMode, setDarkMode } = useContext(
    DarkModeContext
  ) as DarkModeContextProps;

  function navbarEasterEgg() {
    if (count % 1000 === 0 && count !== 0) {
      alert(`Bro what, you even already reached ${count} 💀`);
      return setCount(count + 1);
    }
    if (count % 100 === 0 && count !== 0) {
      alert(`Hooray, you reached ${count}!`);
      return setCount(count + 1);
    }
  }

  function changeDarkMode() {
    setDarkMode(!darkMode);
  }

  function darkModeClass() {
    return darkMode
      ? "text-white bg-slate-950 shadow-slate-800"
      : "text-black bg-white";
  }

  return (
    <div
      onClick={navbarEasterEgg}
      className={`transition-all z-10 duration-300 py-4 select-none text-3xl font-bold flex fixed w-full justify-between shadow-md ${darkModeClass()}`}
    >
      <div className="flex">
        <div className="px-10">
          <Link href="/">Ziprawan</Link>
        </div>
        <div className="px-4">
          <Link href="/posts">Posts</Link>
        </div>
        <div className="px-4">
          <Link href="/tools">Tools</Link>
        </div>
      </div>
      <div className="pr-10 text-4xl cursor-pointer" onClick={changeDarkMode}>
        {darkMode ? <HiSun /> : <HiMoon />}
      </div>
    </div>
  );
}
