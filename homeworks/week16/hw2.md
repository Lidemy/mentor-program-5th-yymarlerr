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
```
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
```

#### 開始迴圈：
* 執行 for 迴圈，將 for 迴圈放進 Call Stack 裡面。
* 宣告全域變數 `var i = 0`，因為符合 `i < 5` 所以進入第一圈迴圈。

####第一圈迴圈：
* `console.log('i: ' + i)` 被放到 Call Stack 的最上方，執行後印出 i:0，`console.log('i: ' + i)` 從 Call Stack 取出來。
* `setTimeout()` 被放到 Call Stack 裡面，並交由 WebAPI 負責計時 i * 1000 毫秒，這時 `setTimeout()` 會從 call stack 裡面 pop off。
* 因為 i 為 0，所以計時器為 0 秒，計時結束，callback function `() => {
    console.log(i)
  }` 被放進 Callback queue 裡面，等到 Call Stack 清空後才會被執行。

####第二圈迴圈：
* 第一圈迴圈結束，i++，所以 i 的值會是 1，判斷 i < 5，所以進入第二圈迴圈。 
* `setTimeout()` 被放到 Call Stack 裡面，並交由 WebAPI 負責計時 i * 1000 毫秒，這時 `setTimeout()` 會從 call stack 裡面 pop off。
* 因為 i 為 1，所以計時器為 1 秒，計時結束，callback function `() => {
    console.log(i)
  }` 被放進 Callback queue 裡面，等到 Call Stack 清空後才會被執行。

####第三圈迴圈：
* 第二圈迴圈結束，i++，所以 i 的值會是 2，判斷 i < 5，所以進入第三圈迴圈。 
* `setTimeout()` 被放到 Call Stack 裡面，並交由 WebAPI 負責計時 i * 1000 毫秒，這時 `setTimeout()` 會從 call stack 裡面 pop off。
* 因為 i 為 2，所以計時器為 2 秒，計時結束，callback function `() => {
    console.log(i)
  }` 被放進 Callback queue 裡面，等到 Call Stack 清空後才會被執行。

####第四圈迴圈：
* 第三圈迴圈結束，i++，所以 i 的值會是 3，判斷 i < 5，所以進入第四圈迴圈。 
* `setTimeout()` 被放到 Call Stack 裡面，並交由 WebAPI 負責計時 i * 1000 毫秒，這時 `setTimeout()` 會從 call stack 裡面 pop off。
* 因為 i 為 3，所以計時器為 3 秒，計時結束，callback function `() => {
    console.log(i)
  }` 被放進 Callback queue 裡面，等到 Call Stack 清空後才會被執行。

####第五圈迴圈：
* 第四圈迴圈結束，i++，所以 i 的值會是 4，判斷 i < 5，所以進入第五圈迴圈。 
* `setTimeout()` 被放到 Call Stack 裡面，並交由 WebAPI 負責計時 i * 1000 毫秒，這時 `setTimeout()` 會從 call stack 裡面 pop off。
* 因為 i 為 4，所以計時器為 4 秒，計時結束，callback function `() => {
    console.log(i)
  }` 被放進 Callback queue 裡面，等到 Call Stack 清空後才會被執行。

####最後：
* 因為 i++，所以當地五圈迴圈執行完畢，i = 5，判斷 i 沒有 < 5，迴圈終止，for 迴圈從 Call stack 上面 pop off。
* Event loop 判斷 call stack 清空了，在 Callback Queue 裡面的 console.log(i) 會依照先進先出的順序，被推進 call stack 裡面執行。
* 因為 i  = 5，第一個 `() => {  console.log(i) }` 會印出 5，並從 Callback Stack pop off。
* 因為 i  = 5，第一個 `() => {  console.log(i) }` 會印出 5，並從 Callback Stack pop off。
* 因為 i  = 5，第一個 `() => {  console.log(i) }` 會印出 5，並從 Callback Stack pop off。
* 因為 i  = 5，第一個 `() => {  console.log(i) }` 會印出 5，並從 Callback Stack pop off。
* 因為 i  = 5，第一個 `() => {  console.log(i) }` 會印出 5，並從 Callback Stack pop off。

不好意思，助教，我覺得我還是有些觀念沒有搞懂，像是不太能理解為什麼，最後面的五個 5，會間隔一秒左右印出。照理說 callback function 等到計時結束後，才會進到 Callback queue，這時計時已經結束，會什麼還會差到一秒左右被印出？

如果將程式碼改成以下，最後面的五個 5 就會同時被印出：

```
for(var i=0; i<5; i++) {
  console.log('i: ' + i)
  setTimeout(() => {
    console.log(i)
  }, 0)
}
```
