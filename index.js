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

module.exports = {
  josa,
  hasJongSeong,
  getSyllable,
  isChoAble,
  isJongAble,
  isHangul,
  isCombined,
};