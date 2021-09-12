var {
  isHangul,
  isChoAble,
  isJungAble,
  isJongAble,
} = require("./hangul");

module.exports = {
  hasJongSeong: function(str, options) {
    if (
      options !== undefined &&
      options.toArray
    )
      return str.split("").map(function(s) {
        return (s.charCodeAt(0) - 0xAC00) % 28 > 0;
      });
  
    return (str.charCodeAt(str.length - 1) - 0xAC00) % 28 > 0;
  },

  getSyllable: function(str, options) {
    if (
      options !== undefined &&
      options.removeSpace
    )
      str = str.replace(/(\s*)/g, "");

    var result = [];

    var CHO_SEONG = [
      "ㄱ", ["ㄱ", "ㄱ"], "ㄴ", "ㄷ", ["ㄷ", "ㄷ"],
      "ㄹ", "ㅁ", "ㅂ", ["ㅂ", "ㅂ"], "ㅅ",
      ["ㅅ", "ㅅ"], "ㅇ", "ㅈ", ["ㅈ", "ㅈ"], "ㅊ",
      "ㅋ", "ㅌ", "ㅍ", "ㅎ",
    ];
  
    var JUNG_SEONG = [
      "ㅏ", "ㅐ", "ㅑ", "ㅒ", "ㅓ",
      "ㅔ", "ㅕ", "ㅖ", "ㅗ", ["ㅗ", "ㅏ"],
      ["ㅗ", "ㅐ"], ["ㅗ", "ㅣ"], "ㅛ", "ㅜ", ["ㅜ", "ㅓ"],
      ["ㅜ", "ㅔ"], ["ㅜ", "ㅣ"], "ㅠ", "ㅡ", ["ㅡ", "ㅣ"],
      "ㅣ",
    ];
  
    var JONG_SEONG = [
      "", "ㄱ", ["ㄱ", "ㄱ"], ["ㄱ", "ㅅ"], "ㄴ",
      ["ㄴ", "ㅈ"], ["ㄴ", "ㅎ"], "ㄷ", "ㄹ", ["ㄹ", "ㄱ"],
      ["ㄹ", "ㅁ"], ["ㄹ", "ㅂ"], ["ㄹ", "ㅅ"], ["ㄹ", "ㅌ"], ["ㄹ", "ㅍ"],
      ["ㄹ", "ㅎ"], "ㅁ", "ㅂ", ["ㅂ", "ㅅ"], "ㅅ",
      ["ㅅ", "ㅅ"], "ㅇ", "ㅈ", "ㅊ", "ㅋ",
      "ㅌ", "ㅍ", "ㅎ",
    ];
  
    for (var i = 0; i < str.length; i++) {
      var uniChar = str.charCodeAt(i);
  
      if (
        uniChar < 0xAC00 ||
        uniChar > 0xD7A3
      ) {
        if (
          options !== undefined &&
          options.includeOtherLng
        )
          result.push([str[i]]);
        continue;
      }
  
      var choIndex = Math.floor((uniChar - 0xAC00) / (21 * 28));
  
      if (
        options !== undefined &&
        ["초성", "cho", "choseong"].includes(options.syllable)
      ) {
        result.push(
          (Array.isArray(CHO_SEONG[choIndex]))
            ? [...CHO_SEONG[choIndex]]
            : [CHO_SEONG[choIndex]]
        );
        continue;
      }
  
      var jungIndex = Math.floor(((uniChar - 0xAC00) % (21 * 28)) / 28);
  
      if (
        options !== undefined &&
        ["중성", "jung", "jungseong"].includes(options.syllable)
      ) {
        result.push(
          (Array.isArray(JUNG_SEONG[jungIndex]))
            ? [...JUNG_SEONG[jungIndex]]
            : [JUNG_SEONG[jungIndex]]
        );
        continue;
      }
  
      var jongIndex = (uniChar - 0xAC00) % 28;
  
      if (
        options !== undefined &&
        ["종성", "jong", "jongseong"].includes(options.syllable) &&
        jongIndex >= 1
      ) {
        result.push(
          (Array.isArray(JONG_SEONG[jongIndex]))
            ? [...JONG_SEONG[jongIndex]]
            : [JONG_SEONG[jongIndex]]
        );
        continue;
      }
  
      result.push(
        (jongIndex < 1)
          ? [
            (Array.isArray(CHO_SEONG[choIndex]))
              ? [...CHO_SEONG[choIndex]]
              : CHO_SEONG[choIndex],
            (Array.isArray(JUNG_SEONG[jungIndex]))
              ? [...JUNG_SEONG[jungIndex]]
              : JUNG_SEONG[jungIndex],
          ]
            .reduce(function(acc, val) {
              return acc.concat(val);
            }, [])
          : [
            (Array.isArray(CHO_SEONG[choIndex]))
              ? [...CHO_SEONG[choIndex]]
              : CHO_SEONG[choIndex],
            (Array.isArray(JUNG_SEONG[jungIndex]))
              ? [...JUNG_SEONG[jungIndex]]
              : JUNG_SEONG[jungIndex],
            (Array.isArray(JONG_SEONG[jongIndex]))
              ? [...JONG_SEONG[jongIndex]]
              : JONG_SEONG[jongIndex],
          ]
            .reduce(function(acc, val) {
              return acc.concat(val);
            }, [])
      );
    }
  
    if (
      options !== undefined &&
      options.toSeparateArray
    )
      return result.reduce(function(acc, val) {
        return acc.concat(val);
      }, []);
    return result;
  },

  getAssembles: function (str, options) {
    if (!Array.isArray(str))
      throw new Error("getCombined()의 첫 번째 매개변수는 string[]　형식이어야 합니다.");

    var result = [];

    var complexHangul = [
      { type: "cho", first: "ㄱ", second: "ㄱ", result: "ㄲ" },
      { type: "cho", first: "ㄷ", second: "ㄷ", result: "ㄸ" },
      { type: "cho", first: "ㅂ", second: "ㅂ", result: "ㅃ" },
      { type: "cho", first: "ㅅ", second: "ㅅ", result: "ㅆ" },
      { type: "cho", first: "ㅈ", second: "ㅈ", result: "ㅉ" },
      { type: "jung", first: "ㅗ", second: "ㅏ", result: "ㅘ" },
      { type: "jung", first: "ㅗ", second: "ㅐ", result: "ㅙ" },
      { type: "jung", first: "ㅗ", second: "ㅣ", result: "ㅚ" },
      { type: "jung", first: "ㅜ", second: "ㅓ", result: "ㅝ" },
      { type: "jung", first: "ㅜ", second: "ㅔ", result: "ㅞ" },
      { type: "jung", first: "ㅜ", second: "ㅣ", result: "ㅟ" },
      { type: "jung", first: "ㅡ", second: "ㅣ", result: "ㅢ" },
      { type: "jong", first: "ㄱ", second: "ㄱ", result: "ㄲ" },
      { type: "jong", first: "ㄱ", second: "ㅅ", result: "ㄳ" },
      { type: "jong", first: "ㄴ", second: "ㅈ", result: "ㄵ" },
      { type: "jong", first: "ㄴ", second: "ㅎ", result: "ㄶ" },
      { type: "jong", first: "ㄹ", second: "ㄱ", result: "ㄺ" },
      { type: "jong", first: "ㄹ", second: "ㅁ", result: "ㄻ" },
      { type: "jong", first: "ㄹ", second: "ㅂ", result: "ㄼ" },
      { type: "jong", first: "ㄹ", second: "ㅅ", result: "ㄽ" },
      { type: "jong", first: "ㄹ", second: "ㅌ", result: "ㄾ" },
      { type: "jong", first: "ㄹ", second: "ㅍ", result: "ㄿ" },
      { type: "jong", first: "ㄹ", second: "ㅎ", result: "ㅀ" },
      { type: "jong", first: "ㅂ", second: "ㅅ", result: "ㅄ" },
      { type: "jong", first: "ㅅ", second: "ㅅ", result: "ㅆ" },
    ];

    var i;

    for (i = 0; i < str.length; i++) {
      if (str[i] === " ") {
        result.push(str[i]);
        continue;
      }

      var uniChar = str[i].charCodeAt(0);

      if (
        !(
          (
            uniChar >= 0x1100 &&
            uniChar <= 0x11FF
          ) ||
          (
            uniChar >= 0x3130 &&
            uniChar <= 0x318F
          )
        )
      ) {
        if (
          options !== undefined &&
          options.includeOtherLng
        )
          result.push(str[i]);
        continue;
      }

      function _getCombine(char) {
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
          null, "ㄱ", "ㄲ", "ㄳ", "ㄴ",
          "ㄵ", "ㄶ", "ㄷ", "ㄹ", "ㄺ",
          "ㄻ", "ㄼ", "ㄽ", "ㄾ", "ㄿ",
          "ㅀ", "ㅁ", "ㅂ", "ㅄ", "ㅅ",
          "ㅆ", "ㅇ", "ㅈ", "ㅊ", "ㅋ",
          "ㅌ", "ㅍ", "ㅎ",
        ];

        var choIndex = cho.findIndex(function(c) {
          return c === char[0];
        });

        var jungIndex = jung.findIndex(function(c) {
          return c === char[1];
        });

        var jongIndex = (char[2])
          ? jong.findIndex(function(c) {
            return c === char[2];
          })
          : 0;

        return String.fromCharCode(((choIndex * 21 * 28) + (jungIndex * 28) + jongIndex) + 0xAC00);
      }

      function _findSyllable(index, type) {
        function _isAble(s) {
          return (type === "cho")
            ? isChoAble(s)
            : (type === "jung")
              ? isJungAble(s)
              : isJongAble(s);
        }

        if (
          (
            type === "jung" ||
            type === "jong"
          ) &&
          (
            (
              str[index + 1] &&
              str[index + 2] &&
              isChoAble(str[index + 1]) &&
              isJungAble(str[index + 2])
            ) ||
            (
              str[index + 1] &&
              str[index + 2] &&
              str[index + 3] &&
              ["ㄱ", "ㄷ", "ㅂ", "ㅅ", "ㅈ"].includes(str[index + 1]) &&
              str[index + 1] === str[index + 2] &&
              isChoAble(str[index + 1]) &&
              isChoAble(str[index + 2]) &&
              isJungAble(str[index + 3])
            )
          )
        ) {
          temp.push(str[index]);
          return index + 1;
        }

        if (
          type === "jong" &&
          isChoAble(str[index]) &&
          str[index + 1] &&
          isJungAble(str[index + 1])
        )
          return index;

        if (!_isAble(str[index])) {
          if (type === "cho") {
            temp.push(str[index]);
          }
          return -1;
        }

        if (!str[index + 1]) {
          if (!_isAble(str[index])) {
            temp.push(str[index]);
            return -1;
          }

          temp.push(str[index]);
          return index + 1;
        }

        if (!_isAble(str[index + 1])) {
          temp.push(str[index]);
          return index + 1;
        }

        var complex = complexHangul.find(function (h) {
          return (
            h.type === type &&
            h.first === str[index] &&
            h.second === str[index + 1]
          );
        });

        if (!complex) {
          temp.push(str[index]);
          return index + 1;
        }

        temp.push(complex.result);
        return index + 2;
      }

      var temp = [];

      var choIndex = _findSyllable(i, "cho");

      if (choIndex === -1) {
        result.push(...temp);
        continue;
      }

      if (choIndex >= str.length) {
        result.push(...temp);
        break;
      }

      var jungIndex = _findSyllable(choIndex, "jung");

      if (jungIndex === -1) {
        result.push(...temp);
        i += choIndex - i - 1;
        continue;
      }

      if (jungIndex >= str.length) {
        result.push(_getCombine([temp[0], temp[1]]));
        break;
      }

      var jongIndex = _findSyllable(jungIndex, "jong");

      if (jongIndex === -1) {
        result.push(_getCombine([temp[0], temp[1]]));
        i += jungIndex - i - 1;
      } else {
        var hanguls = temp.filter(function(s) { return isHangul(s) });
        result.push(_getCombine(hanguls));
        if (hanguls.length !== temp.length)
          result.push(temp[temp.length - 1]);
        i += jongIndex - i - 1;
      }

      continue;
    }
    if (
      options !== undefined &&
      options.toString
    )
      return result.join("");

    return result;
  },
}