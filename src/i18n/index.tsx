import React, { useCallback, useMemo } from "react";
import {LanguageKeysDe} from "./de";
import { LanguageKeys, LangProps } from "./en";

const de = new LanguageKeysDe();
const en = new LanguageKeys();

type State = { lang: string; keys: LanguageKeys };

const LangStateContext = React.createContext<State | undefined>(undefined);
const LangUpdaterContext = React.createContext<
  React.Dispatch<React.SetStateAction<"en" | "de">> | undefined
>(undefined);

const LangProvider: React.FunctionComponent = ({ children }) => {
  const [lang, setLang] = React.useState<"en" | "de">("en");

  const value = useMemo(() => {
    return {
      lang,
      keys: lang === "de" ? de : en
    };
  }, [lang]);

  return (
    <LangStateContext.Provider value={value}>
      <LangUpdaterContext.Provider value={setLang}>
        {children}
      </LangUpdaterContext.Provider>
    </LangStateContext.Provider>
  );
};

function useLangState() {
  const langState = React.useContext(LangStateContext);

  if (langState === undefined) {
    throw new Error("useLangState must be used within a LangProvider");
  }

  return langState;
}

function useT() {
  const langState = useLangState();

  const t = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (id: LangProps, data?: any): string => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const textItem: any = (langState.keys as any)[id];
      const str: string = textItem || id;

      return textItem instanceof Function ? textItem(data) : str;
    },
    [langState]
  );

  return t;
}

function useLang() {
  const langState = useLangState();

  return langState.lang;
}

function useSetLang() {
  const setLang = React.useContext(LangUpdaterContext);
  if (setLang === undefined) {
    throw new Error("useSetLang must be used within a LangProvider");
  }

  return setLang;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Props = { id: LangProps; data?: any };

// eslint-disable-next-line react/display-name
const T = React.memo(({ id, data }: Props) => {
  const t = useT();

  return <>{t(id, data)}</>;
});

export { LangProvider, useSetLang, useT, useLang, T };
