import 'server-only';
//
const dictionaries = {
  en: () => import('@/messages/en.json').then(module => module.default),
  ro: () => import('@/messages/ro.json').then(module => module.default),
  ru: () => import('@/messages/ru.json').then(module => module.default),
};

export const getDictionary = async locale => dictionaries[locale]();
