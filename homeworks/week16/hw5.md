## 這週學了一大堆以前搞不懂的東西，你有變得更懂了嗎？請寫下你的心得。

### 變數的作用域
有！突然對於變數的作用域豁然開朗，其實之前交作業時，有時不太明白 Eslint 為什麼建議把 `let` 修改成 `const`，所以就只是被動地照著改，現在可以理解。然後之前一直以為只要是用 `const` 宣告的變數，就是全域變數，現在才了解，是要看在哪個區域宣告以及宣告的方式。
 
### 物件導向

關於物件導向，有幾個問題想要請問：

#### 問題ㄧ
在繼承的講解影片中，老師有舉下面這個例子，其中在 extends Dog 的時候，沒有用 super() 去呼叫 Dog 的 constructor，如果沒有呼叫就代表 BlackDog 會完全繼承 Dog 的設定嗎？

```
class Dog {
  constructor(name) {
    this.name = name
  }

  sayHello() {
    console.log(this.name)
  }
}

class BlackDog extends Dog { // 因為沒有 constructor，所以去找上一層（Dog）的 constructor，然後執行
  test() {
    console.log('test', this.name)
  }
}

const d = new BlackDog("hihihi")
d.test() // 得到 hihihi
d.sayHello() // 得到 hihihi
```

####問題二
想要請問是不是任何函數在被 new 出一個 instance 的情況下，該函數就算是一個建構函數？


