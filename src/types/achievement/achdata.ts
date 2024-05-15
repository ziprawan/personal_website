export interface IAchievementData {
  id: number;
  seriesId: number;
  titleHash: number;
  descriptionHash: number;
  hideDescriptionHash: number;
  params: number[];
  priority: number;
  rarity: "High" | "Mid" | "Low";
  showType: "ShowAfterFinish" | "HiddenDesc" | undefined;
}
