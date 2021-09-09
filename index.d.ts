import _josa from "./src/josa";
import _syllable from "./src/syllable";

export type JosaTypes =
  "와/과" | "와,과" | "와과"
  | "이/가" | "이,가" | "이가"
  | "을/를" | "을,를" | "을를"
  | "으/로" | "으,로" | "으로"
  | "은/는" | "은,는" | "은는"
  | "야/아" | "야,아" | "야아"
  | "이나" | "이란" | "이든가" | "이든지" | "이나마" | "이네";

declare const Josa = (target: string, postposition: JosaTypes, option?: { preserve: boolean }): string => _josa;

export interface SyllableOptions {
  //option.syllable: "초성"("cho"), "중성"("jung"), "종성"("jong"), "모두"("all")
  syllable?: "초성" | "중성" | "종성" | "모두" | "cho" | "jung" | "jong" | "choseong" | "jungseong" | "jongseong";
  toSeparateArray?: boolean;
  includeOtherLng?: boolean;
}

export interface Syllable {
  hasJongSeong: (str: string, option?: "ONLY_LAST_CHAR" | "GET_ARRAY") => boolean | boolean[];
  getSyllable: (str: string, option?: SyllableOptions) => string[] | string[][];
}

export default {
  Josa,
};