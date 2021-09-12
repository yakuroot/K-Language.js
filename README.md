# K-Language.js
![KING-Sejong](/image/sejong.jpg)  
> 한글을 간편하게 다룰 수 있는 자바스크립트 / 타입스크립트 라이브러리.
---
## 사용법
### nodejs
```js
const klng = require("K-Language.js");
```
### TypeScript
```ts
import klng from "K-Language.js";
```
---
## josa
| 매개변수 명 	| 타입 	| 옵션 	| 설명 	|
|---	|---	|---	|---	|
| str 	| string 	| `-` 	| 가장 마지막 글자를 기준으로 조사를 반환하게 됩니다. 	|
| postposition 	| JosaTypes 	| `-` 	| 이 매개변수를 기준으로 조사를 반환합니다.  	|
| option 	| { preserve?: boolean } 	| `true` 	| `preserve`를 true로 해 놓은 경우, 위 `str`에 넘겨준 글자를 조사와 함께 반환합니다.<br>기본값은 `false`입니다. 	|
```ts
type JosaTypes = "와/과" | "을/를" | "이/가" | "으/로" | "은/는" | "아/야" | "이나" | "이란" | "이든가" | "이든지" | "이나마" | "이네";
```
### 조사만 반환하기
```js
let test = josa("스마트폰", "을/를");
console.log(test); // "을"
```
### 조사와 글자를 함께 반환하기
```js
let test = josa("스마트폰", "을/를", { preserve: true });
console.log(test) // "스마트폰을"
```
---
## isHangul
| 매개변수 명 	| 타입 	| 옵션 	| 설명 	|
|---	|---	|---	|---	|
| str 	| string 	| `-` 	| 기준이 될 글자를 넣어줍니다. 	|
| option 	| HangulOptions 	| `true` 	| 기본 값은 모두 `false`입니다.<br>`percent`: 한글이 차지하는 비율을 반환<br>`toArray`: 각 글자의 한글 여부를 판별하여 `boolean[]`으로 반환<br>`onlyCombined`: 조합된 한글만을 한글이라고 판별<br>`removeSpace`: 글자의 모든 공백을 제거한 뒤 판별 	|
```ts
interface HangulOptions {
  percent?: boolean;
  toArray?: boolean;
  onlyCombined?: boolean;
  removeSpace?: boolean;
}
```
### 글자가 모두 한글인지 판별하기
```js
let test1 = isHangul("세종대왕");
console.log(test1); // true

let test2 = isHangul("나는 철수");
console.log(test2); // false

let test3 = isHangul("나는Jane");
console.log(test2); // false
```
아무런 옵션을 주지 않으면, 매개변수로 넘겨준 **글자 전체가 한글인지 판별** 하여 값을 반환합니다.  
공백 또한 한글이 아니기에 `false`를 반환합니다.
### 공백을 제거하고 한글인지 판별하기
```js
let test = isHangul("나는 철수", { removeSpace: true });
console.log(test); // true
```
`removeSpace`를 `true`로 설정하면 모든 공백을 제거한 뒤 판별한 값을 반환합니다.
### 글자 중 한글인 글자의 비율 알아내기
```js
let test = isHangul("나는 Jane이라고 해.", { percent: true });
console.log(test); // 46.15384615384615
```
`percent`를 `true`로 설정하면 매개변수로 넘겨준 글자 중 한글인 글자의 비율을 반환합니다. `removeSpace`와 동시에 사용할 수 있습니다.
### 각 글자의 한글 여부 판별하기
```js
let test = isHangul("abc가나다", { toArray: true });
console.log(test); // [false, false, false, true, true, true]
```
`toArray`를 `true`로 설정하면 매개변수로 넘겨준 글자 모두를 판별하여 배열로 반환합니다. `removeSpace`와 동시에 사용할 수 있습니다.  
### 조합된 한글만 판별하기
```js
let test1 = isHangul("ㄱㄴㄷ");
console.log(test1); // true

let test2 = isHangul("ㄱㄴㄷ", { onlyCombined: true });
console.log(test2); // false
```
`onlyCombined`를 `true`로 설정하면 완전히 조합된 한글(가-힣)만을 판별하여 값을 반환합니다. 위 옵션들과 동시에 사용할 수 있습니다.  

