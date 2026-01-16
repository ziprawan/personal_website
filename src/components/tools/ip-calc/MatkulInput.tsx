"use client";

import { Matkul, Score } from "@/types/ip-calc/matkul";
import { FaTrash } from "react-icons/fa";

type MatkulInputProps = { data: Matkul; setData: (data: Matkul) => void; delData: (id: number) => void };

const SKS_MAX = 9;

export default function MatkulInput({ data, setData, delData }: MatkulInputProps) {
  return (
    <div className="my-2 border border-slate-500 p-2 space-y-2 rounded-md">
      <div className="flex gap-1 items-center">
        <input
          name="matkul_name"
          className="w-full border border-slate-500 p-1 rounded-sm"
          placeholder="Nama Matkul"
          value={data.name}
          onChange={(i) => setData({ ...data, name: i.target.value })}
        />
        <button className="bg-slate-200 py-1 px-3 border-slate-500 border cursor-pointer rounded-sm">...</button>
      </div>
      <div className="flex justify-between items-center">
        <input
          name="matkul_sks"
          className="border border-slate-500 p-1 mr-2 rounded-sm"
          placeholder="SKS"
          type="number"
          max={SKS_MAX}
          min={0}
          step={1}
          value={data.sks === 0 ? "" : data.sks}
          onChange={(p) => {
            if (!p.target.validity.valid) {
              return;
            }

            let sks = parseFloat(p.target.value);
            if (isNaN(sks) || sks < 0 || sks > parseFloat(p.target.max)) {
              sks = 0;
            }
            setData({ ...data, sks: sks });
          }}
        />
        <span className="flex gap-2 items-center">
          Indeks:
          <select
            value={data.score}
            className="border border-slate-500 p-1 rounded-sm"
            onChange={(s) => setData({ ...data, score: s.target.value as Score })}
          >
            <option value={""}></option>
            <optgroup label="A/B/C/D/E">
              <option value={"A"}>A</option>
              <option value={"AB"}>AB</option>
              <option value={"B"}>B</option>
              <option value={"BC"}>BC</option>
              <option value={"C"}>C</option>
              <option value={"D"}>D</option>
              <option value={"E"}>E</option>
            </optgroup>
            <optgroup label="P/F">
              <option value={"P"}>P</option>
              <option value={"F"}>F</option>
            </optgroup>
            <optgroup label="Misc.">
              <option value={"T"}>T</option>
            </optgroup>
          </select>
        </span>
        <span className="cursor-pointer">
          <FaTrash onClick={() => delData(data.id)} />
        </span>
      </div>
    </div>
  );
}
