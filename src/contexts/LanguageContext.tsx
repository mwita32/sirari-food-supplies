import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import { translations } from '@/i18n/translations';
import type { Lang, Translations } from '@/i18n/translations';

interface LanguageContextValue {
  lang: Lang;
  t: Translations;
  setLang: (l: Lang) => void;
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: 'en',
  t: translations.en,
  setLang: () => {},
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('en');

  function setLang(l: Lang) {
    setLangState(l);
  }

  const t = translations[lang] as Translations;

  return (
    <LanguageContext.Provider value={{ lang, t, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  return useContext(LanguageContext);
}
