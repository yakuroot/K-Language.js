const { josa } = require("./src/josa");
const {
  hasJongSeong,
  getSyllable,
  isChoAble,
  isJongAble,
} = require("./src/syllable");
const {
  isHangul,
  isCombined,
} = require("./src/hangul");
const { getKoreanNumber } = require("./src/number");

module.exports = {
  josa,
  hasJongSeong,
  getSyllable,
  isChoAble,
  isJongAble,
  isHangul,
  isCombined,
  getKoreanNumber,
};