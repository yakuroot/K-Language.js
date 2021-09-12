const { getSyllable } = require("./syllable");

module.exports = {
  isHangul: function (str, option) {
    if (
      option !== undefined &&
      option.removeSpace
    )
      str = str.replace(/(\s*)/g, "");
      
    var result = [];

    for (var i = 0; i < str.length; i++) {
      var uniChar = str.charCodeAt(i);

      if (
        option !== undefined &&
        option.onlyCombined
      )
        result.push(
          uniChar >= 0xAC00 &&
          uniChar <= 0xD7A3
        );
      else
        result.push(
          (
            uniChar >= 0x1100 &&
            uniChar <= 0x11FF
          ) ||
          (
            uniChar >= 0x3130 &&
            uniChar <= 0x318F
          ) ||
          (
            uniChar >= 0xAC00 &&
            uniChar <= 0xD7A3
          )
        );
    }

    if (
      option !== undefined &&
      option.percent
    )
      return (result.filter((r) => r).length / str.length) * 100;
    
    if (
      option !== undefined &&
      option.toArray
    )
      return result;

    return result.filter((r) => r).length === str.length;
  },

  search: function (str, criteria) {
    var separatedStr = getSyllable(str, { toSeparateArray: true, includeOtherLng: true });
    var separetedCriteria = getSyllable(criteria, { toSeparateArray: true, includeOtherLng: true });

    for (let i = 0; i < str.length; i++)
      if (separatedStr[i + separetedCriteria.length - 1]) {
        var _str = separatedStr.filter(function (_, index) { return index <= i + separetedCriteria.length - 1 && index >= i });
        if (
          _str.map(function(_, index) { return _str[index] === separetedCriteria[index] })
            .filter(function (r) { return !!r })
            .length === separetedCriteria.length
        )
          return true;
      }
    return false;
  },

  searchIndex: function (str, criteria) {
    var result = [];
    
    for (let i = 0; i < str.length; i++)
      if (str[i + criteria.length - 1]) {
        var _str = str.split("").filter(function (_, index) { return index <= i + criteria.length - 1 && index >= i });
        if (
          _str.map(function(_, index) { return _str[index] === criteria[index] })
            .filter(function (r) { return !!r })
            .length === criteria.length
        )
          result.push(criteria.split("").map(function (_, index) { return i + index }));
      }

    return result;
  },

  isChoAble: function (str, option) {
    var result = [];

    for (var i = 0; i < str.length; i++)
      result.push(
        [
          "ㄱ", "ㄲ", "ㄴ", "ㄷ", "ㄸ",
          "ㄹ", "ㅁ", "ㅂ", "ㅃ", "ㅅ",
          "ㅆ", "ㅇ", "ㅈ", "ㅉ", "ㅊ",
          "ㅋ", "ㅌ", "ㅍ", "ㅎ",
        ]
          .includes(str[i])
      );

    if (
      option !== undefined &&
      option.toArray
    )
      return result;

    return result.filter((r) => r).length === str.length;
  },

  isJungAble: function (str, option) {
    var result = [];

    for (var i = 0; i < str.length; i++)
      result.push(
        [
          "ㅏ", "ㅐ", "ㅑ", "ㅒ", "ㅓ",
          "ㅔ", "ㅕ", "ㅖ", "ㅗ", "ㅘ",
          "ㅙ", "ㅚ", "ㅛ", "ㅜ", "ㅝ",
          "ㅞ", "ㅟ", "ㅠ", "ㅡ", "ㅢ",
          "ㅣ",
        ]
          .includes(str[i])
      );

    if (
      option !== undefined &&
      option.toArray
    )
      return result;

    return result.filter((r) => r).length === str.length;
  },

  isJongAble: function (str, option) {
    var result = [];

    for (var i = 0; i < str.length; i++)
      result.push(
        [
          "ㄱ", "ㄲ", "ㄳ", "ㄴ",
          "ㄵ", "ㄶ", "ㄷ", "ㄹ", "ㄺ",
          "ㄻ", "ㄼ", "ㄽ", "ㄾ", "ㄿ",
          "ㅀ", "ㅁ", "ㅂ", "ㅄ", "ㅅ",
          "ㅆ", "ㅇ", "ㅈ", "ㅊ", "ㅋ",
          "ㅌ", "ㅍ", "ㅎ",
        ]
          .includes(str[i])
      );

    if (
      option !== undefined &&
      option.toArray
    )
      return result;

    return result.filter((r) => r).length === str.length;
  }
}