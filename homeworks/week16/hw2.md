請說明以下程式碼會輸出什麼，以及盡可能詳細地解釋原因。

```
for(var i=0; i<5; i++) {
  console.log('i: ' + i)
  setTimeout(() => {
    console.log(i)
  }, i * 1000)
}
```

會得到：
i: 0
i: 1
i: 2
i: 3
i: 4
5
5
5
5
5

第一圈迴圈，i 為 0，先印出 i:0，然後跳到下一行 `setTimeout`，`setTimeout` 會被放到 call stack 裡面執行，然後在約 0 秒之後，就會從 call stack 裡面 pop off，並把 `console.log(i)` 放到 Callback Queue 裡面，等到 call stack 清空後才會被執行。

第二圈迴圈，i 為 1，先印出 i:1，然後跳到下一行 `setTimeout`，`setTimeout` 會被放到 call stack 裡面執行，然後在約 1 秒之後，就會從 call stack 裡面 pop off，並把 `console.log(i)` 放到 Callback Queue 裡面，等到 call stack 清空後才會被執行。

第三圈迴圈，i 為 2，先印出 i:2，然後跳到下一行 `setTimeout`，`setTimeout` 會被放到 call stack 裡面執行，然後在約 2 秒之後，就會從 call stack 裡面 pop off，並把 `console.log(i)` 放到 Callback Queue 裡面，等到 call stack 清空後才會被執行。

第四圈迴圈，i 為 3，先印出 i:3，然後跳到下一行 `setTimeout`，`setTimeout` 會被放到 call stack 裡面執行，然後在約 3 秒之後，就會從 call stack 裡面 pop off，並把 `console.log(i)` 放到 Callback Queue 裡面，等到 call stack 清空後才會被執行。

第五圈迴圈，i 為 4，先印出 i:4，然後跳到下一行 `setTimeout`，`setTimeout` 會被放到 call stack 裡面執行，然後在約 4 秒之後，就會從 call stack 裡面 pop off，並把 `console.log(i)` 放到 Callback Queue 裡面，等到 call stack 清空後才會被執行。

然後當 i = 5 時，迴圈終止，call stack 也清空了，代表 Callback Queue 裡面的 console.log(i) 可以被先後放置到 call stack 裡面執行，然後因為這時 i 已經結束迴圈，所以會得到連續五個 5。