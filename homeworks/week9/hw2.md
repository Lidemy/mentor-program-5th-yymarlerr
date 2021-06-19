## 資料庫欄位型態 VARCHAR 跟 TEXT 的差別是什麼
###`Varchar`
* 最大長度可以設為 1~65535 個字節數，在長度為 0~255 字節時，會多佔 1 字節的空間；在長度為 255~65535 個字節時，會多佔 2 字節的空間。
* 使用 utf-8mb4 字符集，最大長度為 (65536-2)/4 = 16383 個字符
* 把資料表中的所有欄位類型為 `varchar` 的列之字節數加總，不能超過 65535 個字節。


###`Text`
* 最大長度固定為 65535 個字節，使用 utf-8mb4 字符集，最大長度為 (65536-2)/4 = 16383 個字符
* 儲存的位置不在 table 裡，所以跑得較慢。


### 結論
若已知資料字符符合 `varchar` 的最大長度限制，建議使用 `Varchar`，效能較好。

[參考資料一](https://sqlines.com/mysql/datatypes/varchar)

[參考資料二](https://dev.mysql.com/doc/refman/8.0/en/storage-requirements.html)

[參考資料三](https://mariadb.com/kb/en/text/)


## Cookie 是什麼？在 HTTP 這一層要怎麼設定 Cookie，瀏覽器又是怎麼把 Cookie 帶去 Server 的？
Cooke 是瀏覽器存放資訊的一個機制。伺服器為了辨別使用者，會在回應使用者的請求時，傳送一段資訊（存在使用者的 Cookie 中）給使用者，這樣使用者下次再發送請求時，如果請求的 header 中有該伺服器認得的 Cookie 的資料，伺服器就可以辨別用戶。

## 我們本週實作的會員系統，你能夠想到什麼潛在的問題嗎？
輸入留言的時候，沒辦法用雙引號這個符號，會跳出這個錯誤訊息：

> You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near 'the real name"", "Cathy")' at line 1
> 

handle_ add_comment.php 的程式碼如下：

```
$sql = sprintf('insert into yide_comments (content, nickname) values("%s", "%s")',
    $_POST["content"],
    $nickname
  );
```

更改程式碼後，可以輸入雙引號符號，但變成無法輸入單引號：

```
$sql = sprintf("insert into yide_comments (content, nickname) values('%s', '%s'",
    $_POST["content"],
    $nickname
  );
```

