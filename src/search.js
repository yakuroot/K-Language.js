const { getSyllable } = require("./syllable");

module.exports = {
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
};