---
## hasJongSeong
| 매개변수 명 	| 타입 	| 옵션 	| 설명 	|
|---	|---	|---	|---	|
| str 	| string 	| `-` 	| 매개변수로 주어진 글자를 기준으로 종성이 있는지 없는지 판단합니다. 	|
| option 	| { toArray?: boolean } 	| `true` 	| 기본 값은 `false`입니다.<br>`toArray`: 각 글자의 종성 여부를 판별하여 `boolean[]`으로 반환 	|
### 마지막 글자의 종성 여부 판별하기
```js
let test = hasJongSeong("배고파");
console.log(test); // false
```
아무런 옵션도 주어지지 않은 경우, 가장 마지막 글자의 종성 여부만을 판단합니다.  
### 모든 글자의 종성 여부 판별하기
```js
let test = hasJongSeong("피자먹어야징", { toArray: true });
console.log(test); // [false, false, true, false, false, true]
```
`toArray`를 `true`로 설정하면 매개변수로 넘겨준 글자 모두를 판별하여 배열로 반환합니다.

---
## getSyllable
| 매개변수 명 	| 타입 	| 옵션 	| 설명 	|
|---	|---	|---	|---	|
| str 	| string 	| `-` 	| 기준이 될 글자를 넣어줍니다. 	|
| option 	| SyllableOptions 	| `true` 	| `syllable`: `"초성"`을 택하는 경우 `str`에서 초성만을, `"중성"`을 택하는 경우 중성만을, `"종성"`을 택하는 경우 종성만을, `"모두"`를 택하는 경우 각 글자의 초・중・종성을 분리하여 반환 (기본 값 `"모두"`)<br>`toSeparateArray`: 모든 글자를 하나의 배열로 반환 (기본 값 `false`)<br>`includeOtherLng`: 한글이 아닌 글자도 반환 (기본 값 `false`)<br>`removeSpace`: 글자의 모든 공백을 제거한 뒤 값을 반환 (기본 값 `false`) 	|
```ts
interface SyllableOptions {
  syllable?: "초성" | "중성" | "종성" | "모두";
  toSeparateArray?: boolean;
  includeOtherLng?: boolean;
  removeSpace?: boolean;
}
```
### 초성만 가져오기
```js
let test = getSyllable("집가고싶다", { syllable: "초성", toSeparateArray: true });
console.log(test); // ["ㅈ", "ㄱ", "ㄱ", "ㅅ", "ㄷ"]
```
초성만 가져올 때 `toSeparateArray`를 `false`로 할 경우, 각 글자 별로 배열이 분리되어 `[["ㅈ"], ["ㄱ"], ["ㄱ"], ["ㅅ"], ["ㄷ"]]`와 같이 반환되니 주의하여야 합니다.
### 한글이 아닌 문자를 포함한 초성만 가져오기
```js
let test = getSyllable("abc가나다", { syllable: "초성", toSeparateArray: true, includeOtherLng: true });
console.log(test); // ["a", "b", "c", "ㄱ", "ㄴ", "ㄷ"]
```
`includeOtherLng`을 `true`로 한 경우, 한글이 아닌 모든 문자는 원본이 반환됩니다.  
### 띄어쓰기를 제외한 초성만 가져오기
```js
let test = getSyllable("일 안하고 놀고 싶다...", { syllable: "초성", toSeparateArray: true, includeOtherLng: true, removeSpace: true });
console.log(test); // ["ㅇ", "ㅇ", "ㅎ", "ㄱ", "ㄴ", "ㄱ", "ㅅ", "ㄷ", ".", ".", "."]
```
`removeSpace`를 `true`로 한 경우, 매개변수로 넘겨 준 모든 글자의 공백을 제거한 뒤 결과 값을 반환합니다.  
여기서 추가로 __공백은 한글이 아닙니다__. 즉, 모든 글자가 한글이거나 한글을 제외한 문자가 필요 없을 경우에는 `includeOtherLng`을 `false`로 하여 공백을 포함한 한글이 아닌 문자 모두를 제외시킬 수 있습니다.
### 모든 문자의 초・중・종성 가져오기
```js
// syllable의 기본 값은 "모두"라서, 모든 문자를 분리하는 경우 별도로 설정할 필요 없음
let test = getSyllable("종강하고 싶다");
console.log(test); // [["ㅈ", "ㅗ", "ㅇ"], ["ㄱ", "ㅏ", "ㅇ"], ["ㅎ", "ㅏ"], ["ㄱ", "ㅗ"], [" "], ["ㅅ", "ㅣ", "ㅍ"], ["ㄷ", "ㅏ"]]
```
여기서 `removeSpace`가 주어지지 않았기에 공백 또한 하나의 글자로 처리되어 별도의 배열로 존재하는 것을 보실 수 있습니다.  
```js
let test = getSyllable("종강하고 싶다", { removeSpace: true });
console.log(test); // [["ㅈ", "ㅗ", "ㅇ"], ["ㄱ", "ㅏ", "ㅇ"], ["ㅎ", "ㅏ"], ["ㄱ", "ㅗ"], ["ㅅ", "ㅣ", "ㅍ"], ["ㄷ", "ㅏ"]]
```
`removeSpace`를 `true`로 설정하면 공백을 제거한 뒤 결과 값이 반환됩니다.
```js
let test = getSyllable("종강하고 싶다", { toSeparateArray: true, removeSpace: true });
console.log(test); // ["ㅈ", "ㅗ", "ㅇ", "ㄱ", "ㅏ", "ㅇ", "ㅎ", "ㅏ", "ㄱ", "ㅗ", "ㅅ", "ㅣ", "ㅍ", "ㄷ", "ㅏ"]
```
`toSeparateArray`를 `true`로 설정하면 모든 글자가 하나의 배열로 합쳐져서 반환됩니다.

