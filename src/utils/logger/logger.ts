/**LOGLEVEL info
 * 1 => Debug
 * 2 => Log
 * 3 => Info
 * 4 => Warning
 * 5 => Error
 */

function checkLevel() {
  let LOGLEVEL: string | number | undefined = process.env.LOGLEVEL;

  if (typeof LOGLEVEL !== "number" || !isFinite(LOGLEVEL)) {
    LOGLEVEL = 3;
  } else {
    LOGLEVEL = Number(LOGLEVEL);
  }

  if (LOGLEVEL > 5 && LOGLEVEL < 1) {
    LOGLEVEL = 3;
  }

  return LOGLEVEL;
}

export function debug(...data: any[]) {
  if (checkLevel() === 1) {
    console.debug(...data);
  }
}

export function log(...data: any[]) {
  if (checkLevel() <= 2) {
    console.log(...data);
  }
}

export function info(...data: any[]) {
  if (checkLevel() <= 3) {
    console.info(...data);
  }
}

export function warn(...data: any[]) {
  if (checkLevel() <= 4) {
    console.warn(...data);
  }
}

export function error(...data: any[]) {
  if (checkLevel() <= 5) {
    console.error(...data);
  }
}
