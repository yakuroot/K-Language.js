module.exports = {
  hasJongSeong: function(str, option) {
    if (
      option !== undefined &&
      option.toArray
    )
      return str.split("").map(function(s) {
        return (s.charCodeAt(0) - 0xAC00) % 28 > 0;
      });
  
    return (str.charCodeAt(str.length - 1) - 0xAC00) % 28 > 0;
  },

  getSyllable: function(str, option) {
    var result = [];
  
    var cho = [
      "ㄱ", "ㄲ", "ㄴ", "ㄷ", "ㄸ",
      "ㄹ", "ㅁ", "ㅂ", "ㅃ", "ㅅ",
      "ㅆ", "ㅇ", "ㅈ", "ㅉ", "ㅊ",
      "ㅋ", "ㅌ", "ㅍ", "ㅎ",
    ];
  
    var jung = [
      "ㅏ", "ㅐ", "ㅑ", "ㅒ", "ㅓ",
      "ㅔ", "ㅕ", "ㅖ", "ㅗ", "ㅘ",
      "ㅙ", "ㅚ", "ㅛ", "ㅜ", "ㅝ",
      "ㅞ", "ㅟ", "ㅠ", "ㅡ", "ㅢ",
      "ㅣ",
    ];
  
    var jong = [
      " ", "ㄱ", "ㄲ", "ㄳ", "ㄴ",
      "ㄵ", "ㄶ", "ㄷ", "ㄹ", "ㄺ",
      "ㄻ", "ㄼ", "ㄽ", "ㄾ", "ㄿ",
      "ㅀ", "ㅁ", "ㅂ", "ㅄ", "ㅅ",
      "ㅆ", "ㅇ", "ㅈ", "ㅊ", "ㅋ",
      "ㅌ", "ㅍ", "ㅎ",
    ];
  
    for (var i = 0; i < str.length; i++) {
      var uniChar = str.charCodeAt(i);
  
      if (
        uniChar < 0xAC00 ||
        uniChar > 0xD7A3
      ) {
        if (
          option !== undefined &&
          option.includeOtherLng
        )
          result.push([str[i]]);
        continue;
      }
  
      var choIndex = Math.floor((uniChar - 0xAC00) / (21 * 28));
  
      if (
        option !== undefined &&
        ["초성", "cho", "choseong"].includes(option.syllable)
      ) {
        result.push([cho[choIndex]]);
        continue;
      }
  
      var jungIndex = Math.floor(((uniChar - 0xAC00) % (21 * 28)) / 28);
  
      if (
        option !== undefined &&
        ["중성", "jung", "jungseong"].includes(option.syllable)
      ) {
        result.push([jung[jungIndex]]);
        continue;
      }
  
      var jongIndex = (uniChar - 0xAC00) % 28;
  
      if (
        option !== undefined &&
        ["종성", "jong", "jongseong"].includes(option.syllable) &&
        jongIndex >= 1
      ) {
        result.push([jong[jongIndex]]);
        continue;
      }
  
      result.push(
        (jongIndex < 1)
          ? [cho[choIndex], jung[jungIndex]]
          : [cho[choIndex], jung[jungIndex], jong[jongIndex]]
      );
    }
  
    if (
      option !== undefined &&
      option.toSeparateArray
    )
      return result.reduce(function(acc, val) {
        return acc.concat(val);
      }, []);
    return result;
  },
}