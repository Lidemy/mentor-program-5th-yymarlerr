## 什麼是 MVC？

MVC 為 Model View Controller 的簡稱，Model 為資料；View 為模板，負責管理畫面的顯示：Controller 是協調者，負責將資料塞進模板裡，流程為：

1. request -> controller (coordinator) -> model (in charge of data)
2. controller -> view (template) 呼叫模板，並把 data 塞進去，然後 view 就會有一個完整的 response 出來
3. controller -> response


## 請寫下這週部署的心得

這週用 Heroku 部署，真的比 AWS 方便很多，也可能是都照著老師的講解影片關係，所以沒有遇到太大的困難。一開始不想輸入卡片資訊，所以有嘗試要用 postgres，不過發現不太知道 config 跟要怎麼改，網路上教學文章雖然蠻多的，但其實看不太懂，覺得自己的自學能力還蠻差的，後來因為進度已經落後的關係，決定還是用 clearDB。

## 寫 Node.js 的後端跟之前寫 PHP 差滿多的，有什麼心得嗎？

老實說，一開始對於作業完全不知從何下手，後來想到之前在學 PHP 時，也是先參考老師的程式碼，一步一步做，再慢慢把功能用完整，所以作業一先參考 [BE201] 裡面留言板的實作方式，陸續把登入機制、發文功能做出來，等到功能做完之後，再改成用 sequelize。

用框架雖然讓程式碼變得比較簡潔，但在一開始不熟悉時，跳出錯誤訊息會不知道從哪邊開始 debug，就會卡很久，需要一段時間適應。

做完作業一對框架就比較熟悉了，所以作業二花的時間比較少，而且一開始就用 sequelize 的方式和資料庫連線，然後發現這樣真的快超多的。