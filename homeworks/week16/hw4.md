請說明以下程式碼會輸出什麼，以及盡可能詳細地解釋原因。

```
const obj = {
  value: 1,
  hello: function() {
    console.log(this.value)
  },
  inner: {
    value: 2,
    hello: function() {
      console.log(this.value)
    }
  }
}
  
const obj2 = obj.inner
const hello = obj.inner.hello
obj.inner.hello() // ??
obj2.hello() // ??
hello() // ??

```

####會得到：
```
2
2
undefined
```

####詳細內容：

在物件導向的環境下， this 的值會依照他怎麼被呼叫，而決定他在哪個物件底下。

所以 `obj.inner.hello()`  段程式碼，裡面的 this 會是 obj.inner 這個物件，而他的 value 為 2，所以會得到 2。

 `obj2.hello()` 的 this 會是 `obj2`，也就是 obj.inner，所以會得到 2。

另外，也可以用 `call()` 來知道 this 的值：

```
obj.inner.hello.call(obj.inner)

obj2.hello.call(obj2)
```

最後的 `hello()`，因為 `hello = obj.inner.hello`，也就是 `hello = function() {
console.log(this.value) }`，this 就會是 hello 這個 function，在不是物件導向的環境下、且沒有用 `use strict` 的情況下，this 會是 global 的東西，但這邊最後印出 underfined，不確定為什麼。
