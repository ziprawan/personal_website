"use client";
import React from "react";

export default function LoginPage() {
  function signIn(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault;
  }

  return (
    <main>
      <div>
        <button onClick={signIn} className="bg-slate-300 rounded-md px-5 py-3">
          Sign in with Google
        </button>
      </div>
    </main>
  );
}
