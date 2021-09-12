module.exports = {
  isHangul: function (str, options) {
    if (
      options !== undefined &&
      options.removeSpace
    )
      str = str.replace(/(\s*)/g, "");
      
    var result = [];

    for (var i = 0; i < str.length; i++) {
      var uniChar = str.charCodeAt(i);

      if (
        options !== undefined &&
        options.onlyCombined
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
      options !== undefined &&
      options.percent
    )
      return (result.filter((r) => r).length / str.length) * 100;
    
    if (
      options !== undefined &&
      options.toArray
    )
      return result;

    return result.filter((r) => r).length === str.length;
  },

  isChoAble: function (str, options) {
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
      options !== undefined &&
      options.toArray
    )
      return result;

    return result.filter((r) => r).length === str.length;
  },

  isJungAble: function (str, options) {
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
      options !== undefined &&
      options.toArray
    )
      return result;

    return result.filter((r) => r).length === str.length;
  },

  isJongAble: function (str, options) {
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
      options !== undefined &&
      options.toArray
    )
      return result;

    return result.filter((r) => r).length === str.length;
  },

  isConsonant: function (str, options) {
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
      options !== undefined &&
      options.percent
    )
      return (result.filter((r) => r).length / str.length) * 100;
    
    if (
      options !== undefined &&
      options.toArray
    )
      return result;

    return result.filter((r) => r).length === str.length;
  },

  isVowel: function (str, options) {
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
      options !== undefined &&
      options.percent
    )
      return (result.filter((r) => r).length / str.length) * 100;
    
    if (
      options !== undefined &&
      options.toArray
    )
      return result;

    return result.filter((r) => r).length === str.length;
  },
}