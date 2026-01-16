"use client";

import MatkulInput from "@/components/tools/ip-calc/MatkulInput";
import { isScorePF, Matkul, scoreToIp } from "@/types/ip-calc/matkul";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";

type Prog = {
  sks: number;
  ip: number;
};

function ipToDetail(ip: number): string {
  if (ip < 0) {
    return "Invalid negative IP";
  } else if (ip < 1) {
    return "Kurang/Gagal";
  } else if (ip < 2) {
    return "Hampir cukup";
  } else if (ip === 2) {
    return "Cukup";
  } else if (ip < 3) {
    return "Antara cukup dan baik";
  } else if (ip === 3) {
    return "Baik";
  } else if (ip < 4) {
    return "Antara baik dan sangat baik";
  } else if (ip === 4) {
    return "Sangat baik";
  } else {
    return "Invalid IP value";
  }
}

function formatIp(ip: number): string {
  const major = Math.floor(ip);
  const minor = Math.round((ip - major) * 100);

  return `${major.toString(10)}.${minor.toString(10).padStart(2, "0")}`;
}

export default function IPCalcTool() {
  const [matkuls, setMatkuls] = useState<Array<Matkul>>([{ id: 0, name: "", sks: 0, score: "" }]);
  const [prev, setPrev] = useState<Prog>({ ip: 0, sks: 0 });

  const setData = (data: Matkul) => setMatkuls((ms) => ms.map((m) => (m.id === data.id ? data : m)));
  const delData = (id: number) => setMatkuls((ms) => ms.filter((m) => m.id !== id).map((m, i) => ({ ...m, id: i })));

  let score = 0;
  let sks = 0;
  let hasT = false;
  matkuls.forEach((m) => {
    if (m.score === "") {
      return;
    }
    if (m.score === "T") {
      hasT = true;
    }
    if (isScorePF(m.score)) {
      return;
    }
    score += scoreToIp(m.score) * m.sks;
    sks += m.sks;
  });

  const cur: Prog = { sks, ip: sks === 0 ? 0 : score / sks };

  sks += prev.sks;
  score += prev.ip * prev.sks;
  const sums: Prog = { sks, ip: sks === 0 ? 0 : score / sks };

  return (
    <main className="flex flex-col items-center md:py-8">
      <div className="w-full text-center mb-14">
        <h1 className="text-3xl font-bold mb-5">IPS/IPK Calculator</h1>
        <p className="text-sm md:text-lg text-muted-foreground leading-6 font-light">
          Ingat bahwa A=4, AB=3.5, B=3, BC=2.5, C=2, D=1, E=0. P=Pass, F=Fail.
          <br />
          Matkul dengan metode penilaian P/F tidak dihitung dalam IPS/IPK.
          <br />
          (Refer ke Peraturan Akademik 2025 Pasal 41 hingga Pasal 42.)
        </p>
      </div>
      <div className="max-md:text-sm w-full max-w-7xl mx-2 md:mx-4 gap-6 grid md:grid-cols-2">
        <div className="h-fit border border-slate-500 px-2 md:px-4 py-1 md:py-2 rounded-md">
          <p className="font-bold">Masukkan Mata Kuliah</p>
          <p className="text-slate-700 dark:text-slate-200">Masukkan nama mata kuliah, SKS, dan indeks</p>
          {matkuls.map((m, i) => (
            <MatkulInput key={`key_${i}`} data={m} setData={setData} delData={delData} />
          ))}

          <button
            onClick={() => setMatkuls((m) => [...m, { id: m.length, name: "", score: "", sks: 0 }])}
            className="select-none flex items-center gap-2 mt-4 mb-2 border border-slate-500 py-1 px-2 cursor-pointer rounded-sm"
          >
            <FaPlus /> Tambah
          </button>
        </div>
        <div className="h-fit space-y-3">
          <div className="space-y-4 border border-slate-500 px-2 md:px-4 py-1 md:py-2 rounded-md">
            <p className="font-bold">IPK</p>
            <div className="grid gap-x-2 grid-cols-2">
              <p className="text-sm">IPK</p>
              <p className="text-sm flex flex-col">
                SKS*
                <span className="text-xs italic">*tidak termasuk matkul P/F</span>
              </p>
              <input
                autoComplete="off"
                autoCapitalize="none"
                name="cur_ipk"
                className="border border-slate-500 rounded-sm px-2 py-1"
                type="number"
                min={0}
                max={4}
                step={0.01}
                value={prev.ip === 0 ? "" : prev.ip}
                onChange={(p) => {
                  if (!p.target.validity.valid) {
                    return;
                  }

                  let ipk = parseFloat(p.target.value);
                  if (isNaN(ipk) || ipk < 0 || ipk > parseFloat(p.target.max)) {
                    ipk = 0;
                  }
                  setPrev((a) => ({ ...a, ip: ipk }));
                }}
              />
              <input
                autoComplete="off"
                autoCapitalize="none"
                name="cur_sks"
                className="border border-slate-500 rounded-sm px-2 py-1"
                type="number"
                min={0}
                max={168}
                step={1}
                value={prev.sks === 0 ? "" : prev.sks}
                onChange={(p) => {
                  if (!p.target.validity.valid) {
                    return;
                  }

                  let sks = parseFloat(p.target.value);
                  if (isNaN(sks) || sks < 0 || sks > parseFloat(p.target.max)) {
                    sks = 0;
                  }
                  setPrev((a) => ({ ...a, sks }));
                }}
              />
            </div>
          </div>
          <div className="space-y-4 border border-slate-500 px-2 md:px-4 py-1 md:py-2 rounded-md">
            <p className="font-bold">Hasil Perhitungan</p>

            <div className="space-y-1">
              <p>IP Semester</p>
              <p className="text-xl md:text-4xl font-bold">
                {formatIp(cur.ip)} <span className="text-sm">({ipToDetail(cur.ip)})</span>
              </p>
              <p className="text-lg md:text-xl">
                {cur.sks} <span className="text-sm">SKS</span>
              </p>
            </div>

            {prev.ip > 0 && prev.sks > 0 && (
              <div className="space-y-1">
                <p>IP Kumulatif</p>
                <p className="text-xl md:text-4xl font-bold">
                  {formatIp(sums.ip)} <span className="text-sm">({ipToDetail(sums.ip)})</span>
                </p>
                <p className="text-lg md:text-xl">
                  {sums.sks} <span className="text-sm">SKS</span>
                </p>
              </div>
            )}

            {hasT && (
              <div className="text-sm italic">
                Terdeteksi matkul dengan indeks T, yang artinya nilai belum lengkap. Jika sampai batas akhir nilai masih
                belum berubah, maka otomatis akan menjadi E (ABCDE) atau F (P/F). [Lihat Peraturan Akademik 2025 Pasal
                42]
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
