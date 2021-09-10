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
}