function removeTags(input: string): string {
  const tags: [string, string][] = [
    ["[", "]"],
    ["{", "}"],
    ["<", ">"],
  ];

  let res: string = "";
  let currTag: string = "";
  let prevIsSpace: boolean = false;

  for (let i = 0; i < input.length; i++) {
    const c = input[i];

    if (tags.map((t) => t[0]).includes(c)) {
      currTag = c;
      continue;
    } else if (currTag && tags.find((t) => t[0] === currTag)?.[1] === c) {
      currTag = "";
      continue;
    }

    if (!currTag) {
      if (c === " ") {
        if (prevIsSpace) continue;
        else {
          prevIsSpace = true;
          res += c;
        }
      } else {
        prevIsSpace = false;
        res += c;
        continue;
      }
    }
  }

  return res;
}

function mapParams(input: string, params: number[]): string {
  const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]; // Lazyyyyyyyy
  let res: string = "";
  let pow = 0;
  let tagNumber: number = 0;
  let isNowTag: boolean = false;

  for (let i = 0; i < input.length; i++) {
    const c = input[i];

    if (c === "#") {
      isNowTag = true;
      continue;
    }

    if (isNowTag) {
      if (numbers.includes(c)) {
        tagNumber += parseInt(c) * 10 ** pow++;
        continue;
      } else if (c === " ") {
        isNowTag = false;
        continue;
      } else {
        throw new Error(`${c} is not a number!`);
      }
    } else if (!isNowTag && tagNumber > 0) {
      res += String(params[tagNumber - 1]) + ` ${c}`;
      tagNumber = 0;
      pow = 0;
    } else res += c;
  }

  if (tagNumber > 0) {
    res += String(params[tagNumber - 1]);
    tagNumber = 0;
    pow = 0;
  }

  return res;
}

export function formatAchievementText(input: string, params?: number[]) {
  if (!input) return <></>;

  input = removeTags(input);
  if (params && params.length > 0) {
    input = mapParams(input, params);
  }

  return (
    <>
      {input.split("\\n").map((i, j) => (
        <div key={`${j}`}>
          {i}
          <br />
        </div>
      ))}
    </>
  );
}
