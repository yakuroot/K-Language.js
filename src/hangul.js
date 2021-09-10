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

  isCombined: function (str, option) {
    if (
      option !== undefined &&
      option.removeSpace
    )
      str = str.replace(/(\s*)/g, "");

    var result = [];

    for (var i = 0; i < str.length; i ++) {
      var uniChar = str.charCodeAt(i);

      result.push(
        uniChar >= 0xAC00 &&
        uniChar <= 0xD7A3
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
}