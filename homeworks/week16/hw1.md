在 JavaScript 裡面，一個很重要的概念就是 Event Loop，是 JavaScript 底層在執行程式碼時的運作方式。請你說明以下程式碼會輸出什麼，以及盡可能詳細地解釋原因。

```
console.log(1)
setTimeout(() => {
  console.log(2)
}, 0)
console.log(3)
setTimeout(() => {
  console.log(4)
}, 0)
console.log(5)
```

會輸出：
1
3
5
2
4

把 `console.log(1)` 丟到 call stack ，執行後得到 1。

把 `setTimeout(() => {
  console.log(2)
}, 0)` 丟到 call stack 執行，然後 callback function 被放到 Callback Queue 裡面，等到 call stack 清空才會被執行。

把 `console.log(3)` 丟到 call stack ，執行後，得到 3。

把 `setTimeout(() => {
  console.log(4)
}, 0)` 丟到 call stack 執行，然後 callback function 被放到 Callback Queue 裡面，等到 call stack 清空才會被執行。

把 `console.log(5)` 放到 call stack，執行後得到 5。

這時 call stack 已經清空，所以把排在 Callback Queue 裡面的 callback function 叫出來，先執行 `console.log(2)` 得到 2，再執行 `console.log(4)`，得到 4。