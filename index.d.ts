export type JosaTypes =
  `와${"" | "/" | ","}과` | `이${"" | "/" | ","}가` | `을${"" | "/" | ","}를` |
  `으${"" | "/" | ","}로` | `은${"" | "/" | ","}는` | `야${"" | "/" | ","}아` |
  `이${"나" | "란" | "든가" | "든지" | "나마" | "네"}`;

declare interface Josa {
  josa: (target: string, postposition: JosaTypes, option?: { preserve: boolean }) => string;
}

export type SyllableTypes = `${"초" | "중" | "종"}성` | "모두" | `${"cho" | "jung" | "jong"}${"seong" | ""}` | "all";

export interface SyllableOptions {
  syllable?: SyllableTypes;
  includeOtherLng?: boolean;
  removeSpace?: boolean;
};

declare interface HasJongSeong {
  hasJongSeong: (str: string) => boolean;
  hasJongSeong: (str: string, option?: { toArray: true }) => boolean[];
}

declare interface GetSyllable {
  getSyllable: (str: string, option?: SyllableOptions) => string[][];
  getSyllable: (str: string, option?: SyllableOptions & { toSeparateArray: true }) => string[];
}

export interface HangulOptions {
  removeSpace?: boolean;
}

declare interface IsHangul {
  isHangul: (str: string, option?: HangulOptions) => boolean;
  isHangul: (str: string, option?: HangulOptions & { percent: true }) => number;
  isHangul: (str: string, option?: HangulOptions & { toArray: true }) => boolean[];
}

declare interface IsCombined {
  isCombined: (str: string, option?: HangulOptions) => boolean;
  isCombined: (str: string, option?: HangulOptions & { percent: true }) => number;
  isCombined: (str: string, option?: HangulOptions & { toArray: true }) => boolean[];
}

declare interface IsChoAble {
  isChoAble: (str: string) => boolean;
  isChoAble: (str: string, option: { toArray: true }) => boolean[];
}

declare interface IsJongAble {
  isJongAble: (str: string) => boolean;
  isJongAble: (str: string, option: { toArray: true }) => boolean[];
}

export interface KoreanNumberOptions {
  markOne?: boolean;
  numeral?: boolean;
  removeSpace?: boolean;
}

declare interface GetKoreanNumber {
  getKoreanNumber: (num: number, option?: HangulOptions) => string[];
  getKoreanNumber: (num: number, option?: HangulOptions & { toString: true }) => string;
}

declare const josa: Josa;
declare const hasJongSeong: HasJongSeong;
declare const getSyllable: GetSyllable;
declare const isChoAble: IsChoAble;
declare const isJongAble: IsJongAble;
declare const isHangul: IsHangul;
declare const isCombined: IsCombined;
declare const getKoreanNumber: GetKoreanNumber;

export default {
  josa,
  hasJongSeong,
  getSyllable,
  isChoAble,
  isJongAble,
  isHangul,
  isCombined,
  getKoreanNumber,
};