## 什麼是 Ajax？
全名為 Asynchronous JavaScript and XML。任何非同步地跟伺服器交換資料的 JavaScript 都可以算是 AJAX。名稱中有 XML 是因為早期的資料格式多為 XML，但現用 JSON 格式較多。非同步的意思為，執行完一段程式碼後，不等它執行完畢，就繼續執行下一行。

範例如下：

```
<script>
    const request = new XMLHttpRequest()
    request.onload = function() { // 放一個funciton 到 onload 上的意思 
      if (request.status >= 200 && request.status < 400) {
        console.log(request.responseText)
      } else {
        console.log('err')
      }
    }

    request.onerror = function() { // 有錯的時候
      console.log('error')
    }

    request.open('GET', 'https://google.com', true) // 用 GET 發 request 到 google 的意思，true 為非同步
    request.send()

  </script>
```


## 用 Ajax 與我們用表單送出資料的差別在哪？
差別為用表單傳送資料一定會換頁。


## JSONP 是什麼？
為 JSON with padding，是一種資料傳輸的方式。瀏覽器因安全性考量而有同源政策，而像 `<script` 或 `<img>` 等標籤因不受其限制，故將 JSON 格式的資料用符合 JavaScript 的語法包裹起來，並透過在 `<script>` 來獲得資料。

概念類似如下：

* 先新增一個檔案叫做 `test.js`，裡面內容為

```
receiveData({
  data: 'test'
});
``` 
* 再利用回傳函式的方式得到資料

```
<script>
function receviveData(response) {
	console.log(response)
}
</script>
<scipt src='./test.js'></script>
```
=> 便可以得到 test.js 裡面的資料： `data: 'test'`

實際應用：用 Twitch 來舉例

* Twitch 的 API 會回傳 JSON 格式資料，收到資料後再利用 callback 函式把資料叫出來

```
<script src"https://api.twitch.tv/kraken?client_id=XXXX&callback=foo"></script>
<script>
function foo(response) {
	console.log(response)
}
</script>
```

參考資料：

[輕鬆理解 Ajax 與跨來源請求](https://blog.techbridge.cc/2017/05/20/api-ajax-cors-and-jsonp/)

[淺析json與jsonp區別及通過ajax獲得json資料後格式的轉換](https://codertw.com/%E5%89%8D%E7%AB%AF%E9%96%8B%E7%99%BC/386085/)


## 要如何存取跨網域的 API？
1. 使用 JSONP
2. 利用 CORS 「跨網域資源共享」來存取不同網域的 API。

* server 端在 response 的 header 加上 `Access-Control-Allow-Origin`，瀏覽器在收到 response 後會檢查 origin 是否有用戶端這個 origin，若有的話就會允許通過。除了 `Access-Control-Allow-Origin` 外，也有 `Access-Control-Allow-Headers` 及 `Access-Control-Allow-Methods`，可以定義接收哪些 request header 和 methods

* 分為簡單請求和非簡單請求，其中非簡單請求因為帶有自定義 header，所以會先利用 HTTP OPTIONS 方法發送 preflight request，若瀏覽器有收到 server 端的 prefligth response，代表 CORS 的驗證有通過，可以送出跨來源請求。


## 為什麼我們在第四週時沒碰到跨網域的問題，這週卻碰到了？
跨網域問題因瀏覽器而生，第四週是的 JavaScript 是在 node 上面執行，所以不受瀏覽器限制。