---
## getAssembles
| 매개변수 명 	| 타입 	| 옵션 	| 설명 	|
|---	|---	|---	|---	|
| str 	| string 	| `-` 	| 기준이 될 글자를 넣어줍니다. 	|
| option 	| AssemblesOptions 	| `true` 	| 기본 값은 모두 `false`입니다.<br>`includeOtherLng`: 한글이 아닌 글자도 반환<br>`toString`: `string` 형식으로 합쳐진 한글을 반환 	|
```ts
interface AssemblesOptions {
  toString?: boolean;
  includeOtherLng?: boolean;
}
```
### 나눠진 한글을 이어붙이기
```js
let test = getAssembles(["ㅈ", "ㅗ", "ㄹ", "ㄹ", "ㅕ"]);
console.log(test); // ["졸", "려"]
```
### 이어붙인 값을 문자열 형식으로 받기
```js
let test = getAssembles(["ㅂ", "ㅏ", "ㅂ", "ㅈ", "ㅜ", "ㅓ"], { toString: true });
console.log(test); // "밥줘"
```
### 주의점
`getSyllable()`과 반대되는 개념의 함수가 아닙니다.  
두벌식 키보드를 기준으로 하여 나눠진 한글을 이어붙이는 방식이므로 아래와 같이 작동합니다.
```js
let syllables = getSyllable("탖ㅏ", { toSeparateArray: true });
// ["ㅌ", "ㅏ", "ㅈ", "ㅏ"]

let assemble = getAssembles(syllables, { toString: true });
console.log(assemble); // "타자"
```

---
## search
| 매개변수 명 	| 타입 	| 옵션 	| 설명 	|
|---	|---	|---	|---	|
| str 	| string 	| `-` 	| 기준 값이 해당 매개 변수에 포함되는지 판별합니다. 	|
| criteria 	| string 	| `-` 	| 여기에 들어가는 값이 기준 값이 됩니다. 	|
### 특정 글자가 포함됐는지 확인하기
```js
let test1 = search("안녕하세요", "안녕");
console.log(test1); // true

let test2 = search("안녕하세요", "잘가");
console.log(test2); // false
```

---
## searchIndex
| 매개변수 명 	| 타입 	| 옵션 	| 설명 	|
|---	|---	|---	|---	|
| str 	| string 	| `-` 	| 기준 값이 해당 매개 변수에 포함되는지 판별합니다. 	|
| criteria 	| string 	| `-` 	| 여기에 들어가는 값이 기준 값이 됩니다. 	|
### search()와의 차이점
`search()`함수는 기준 값이 포함되는지의 여부만을 판별하여 참과 거짓으로 반환하지만, `searchIndex()`는 기준 값이 몇 번 인덱스에 포함되는지를 모두 반환합니다.  
특히, 글자를 강조하여 표시할 때 도움이 될 수 있을 것입니다.
### 기준 값의 인덱스 확인하기
```js
let test1 = search("안녕! 모두 안녕!", "안녕");
console.log(test1); // [[0, 1], [7, 8]]

let test2 = search("안녕! 모두 안녕!", "잘가");
console.log(test2); // []
```
기준 값이 포함되어 있지 않다면 빈 배열을 반환합니다.

