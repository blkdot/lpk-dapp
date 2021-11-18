/* tslint:disable:no-class readonly-keyword typedef */
import {LanguageKeys} from "./en";

export class LanguageKeysDe extends LanguageKeys {
  public WELCOME_HEADLINE = "Willkommen in der App";

  public MESSAGES = ({ count }: { count: number }) => {
    return count === 1 ? `${count} Nachricht` : `${count} Nachrichten`;
  };
}

export default LanguageKeysDe;
