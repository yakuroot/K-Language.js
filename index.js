const { josa } = require("./src/josa");
const {
  hasJongSeong,
  getSyllable,
  isChoAble,
  isJongAble,
} = require("./src/syllable");
const {
  isHangul,
  search,
  searchIndex,
} = require("./src/hangul");
const { getKoreanNumber } = require("./src/number");

module.exports = {
  josa,
  hasJongSeong,
  getSyllable,
  isChoAble,
  isJongAble,
  isHangul,
  search,
  searchIndex,
  getKoreanNumber,
};