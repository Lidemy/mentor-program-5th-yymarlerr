## 期末專案規劃

興趣是爬山，而在規劃登山行程時，需先參閱別人的紀錄，才可以知道哪邊有水源、路況等重要資訊，所以想做一個任何人都可以註冊發表文章的平台，讓山友分享紀錄。

其實現已經有許多這種相關平台，像是[健行筆記](https://hiking.biji.co/)、[登山補給站](https://www.keepon.com.tw/forum-1-1.html)，所以就大概參考他們的網站，然後加強自己想要的功能，像是搜尋文章時可以多一些過濾選項，像是區域、天數等。### User Story

1.	身為訪客，要能在首頁，用關鍵字或過濾器搜尋到別人的文章2.	身為訪客，要能夠在主頁的地圖上，用關鍵字搜尋地點，並跳出和該地點相關的文章3.	身為訪客，要能夠在首頁看到最新發布的文章4.	身為訪客，要能夠看到所有文章的點擊率5.	身為會員，要能夠登入新增、編輯、刪除自己的文章6.	身為會員，要能夠上傳 GPX 檔、圖片到文章裡面，若有上傳軌跡檔，文章頁面會顯示地圖及高度變化圖7.	身為會員，要能夠進入自己的主頁，管理發佈過的文章8.	身為會員，要能夠進入自己的主頁，編輯個人檔案9.	身為會員，要能夠在別人的文章下面發表、編輯、刪除自己的留言並按讚10.	身為會員，要能夠在討論區發表文章11.	身為會員，要能夠點進去別人的檔案，查看對方曾經發過的文章12.	身為管理員，要可以進入後台，管理會員在任何地方發佈的文章13.	身為管理員，要能夠刪除會員在任何地方的留言#### 首頁大概長這樣

* 希望在地圖上，用關鍵字搜尋時可以跳出相關文章

![](https://static.coderbridge.com/img/yymarlerr/56299046b1354270a5bbce2f22c77e47.png)

* 希望地圖上，可以顯示最近新增或點擊率最高的十篇文章縮圖，並有連結可以導到該文章

![](https://static.coderbridge.com/img/yymarlerr/bb5a06df67bb45e7a3fe9db5874cff6b.png)

* 希望在用地圖的搜尋功能時，除了搜尋到目的地之外，也會跳出和該區域相關連的文章連結

![](https://static.coderbridge.com/img/yymarlerr/4feff5dd9aed453e862bdae05bb79dba.png)


#### 文章裡面

* 若會員有提供 GPX 檔，希望文章內容裡面可以顯示地圖 + 軌跡

![](https://static.coderbridge.com/img/yymarlerr/f0c0610b86fd421fa427c172f8310daf.png)


查到的串地圖 API 相關資訊：

* https://developers.google.com/maps/documentation/javascript/overview* https://outdoorsafetylab.org/elevation_api* http://gis.rchss.sinica.edu.tw/qgis/?p=4539 * https://www.tocc-climbing.org/forum 
目前有這些初步的想法，但不確定實行起來的難度會不會太高，或者規模不夠大，再麻煩助教幫忙看一下，謝謝～～