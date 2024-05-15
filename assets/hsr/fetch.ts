import { writeFile } from "fs";

const ACHIEVEMENT_SERIES_URL = "https://github.com/Dimbreath/StarRailData/raw/master/ExcelOutput/AchievementSeries.json";
const ACHIEVEMENT_DATA_URL = "https://github.com/Dimbreath/StarRailData/raw/master/ExcelOutput/AchievementData.json";
const TEXT_MAP_DATA = {
  EN: "https://github.com/Dimbreath/StarRailData/raw/master/TextMap/TextMapEN.json",
  ID: "https://github.com/Dimbreath/StarRailData/raw/master/TextMap/TextMapID.json",
};

const EXCEL_OUTPUT_PATH = "./assets/achievements/ExcelOutput";
const TEXT_MAP_PATH = "./assets/achievements/TextMap";

const defaultCallbackFn = () => {};
const getSize = (len: number) => {
  const suffixes = ["B", "KB", "MB", "GB", "TB"];
  let count = 0;

  while (len >= 1024 && count < 4) {
    count++;
    len /= 1024;
  }

  return len.toFixed(2).replace(/\.?0*$/, "") + suffixes[count]; // Source: https://stackoverflow.com/a/29249277
};

function main() {
  // Achievement series fetch
  console.log('Fetcing "Achievement Series"');
  fetch(ACHIEVEMENT_SERIES_URL).then(async (resp) => {
    if (resp.status >= 400) {
      console.log('Something is wrong when fetching "Achievement Series"!');
    } else {
      const buff = Buffer.from(await (await resp.blob()).arrayBuffer());
      const size = getSize(buff.length);
      const path = `${EXCEL_OUTPUT_PATH}/AchievementSeries.json`;
      console.log(`GET ${resp.status} ${ACHIEVEMENT_SERIES_URL}`);
      writeFile(path, buff, defaultCallbackFn);
      console.log(`Written ${path} with size ${size}`);
    }
  });

  // Achievement data fetch
  console.log('Fetcing "Achievement Data"');
  fetch(ACHIEVEMENT_DATA_URL).then(async (resp) => {
    if (resp.status >= 400) {
      console.log('Something is wrong when fetching "Achievement Data"!');
    } else {
      const buff = Buffer.from(await (await resp.blob()).arrayBuffer());
      const size = getSize(buff.length);
      const path = `${EXCEL_OUTPUT_PATH}/AchievementData.json`;
      console.log(`GET ${resp.status} ${ACHIEVEMENT_DATA_URL}`);
      writeFile(path, buff, defaultCallbackFn);
      console.log(`Written ${path} with size ${size}`);
    }
  });

  // Text map fetch
  Object.entries(TEXT_MAP_DATA).forEach(([key, value]) => {
    const name = `Text MAP ${key}`;
    console.log(`Fetching "${name}"`);
    fetch(value).then(async (resp) => {
      if (resp.status >= 400) {
        console.log(`Something is wrong when fetching ${name}`);
      } else {
        try {
          const buff = Buffer.from(await (await resp.blob()).arrayBuffer());
          const size = getSize(buff.length);
          const path = `${TEXT_MAP_PATH}/TextMap${key.toUpperCase()}.json`;
          console.log(`GET ${resp.status} ${value}`);
          writeFile(path, buff, defaultCallbackFn);
          console.log(`Written ${path} with size ${size}`);
        } catch (err) {
          if (err instanceof SyntaxError) {
            console.log(`${value} response is not json!`);
          } else {
            console.log(`Something is wrong when processing "Text Map ${key}" response data!`);
          }
        }
      }
    });
  });
}

main();
