import { randomValueFromArray } from "@helpers/arrays";

export function randomState() {
  const states = ["Albama", "Alsaka", "Arizona"];
  return randomValueFromArray(states);
}