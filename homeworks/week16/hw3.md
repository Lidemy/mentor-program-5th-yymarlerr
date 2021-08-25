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

####會得到：
```
undefined
5
6
20
1
10
100
```

####詳細內容：

* 宣告 `var a = 1`、函式 `fn()`，進入 global Execution Contexts，並初始化 global VO：

```
global EC: {
	global VO: {
		fn: function
		a: undefined
	},
	scopeChain: [globalEC.VO]
}

```

* 開始執行程式碼，並進入 fn 的 Execution Contexts，並初始化 fn 的 VO：

```
fn EC: {
	fn AO: {
	  	fn2: function
	  	a: undefined
	},
	scopeChain: [fnEC.AO, globalEC.VO]
}

global EC: {
	global VO: {
	 	 fn: fumction
	 	 a: 1
	},
	scopeChain: [globalEC.VO]
}

```

* 開始執行程式碼，第一個 `console.log(a)` 為 undefined

```
fn EC: {
	fn AO: {
		 fn2: function
		 a: undefined
	},
	scopeChain: [fnEC.AO, globalEC.VO]
}

global EC: {
	global VO: {
		 fn: fumction
		 a: 1
	},
	scopeChain: [globalEC.VO]
}

```
* 變數 a 被賦值 5，所以第二個 `console.log(a)` 為 5

```
fn EC: {
	fn AO: {
		fn2: function
		a: 5
	},
	scopeChain: [fnEC.AO, globalEC.VO]
}

global EC: {
	global VO: {
	 	fn: fumction
	 	a: 1
	},
	scopeChain: [globalEC.VO]
}

```

* `a++`，所以 a 會變成 6
* `var a`，因為已經有 a 了，所以 a 的值不會變
* 呼叫 `fn2`，進入 fn2 的 Execution Contexts ，並初始化 fn2 的 VO，因為 fn2 裡面沒有宣告 function、變數、傳參數，所以 VO 會是空的
* 開始執行程式碼，第三個 console.log(a) 為 6

```
fn2 EC: {
	fn2 AO: {
 
	},
	scopeChain: [fn2EC.AO, fnEC.AO, globalEC.VO]
}


fn EC: {
	fn AO: {
		fn2: function
		a: 6
	},
	scopeChain: [fnEC.AO, globalEC.VO]
}


global EC: {
	global VO: {
		fn: fumction
		a: 1
	},
	scopeChain: [globalEC.VO]
}


```

* 程式碼跑到 a = 20，因為 fn2 的 VO 沒有 a，所以會往上找到 fn 的 VO，發現有 a，所以 a 變成 20
* 程式碼跑到 b = 100，因為 fn2 和 fn 的 VO 都沒有 b，所以會往上找到 global 的 VO，在 global 宣告 b 為 100


```
fn2 EC: {
	fn2 AO: {
  
	},
	scopeChain: [fn2EC.AO, fnEC.AO, globalEC.VO]
}

fn EC: {
	fn AO: {
		fn2: function
		a: 20
	},
	scopeChain: [fnEC.AO, globalEC.VO]
}

global EC: {
	global VO: {
	 	fn: fumction
		a: 1
		b: 100
	},
	scopeChain: [globalEC.VO]
}

```

* fn2 執行完畢，EC pop off。程式碼跑到下一行 `console.log(a)`，印出 20

```
fn EC: {
	fn AO: {
		fn2: function
		a: 20
	},
	scopeChain: [fnEC.AO, globalEC.VO]
}


global EC: {
	global VO: {
		fn: fumction
		a: 1
		b: 100
	},
	scopeChain: [globalEC.VO]
}


```

* fn 執行完畢，EC pop off。程式碼跑到下一行 `console.log(a)`，會印出 1

```
global EC: {
	global VO: {
		fn: fumction
		a: 1
		b: 100
	},
	scopeChain: [globalEC.VO]
}

```

* 程式碼跑到下一行 `a = 10`，a 的值會變成 10
* 所以下一行的 `console.log(a)` 會印出 10
* 下一行的 `console.log(b)` 會印出 100

```
global EC: {
	global VO: {
		fn: fumction
		a: 10
		b: 100
	},
	scopeChain: [globalEC.VO]
}

```
