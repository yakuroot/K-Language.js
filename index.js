const { josa } = require("./src/josa");
const {
  hasJongSeong,
  getSyllable,
  getAssembles,
} = require("./src/syllable");
const {
  isHangul,
  isChoAble,
  isJungAble,
  isJongAble,
  isConsonant,
  isVowel,
} = require("./src/hangul");
const {
  search,
  searchIndex,
} = require("./src/search");
const { getKoreanNumber } = require("./src/number");


if (typeof define === "function" && define.amd) {
  define(function () {
    return {
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
  });
} else if (typeof module !== undefined) {
  module.exports = {
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
} else {
  window.klng = {
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
}