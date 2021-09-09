# K-Language.js
![KING-Sejong](/image/sejong.jpg)  
**K-Language.js**는 한글을 간편하게 다룰 수 있는 자바스크립트 / 타입스크립트 라이브러리입니다.  
  
자바스크립트에서 사용하기
```js
const klng = require("K-Language.js);
```
타입스크립트에서 사용하기 (d.ts 파일은 아직 작업 중에 있습니다)
```ts
import klng from "K-Language.js";
```
---
## josa
| 매개변수 명 	| 타입 	| 옵션 	| 설명 	|
|---	|---	|---	|---	|
| str 	| string 	| `-` 	| 가장 마지막 글자를 기준으로 조사를 반환하게 됩니다. 	|
| postposition 	| string 	| `-` 	| 이 매개변수를 기준으로 조사를 반환합니다. 여기에 쓰일 수 있는 값은 아래와 같습니다.<br>"와/과", "을/를", "이/가", "으/로", "은/는", "아/야", "이나", "이란", "이든가", "이든지", "이나마", "이네" 	|
| option 	| Object 	| `true` 	| { preserve: boolean } 과 같이 사용 가능합니다.<br>preserve를 true로 해 놓은 경우, 위 `str`에 넘겨준 글자를 조사와 함께 반환합니다.<br>기본값은 `false`입니다. 	|
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
## hasJongSeong
| 매개변수 명 	| 타입 	| 옵션 	| 설명 	|
|---	|---	|---	|---	|
| str 	| string 	| `-` 	| 매개변수로 주어진 글자를 기준으로 종성이 있는지 없는지 판단합니다. 	|
| option 	| Object 	| `true` 	| { toArray: boolean } 과 같이 사용 가능합니다.<br>toArray를 true로 해 놓은 경우, 위 `str`에 넘겨준 모든 글자의 종성 여부를 판별하여 boolean[]으로 반환합니다.<br>기본 값은 `false`입니다. 	|
### 마지막 글자의 종성 여부 판별하기
```js
let test = hasJongSeong("배고파");
console.log(test); // false
```
### 모든 글자의 종성 여부 판별하기
```js
let test = hasJongSeong("피자먹어야징", { toArray: true });
console.log(test); // [false, false, true, false, false, true]
```
---
## getSyllable
| 매개변수 명 	| 타입 	| 옵션 	| 설명 	|
|---	|---	|---	|---	|
| str 	| string 	| `-` 	| 기준이 될 글자를 넣어줍니다. 	|
| option 	| {<br> syllable?: "초성" \| "중성" \| "종성" \| "모두",<br> toSeparateArray?: boolean,<br> includeOtherLng?: boolean,<br> removeSpace?: boolean,<br>} 	| `true` 	| 기본 값은 각각 `"모두"`, `false`, `false`, `false` 입니다.<br>syllable에서 `"초성"`을 택하는 경우 `str`에서 초성만을, `"중성"`을 택하는 경우 중성만을, `"종성"`을 택하는 경우 종성만을 분리하여 반환합니다. `"모두"`를 택하는 경우는 각 글자의 초・중・종성을 분리하여 반환합니다.<br>toSeparateArray에서 `true`를 택하는 경우 모든 글자를 하나의 배열로 반환합니다.<br>includeOtherLng에서 `true`를 택하는 경우 한글이 아닌 글자도 반환합니다.<br>removeSpace에서 `true`를 택하는 경우 글자의 모든 공백을 제거한 뒤 값을 반환합니다. 	|
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