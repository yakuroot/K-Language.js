module.exports = {
  getKoreanNumber: function (num, options) {
    var slicedNumbers = [];

    var digits;

    for (digits = 4; digits >= 0; digits--)
      if (num / Math.pow(10, digits * 4) < 1)
        continue;
      else
        break;

    for (var i = digits; i >= 0; i--) {
      var _num = num;
      for (var j = digits; j > i; j--)
        _num -= (Math.pow(10, j * 4) * Math.floor(_num / Math.pow(10, j * 4)));
      _num = Math.floor(_num / Math.pow(10, i * 4));
      slicedNumbers.push(_num);
    }

    var result = [];

    for (var i = 0; i < slicedNumbers.length; i++) {
      var _num = slicedNumbers[i];
      console.log(slicedNumbers[i])

      var thousand = Math.floor(_num / 1000);

      var hundred = Math.floor((_num - (thousand * 1000)) / 100);

      var ten = Math.floor((_num - (thousand * 1000) - (hundred * 100)) / 10);

      var one = Math.floor(_num - (thousand * 1000) - (hundred * 100) - (ten * 10));

      console.log(thousand,
        hundred,
        ten,
        one);

      result.push(
        [
          thousand,
          hundred,
          ten,
          one,
        ]
          .map(function (n, index) {
            if (n <= 0) return "";

            var digitsName = (index === 0) ? "천" : (index === 1) ? "백" : (index === 2) ? "십" : "";

            if (n === 1 && index < 2) {
              if (
                options !== undefined &&
                options.markOne
              )
                return `일${digitsName}`;
              else
                return digitsName;
            }

            if (
              index === 2 &&
              options !== undefined &&
              options.numeral &&
              i === slicedNumbers.length - 1
            )
              return getUnderHundred(n);

            return (
              n === 1 &&
              (
                index !== 3 ||
                (
                  thousand <= 0 &&
                  hundred <= 0 &&
                  ten <= 0 &&
                  slicedNumbers.length !== 1 &&
                  slicedNumbers.length - 1 - i < 2
                )
              )
            )
              ? digitsName
              : `${getUnderTen(n, (index >= 2 && i === slicedNumbers.length - 1))}${digitsName}`;
          })
          .filter(function (n) { return n.length > 0 })
          .join(" ")
      );
    }

    function getUnderTen(num, toKorean) {
      if (
        options !== undefined &&
        options.numeral &&
        toKorean
      ) {
        if (num === 0) return "영";
        if (num === 1) return "하나";
        if (num === 2) return "둘";
        if (num === 3) return "셋";
        if (num === 4) return "넷";
        if (num === 5) return "다섯";
        if (num === 6) return "여섯";
        if (num === 7) return "일곱";
        if (num === 8) return "여덟";
        if (num === 9) return "아홉";
        return "";
      }

      if (num === 0) return "영";
      if (num === 1) return "일";
      if (num === 2) return "이";
      if (num === 3) return "삼";
      if (num === 4) return "사";
      if (num === 5) return "오";
      if (num === 6) return "육";
      if (num === 7) return "칠";
      if (num === 8) return "팔";
      if (num === 9) return "구";
      return "";
    }

    function getUnderHundred(num) {
      if (num === 1) return "열";
      if (num === 2) return "스물";
      if (num === 3) return "서른";
      if (num === 4) return "마흔";
      if (num === 5) return "쉰";
      if (num === 6) return "예순";
      if (num === 7) return "일흔";
      if (num === 8) return "여든";
      if (num === 9) return "아흔";
      return "";
    }

    for (var i = 0; i < result.length; i++) {
      result[i] += (slicedNumbers.length - 1 - i === 1)
        ? "만"
        : (slicedNumbers.length - 1 - i === 2)
          ? "억"
          : (slicedNumbers.length - 1 - i === 3)
            ? "조"
            : (slicedNumbers.length - 1 - i === 4)
              ? "경"
              : "";
    }

    if (
      options !== undefined &&
      options.removeSpace
    )
      result = result.map(function (str) { return str.replace(/(\s*)/g, ""); })

    if (
      options !== undefined &&
      options.toString
    )
      return result.join((options.removeSpace) ? "" : " ");

    return result;
  },

}