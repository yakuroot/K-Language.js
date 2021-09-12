export type JosaTypes =
  `와${"" | "/" | ","}과` | `이${"" | "/" | ","}가` | `을${"" | "/" | ","}를` |
  `으${"" | "/" | ","}로` | `은${"" | "/" | ","}는` | `야${"" | "/" | ","}아` |
  `이${"나" | "란" | "든가" | "든지" | "나마" | "네"}`;

export type SyllableTypes = `${"초" | "중" | "종"}성` | "모두" | `${"cho" | "jung" | "jong"}${"seong" | ""}` | "all";

export interface SyllableOptions {
  syllable?: SyllableTypes;
  includeOtherLng?: boolean;
  removeSpace?: boolean;
}

export interface AssemblesOptions {
  includeOtherLng?: boolean;
}

export interface HangulOptions {
  onlyCombined?: boolean;
  removeSpace?: boolean;
}

export interface KoreanNumberOptions {
  markOne?: boolean;
  numeral?: boolean;
  removeSpace?: boolean;
}

declare interface K_Lng {
  josa(target: string, postposition: JosaTypes, options?: { preserve: boolean }): string;

  hasJongSeong(str: string): boolean;
  hasJongSeong(str: string, options?: { toArray: true }): boolean[];

  getSyllable(str: string, options?: SyllableOptions): string[][];
  getSyllable(str: string, options?: SyllableOptions & { toSeparateArray: true }): string[];

  getAssembles(str: string[], options?: AssemblesOptions): string[];
  getAssembles(str: string[], options?: AssemblesOptions & { toString: true }): string;

  search(str: string, criteria: string): boolean;
  searchIndex(str: string, criteria: string): number[][];

  isHangul(str: string, options?: HangulOptions): boolean;
  isHangul(str: string, options?: HangulOptions & { percent: true }): number;
  isHangul(str: string, options?: HangulOptions & { toArray: true }): boolean[];

  isChoAble(str: string): boolean;
  isChoAble(str: string, options: { toArray: true }): boolean[];

  isJungAble(str: string): boolean;
  isJungAble(str: string, options: { toArray: true }): boolean[];

  isJongAble(str: string): boolean;
  isJongAble(str: string, options: { toArray: true }): boolean[];

  isConsonant(str: string): boolean;
  isConsonant(str: string, options: { percent: true }): number;
  isConsonant(str: string, options: { toArray: true }): boolean[];

  isVowel(str: string): boolean;
  isVowel(str: string, options: { percent: true }): number;
  isVowel(str: string, options: { toArray: true }): boolean[];

  getKoreanNumber(num: number, options?: KoreanNumberOptions): string[];
  getKoreanNumber(num: number, options?: KoreanNumberOptions & { toString: true }): string;
}


declare const klng: K_Lng;

declare module 'k-language.js' {
  export = klng;
}