---
## getKoreanNumber
| 매개변수 명 	| 타입 	| 옵션 	| 설명 	|
|---	|---	|---	|---	|
| num 	| number 	| `-` 	| 매개변수로 주어진 글자가 각각 초, 중, 종성이 가능한지 판별합니다. 	|
| option 	| KoreanNumberOptions 	| `true` 	| 기본 값은 모두 `false`입니다.<br>`markOne`: 일(1) 표기를 반영<br>`numeral`: 100 미만의 수는 한국식 서수로 반환<br>`removeSpace`: 결과 값의 공백을 모두 제거하여 반환<br>`toString`: 결과 값을 `string` 형식으로 반환 	|
```ts
interface KoreanNumberOptions {
  markOne?: boolean;
  numeral?: boolean;
  removeSpace?: boolean;
  toString: true
}
```
### 한국식 숫자 읽기 (기본)
```js
let test = getKoreanNumber(1234);
console.log(test); // ["천 이백 삼십 사"]
```
### 한국식 숫자 읽기 (한국 서수)
```js
let test = getKoreanNumber(1234, { numeral: true });
console.log(test); // ["천 이백 서른 넷"]
```
`numeral`을 `true`로 설정하면 100 미만의 수는 한국식 서수를 사용하여 값을 반환합니다.  
매개변수로 넘겨 준 숫자가 100 이상인 경우, 100을 초과하는 숫자는 한자식(일, 이, 삼...)으로 반환합니다.
### 일(1) 표기 반영하기
```js
let test1 = getKoreanNumber(1234, { markOne: true });
console.log(test1); // ["일천 이백 삼십 사"]

let test2 = getKoreanNumber(11111, { markOne: true });
console.log(test2); // ["일만 일천 일백 십 일"]
```
`markOne`을 `true`로 설정하면 일(1) 표기를 반영하여 값을 반환합니다.  
단, 십의 자리에서는 일(1) 표기가 반영되지 않습니다.
### 결과를 문자열 형식으로 받기
```js
let test = getKoreanNumber(1234, { toString: true });
console.log(test); // "천 이백 삼십 사"
```
`toString`을 `true`로 설정하면 결과 값을 문자열 형식으로 반환합니다.
### 결과를 문자열 형식 및 공백을 제거하여 받기
```js
let test = getKoreanNumber(1234, { removeSpace: true, toString: true });
console.log(test); // "천이백삼십사"
```
`removeSpace`를 `true`로 설정하면 결과 값에서 공백을 제거한 뒤 반환합니다.  
금액의 표기 등에 유용하게 쓰일 수 있습니다.

---
## isChoAble, isJungAble, isJongAble
각각 매개변수로 넘겨 준 글자의 초, 중, 종성 여부를 판별하는 함수입니다.  
| 매개변수 명 	| 타입 	| 옵션 	| 설명 	|
|---	|---	|---	|---	|
| str 	| string 	| `-` 	| 매개변수로 주어진 글자가 각각 초, 중, 종성이 가능한지 판별합니다. 	|
| option 	| { toArray?: boolean } 	| `true` 	| 기본 값은 `false`입니다.<br>`toArray`: 각 글자의 초, 중, 종성 가능 여부를 판별하여 `boolean[]`으로 반환 	|
### 초성이 가능한지 알아보기
```js
let test = isChoAble("ㄱ");
console.log(test); // true
```
### 모든 글자의 중성 가능 여부 알아보기
```js
let test = isJungAble("ㄱㅏㄴㅏㄷㅏ", { toArray: true });
console.log(test); // [false, true, false, true, false, true]
```

---
## isConsonant, isVowel
각각 매개변수로 넘겨 준 글자가 자음 또는 모음으로 쓰일 수 있는지 판별하는 함수입니다.
| 매개변수 명 	| 타입 	| 옵션 	| 설명 	|
|---	|---	|---	|---	|
| str 	| string 	| `-` 	| 매개변수로 주어진 글자가 각각 자음 또는 모음이 가능한 지 판별합니다. 	|
| option 	| { percent?: boolean, toArray?: boolean } 	| `true` 	| 기본 값은 모두 `false`입니다.<br>`percent`: 자음 또는 모음이 차지하는 비율을 반환<br>`toArray`: 각 글자의 자음 또는 모음 여부를 판별하여 `boolean[]`으로 반환 	|
```ts
interface CVOptions {
  percent?: boolean;
  toArray?: boolean;
}
```
### 자음 여부 판별
```js
let test = isConsonant("ㄱ");
console.log(test); // true
```
### 모음이 차지하는 비율 판별
```js
let test = isVowel("ㄱㅏㄴㅏㄷㅏ", { percent: true });
console.log(test); // 50
```