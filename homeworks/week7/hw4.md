## 什麼是 DOM？
瀏覽器提供的橋樑，可以把 document 轉換成 object，而讓 JavaScript 改變畫面上的東西。JavaScript 透過 DOM 拿到某個物件（元素），並針對該物件作改變。


## 事件傳遞機制的順序是什麼；什麼是冒泡，什麼又是捕獲？
事件被觸發後，會從 window 開始由上往下傳，經過 document、html，到點擊的元素 target item，這個 phase 為 capturing phase 「捕獲階段」；到點擊的元素後，開始進入 target phase；之後
再從點擊的元素由下往上傳，這個 phase 為 bubbling phase 「冒泡階段」。

## 什麼是 event delegation，為什麼我們需要它？
中文為「事件代理」。因為冒泡的特性，點擊內層一樣會觸發到最外層，所以可直接在最外層加上監聽事件。這樣的好處是，如果內層有很多個元素都需要被監聽，可以只加一個監聽（在最外層）即可。


## event.preventDefault() 跟 event.stopPropagation() 差在哪裡，可以舉個範例嗎？
### event.preventDefault()
為阻止瀏覽器預設行為的意思，舉例如下：

```
<body>
<form class="log-in" method="GET" Action="">
  <div>
    username<input type="name" />
  </div>
  <div>
    password<input name="password1" type="password" />
  </div>
  <div>
    confirm password<input name="password2" type="password" />
  </div>
  <div>
    <input name="submit" type="submit" value="送出" />
  </div>
</form>
<script>
  const element = document.querySelector(".log-in")
  element.addEventListener('submit', function(e) {
    const input1 = document.querySelector("input[name=password1]")
    const input2 = document.querySelector("input[name=password2]")
    if (input1.value !== input2.value) {
      alert("密碼輸入錯誤")
      e.preventDefault()
    }
  })
</script>
</body>
```

如果這邊輸入的密碼一不等於密碼二，瀏覽器就不會執行預設行為，這邊的預設行為為「送出表單」。

### event.stopPropagation()
為阻止事件傳遞，舉例如下：

```
<body>
  <div class="outer">
    outer
    <div class="inner">
      inner
      <div class="btn">
        <input class="btn" type="button" value="btn" />
      </div>
    </div>
  </div>
  <script> 
    const btn = document.querySelector(".btn")
    const outer = document.querySelector(".outer")
    const inner = document.querySelector(".inner")
    btn.addEventListener("click", function(e) {
      e.stopPropagation()
      console.log("click 1", "按鈕")
    })

    inner.addEventListener("click", function(e) {
      console.log("click 1", "內層")
    })

    outer.addEventListener("click", function(e) {
      console.log("click 1", "外層")
    })



  </script>
</body>
```

對 `btn` 加監聽事件，並在事件裡加上 `e.stopPropagation()` ，就會阻止這個事件繼續傳遞下去，所以如果在 `inner` 、 `outer` 加監聽（且為冒泡階段監聽），這時用 `console.log` 就不會印出 `內層` 和 `外層`。

但如果在所以如果在 `inner` 、 `outer` 加監聽（且為捕獲階段監聽），用 `console.log` 還是可以印出 `內層` 和 `外層`。