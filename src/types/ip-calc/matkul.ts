export type ScoreABCDE = "A" | "AB" | "B" | "BC" | "C" | "D" | "E";
export type ScorePF = "P" | "F";
export type Score = "" | "T" | ScoreABCDE | ScorePF;

export type Matkul = {
  id: number;
  name: string;
  sks: number;
  score: Score;
};

export function scoreToIp(s: Score): number {
  if (s == "D") return 1;
  else if (s == "C") return 2;
  else if (s == "BC") return 2.5;
  else if (s == "B") return 3;
  else if (s == "AB") return 3.5;
  else if (s == "A") return 4;
  else return 0;
}

export function isScorePF(s: Score): boolean {
  return s == "P" || s == "F";
}
