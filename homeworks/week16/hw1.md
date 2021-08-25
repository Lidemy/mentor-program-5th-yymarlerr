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

會印出：

```
1
3
5
2
4
```

* `console.log(1)` 被丟到 Call Stack 的最上方，執行後印出 1，`console.log(1)` 從 Call Stack 拿出來

* `setTimeout(() => {
  console.log(2)
}, 0)` 被丟到 Call Stack 的最上方執行，然後 WebAPI 負責啟動一個 0 秒的計時器，計時結束後，callback function `() => {
  console.log(2)
}` 會被放到 Callback Queue 裡面，等到 Call Stack 清空才會被執行，`setTimeout()` 從 Call Stack 取出來。

* `console.log(3)` 丟到 Call Stack ，執行後印出 3，把 `console.log(3)` 從 Call Stack 拿出來

* 把 `setTimeout(() => {
  console.log(4)
}, 0)` 丟到 Call Stack 執行，WebAPI 負責啟動 0 秒的計時器，計時結束後，callback function `() => {
  console.log(4)
}` 會被放到 Callback Queue 裡面，等到 Call Stack 清空才會被執行，`setTimeout()` 從 Call Stack 取出來。

* 把 `console.log(5)` 放到 Call Stack，執行後印出 5，`console.log(5)` 被取出來。

* Event Loop 會判斷 Call Stack 是否清空，當 Call Stack 清空時，會把排在 Callback Queue 裡面的 callback function 依照先進先出的順序，推進 Call Stack 裡面，所以會先執行 `console.log(2)` 印出 2，再執行 `console.log(4)`，印出 4。