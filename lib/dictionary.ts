import type { Locale } from "../i18next.config";

const dictionaries = {
  en: () => import("../locales/en.json").then((module) => module.default),
  fa: () => import("../locales/fa.json").then((module) => module.default),
};

export const getDictionary = (locale: Locale) =>
  dictionaries[locale]?.() ?? dictionaries.en();
