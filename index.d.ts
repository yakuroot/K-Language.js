export type JosaTypes =
  `와${"" | "/" | ","}과` | `이${"" | "/" | ","}가` | `을${"" | "/" | ","}를` |
  `으${"" | "/" | ","}로` | `은${"" | "/" | ","}는` | `야${"" | "/" | ","}아` |
  `이${"나" | "란" | "든가" | "든지" | "나마" | "네"}`;

declare interface Josa {
  josa: (target: string, postposition: JosaTypes, options?: { preserve: boolean }) => string;
}

export type SyllableTypes = `${"초" | "중" | "종"}성` | "모두" | `${"cho" | "jung" | "jong"}${"seong" | ""}` | "all";

export interface SyllableOptions {
  syllable?: SyllableTypes;
  includeOtherLng?: boolean;
  removeSpace?: boolean;
};

declare interface HasJongSeong {
  hasJongSeong: (str: string) => boolean;
  hasJongSeong: (str: string, options?: { toArray: true }) => boolean[];
}

declare interface GetSyllable {
  getSyllable: (str: string, options?: SyllableOptions) => string[][];
  getSyllable: (str: string, options?: SyllableOptions & { toSeparateArray: true }) => string[];
}

export interface AssemblesOptions {
  includeOtherLng?: boolean;
}

declare interface GetAssembles {
  getAssembles: (str: string[], options?: AssemblesOptions) => string[];
  getAssembles: (str: string[], options?: AssemblesOptions & { toString: true }) => string;
}

export interface HangulOptions {
  onlyCombined?: boolean;
  removeSpace?: boolean;
}

declare interface IsHangul {
  isHangul: (str: string, options?: HangulOptions) => boolean;
  isHangul: (str: string, options?: HangulOptions & { percent: true }) => number;
  isHangul: (str: string, options?: HangulOptions & { toArray: true }) => boolean[];
}

declare interface IsChoAble {
  isChoAble: (str: string) => boolean;
  isChoAble: (str: string, options: { toArray: true }) => boolean[];
}

declare interface IsJungAble {
  isJungAble: (str: string) => boolean;
  isJungAble: (str: string, options: { toArray: true }) => boolean[];
}

declare interface IsJongAble {
  isJongAble: (str: string) => boolean;
  isJongAble: (str: string, options: { toArray: true }) => boolean[];
}

declare interface IsConsonant {
  isConsonant: (str: string) => boolean;
  isConsonant: (str: string, options: { percent: true }) => number;
  isConsonant: (str: string, options: { toArray: true }) => boolean[];
}

declare interface IsVowel {
  isConsonant: (str: string) => boolean;
  isConsonant: (str: string, options: { percent: true }) => number;
  isConsonant: (str: string, options: { toArray: true }) => boolean[];
}

export interface KoreanNumberOptions {
  markOne?: boolean;
  numeral?: boolean;
  removeSpace?: boolean;
}

declare interface GetKoreanNumber {
  getKoreanNumber: (num: number, options?: HangulOptions) => string[];
  getKoreanNumber: (num: number, options?: HangulOptions & { toString: true }) => string;
}

declare const josa: Josa;
declare const hasJongSeong: HasJongSeong;
declare const getSyllable: GetSyllable;
declare const getAssembles: GetAssembles;

declare const isHangul: IsHangul;
declare const search: (str: string, criteria: string) => boolean;
declare const searchIndex: (str: string, criteria: string) => number[][];

declare const isChoAble: IsChoAble;
declare const isJungAble: IsJungAble;
declare const isJongAble: IsJongAble;

declare const isConsonant: IsConsonant;
declare const isVowel: IsVowel;

declare const getKoreanNumber: GetKoreanNumber;



export default {
  josa,

  hasJongSeong,
  getSyllable,
  getAssembles,

  isHangul,
  search,
  searchIndex,

  isChoAble,
  isJungAble,
  isJongAble,

  isConsonant,
  isVowel,

  getKoreanNumber,
};