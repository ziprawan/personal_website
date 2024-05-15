// import AchievementData from "#hsrExcelOutput/AchievementData.json";
// import AchievementSeries from "#hsrExcelOutput/AchievementSeries.json";
// import { readFileSync, writeFileSync } from "fs";

// // Interfaces
// // I think they're useless?

// interface IAchievementData {
//   id: number;
//   seriesId: number;
//   titleHash: number;
//   descriptionHash: number;
//   hideDescriptionHash: number;
//   params: number[];
//   priority: number;
//   rarity: "High" | "Mid" | "Low";
//   showType: "ShowAfterFinish" | "HiddenDesc" | undefined;
// }

// interface IAchievementSeries {
//   id: number;
//   titleHash: number;
//   priority: number;
//   members: number[];
// }

// // Variables
// let series: { [k: string]: IAchievementSeries } = {};
// let achievements: { [k: string]: IAchievementData } = {};
// const neededStrings: number[] = [];
// const TEXT_MAP_PATH = "./assets/hsr/TextMap";
// const OUT_PATH = "./assets/hsr/Output";

// // Getting achievement series' members list
// const seriesMembersList: number[][] = new Array(Object.keys(AchievementSeries).length);

// for (let i = 0; i < 9; i++) {
//   seriesMembersList[i] = new Array();
// }

// Object.values(AchievementData).forEach((achievement) => {
//   seriesMembersList[achievement.SeriesID - 1].push(achievement.AchievementID);
// });

// // Mapping Achievement Series :D
// Object.values(AchievementSeries).forEach((seriesData) => {
//   series[String(seriesData.SeriesID)] = {
//     id: seriesData.SeriesID,
//     titleHash: seriesData.SeriesTitle.Hash,
//     priority: seriesData.Priority,
//     members: seriesMembersList[seriesData.SeriesID - 1],
//   };
//   neededStrings.push(seriesData.SeriesTitle.Hash);
// });

// // Write series into file
// writeFileSync(OUT_PATH + "/series.json", JSON.stringify(series));

// // Mapping Achievement Data
// Object.values(AchievementData).forEach((achievement) => {
//   achievements[achievement.AchievementID] = {
//     id: achievement.AchievementID,
//     descriptionHash: achievement.AchievementDesc.Hash,
//     hideDescriptionHash: achievement.HideAchievementDesc.Hash,
//     params: achievement.ParamList.map((p) => p.Value),
//     priority: achievement.Priority,
//     rarity: achievement.Rarity as IAchievementData["rarity"],
//     seriesId: achievement.SeriesID,
//     // @ts-ignore
//     showType: achievement.ShowType ?? null,
//     titleHash: achievement.AchievementTitle.Hash,
//   };
//   neededStrings.push(achievement.AchievementDesc.Hash);
//   neededStrings.push(achievement.HideAchievementDesc.Hash);
//   neededStrings.push(achievement.AchievementTitle.Hash);
// });

// // Write achievements data into file
// writeFileSync(OUT_PATH + "/achievements.json", JSON.stringify(achievements));

// // Read text map
// const supportedLangs = ["EN", "ID"];

// // Heh.
// supportedLangs.forEach((lang) => {
//   let langData: { [k: string]: string } = {};
//   lang = lang.toUpperCase();
//   const read = JSON.parse(readFileSync(`${TEXT_MAP_PATH}/TextMap${lang}.json`).toString()) as {
//     [k: string]: string;
//   };

//   neededStrings.forEach((sid) => {
//     langData[sid] = read[sid];
//   });

//   writeFileSync(`${OUT_PATH}/Text/Text${lang}.json`, JSON.stringify(langData));
// });
