const { hasJongSeong } = require("./syllable");

module.exports = {
  josa: function (str, postposition, options) {
    var replacedPostposition = postposition
      .replace("/", "")
      .replace(",", "");
  
    var postpositions = [
      replacedPostposition,
      `${replacedPostposition[1]}${replacedPostposition[0]}`,
      postposition,
    ];
  
    var postpositionOption = (function (postpositions) {
      // first: 받침 없을 때
      if (postpositions.includes("와과"))
        return { first: "와", second: "과" };
  
      if (postpositions.includes("이가"))
        return { first: "가", second: "이" };
  
      if (postpositions.includes("을를"))
        return { first: "를", second: "을" };
  
      if (postpositions.includes("으로"))
        return { first: "로", second: "으로" };
  
      if (postpositions.includes("은는"))
        return { first: "는", second: "은" };
  
      if (postposition.includes("야아"))
        return { first: "야", second: "아" };
  
      if (
        [
          "이나", "이란", "이든가", "이든지", "이나마", "이네",
          "나", "란", "든가", "든지", "나마", "네"
        ]
          .includes(postpositions)
      )
        return {
          first: postposition.replace("이", ""),
          second: `이${postposition.replace("이", "")}`,
        };
  
      return {
        first: replacedPostposition,
        second: replacedPostposition,
      };
    })(postpositions);
  
    return hasJongSeong(str)
      ? (
        options !== undefined &&
        options.preserve
      )
        ? `${str}${postpositionOption.second}`
        : postpositionOption.second
      : (
        options !== undefined &&
        options.preserve
      )
        ? `${str}${postpositionOption.first}`
        : postpositionOption.first;
  },
};