import * as es from "./es";
import * as en from "./en";
import { Lang } from "@/types";

export function getContent(lang: Lang) {
  switch (lang) {
    case "en":
      return en;
    case "es":
    default:
      return es;
  }
}
