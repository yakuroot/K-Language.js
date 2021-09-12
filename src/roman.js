const { getSyllable } = require("./syllable");

module.exports = {
  toRomanLetters: function (str, option) {
    var separatedHangul = getSyllable(str, { includeOtherLng: true });

    var result = [];

    var hangulMatchs = {
      "ㄱ": "g/k",
      "ㄴ": "n",
      "ㄷ": "d/t",
      "ㄹ": "r/l",
      "ㅁ": "m",
      "ㅂ": "b/p",
      "ㅅ": "s",
      "ㅇ": "ng",
      "ㅈ": "j",
      "ㅊ": "ch",
      "ㅋ": "k",
      "ㅌ": "t",
      "ㅍ": "p",
      "ㅎ": "h",
      "ㄲ": "kk",
      "ㄸ": "tt",
      "ㅃ": "pp",
      "ㅆ": "ss",
      "ㅉ": "jj",
      "ㅏ": "a",
      "ㅑ": "ya",
      "ㅓ": "eo",
      "ㅕ": "yeo",
      "ㅗ": "o",
      "ㅛ": "yo",
      "ㅜ": "u",
      "ㅠ": "yu",
      "ㅡ": "eu",
      "ㅣ": "i",
      "ㅐ": "ae",
      "ㅒ": "yae",
      "ㅔ": "e",
      "ㅖ": "ye",
      "ㅚ": "oe",
      "ㅟ": "wi",
      "ㅢ": "ui",
      "ㅘ": "wa",
      "ㅝ": "wo",
      "ㅙ": "wae",
      "ㅞ": "we",
    };

    for (var i = 0; i < separatedHangul.length; i++) {
      var thisResult = [];

      if (separatedHangul[i].length === 1) {
        result.push([separatedHangul[i][0]]);
        continue;
      }

      for (var j = 0; j < separatedHangul[i].length; j++) {
        if (separatedHangul[i][j] === "ㅇ" && j === 0)
          continue;

        var romanHangul = hangulMatchs[separatedHangul[i][j]].split("/");

        if (
          j === 2 &&
          ["ㄱ", "ㄷ", "ㄹ", "ㅂ"].includes(separatedHangul[i][j])
        ) {
          thisResult.push(romanHangul[1]);
          continue;
        }

        if (
          j === 0 &&
          separatedHangul[i][j] === "ㄹ" &&
          separatedHangul[i - 1][2] === "ㄹ"
        ) {
          thisResult.push(romanHangul[1]);
          continue;
        }


      }
    }
  }
}