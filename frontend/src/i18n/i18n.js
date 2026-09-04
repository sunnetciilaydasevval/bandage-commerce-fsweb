import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import trCommon from "./locales/tr/common.json";
import enCommon from "./locales/en/common.json";

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: {
            tr: {
                common: trCommon,
            },
            en: {
                common: enCommon,
            },
        },

        fallbackLng: "en",

        ns: ["common"],
        defaultNS: "common",

        detection: {
            order: [
                "localStorage",
                "navigator",
                "htmlTag",
            ],
            caches: ["localStorage"],
        },

        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;
