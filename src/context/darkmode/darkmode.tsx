"use client";

import {
  Dispatch,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";

export type DarkModeContextProps = {
  darkMode: boolean;
  setDarkMode: Dispatch<SetStateAction<boolean>>;
};

const DarkModeContext = createContext<DarkModeContextProps | null>(null);

export default DarkModeContext;

export const DarkModeProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [darkMode, setDarkMode] = useState<boolean>(false);

  useEffect(() => {
    const values = ["true", "false"];
    const localDarkMode = localStorage.getItem("darkMode");

    if (!localDarkMode || !values.includes(localDarkMode)) {
      localStorage.setItem("darkMode", "false");
      return setDarkMode(false);
    }

    if (localDarkMode === values[0]) return setDarkMode(true);
    else return setDarkMode(false);
  }, []);

  useEffect(() => {
    const values = ["true", "false"];
    const localDarkMode = localStorage.getItem("darkMode");

    if (!localDarkMode || !values.includes(localDarkMode)) {
      return localStorage.setItem("darkMode", "false");
    }

    if (String(darkMode) !== localDarkMode) {
      localStorage.setItem("darkMode", String(darkMode));
    }
  }, [darkMode]);

  useEffect(() => {
    addEventListener("storage", (e) => {
      if (e.key === "darkMode") {
        setDarkMode(e.newValue === "true" ? true : false);
      }
    });
  }, []);

  return (
    <DarkModeContext.Provider
      value={{
        darkMode,
        setDarkMode,
      }}
    >
      {children}
    </DarkModeContext.Provider>
  );
};
