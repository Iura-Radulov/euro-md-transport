import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({

    locales: ["en", "ru", "ro"],

    defaultLocale: "ru",

    // 'always' - префикс для всех языков (en/about, ru/about)
    // 'as-needed' - префикс только для не-дефолтных языков (about, ru/about)
    localePrefix: "always"
});

