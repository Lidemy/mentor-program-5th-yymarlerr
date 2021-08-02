請說明以下程式碼會輸出什麼，以及盡可能詳細地解釋原因。

```
var a = 1
function fn(){
  console.log(a)
  var a = 5
  console.log(a)
  a++
  var a
  fn2()
  console.log(a)
  function fn2(){
    console.log(a)
    a = 20
    b = 100
  }
}
fn()
console.log(a)
a = 10
console.log(a)
console.log(b)

```

會得到：
undefined
5
6
20
1
10
100

fn() 先被呼叫， 因變數宣告會被 hoisting 但賦值不會的關係，所以第一個 console.log(a) 會得到 undefined。

再來因為變數 a 被賦值了 5，所以 console.log(a) 會是 5。

接著 fn2() 被呼叫，console.log(a) 會印出 6，因為 function 裡面沒有宣告變數 a，所以會去上一層找，這時 a 在被賦值 5 之後，又被 a = a + 1 了，所以得到 6。

跳到下一行 a 被賦值 20，所以第四個 console.log(a) 會是 20。

到 f(n) 的下一行，console.log(a) 會是 1 ，因為變數 a 在全域時被宣告為 1。

接著 conosole.log(a) 會是 10，因為重新賦值 10 給 a。

再來 console.log(b) 會是 100，因為 b 在 fn2() 被宣告，但是因為沒有用 var 或 let 或 const 宣告，所以會是全域變數。