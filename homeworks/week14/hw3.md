## 什麼是 DNS？Google 有提供的公開的 DNS，對 Google 的好處以及對一般大眾的好處是什麼？

### DNS
DNS 為 domain name system 的簡寫，中文名稱為「域名系統」，它可以將域名轉換成相對應的 IP 位置，讓大家在瀏覽網站時，可以輸入域名（e.g. example.com）去到該網站而不用輸入 IP 位置，此服務讓人們更方便存取網際網路。

### Google 提供的 DNS 對 Google 的好處
* 可以得到更多 data，像是用戶的 IP 位置、ISP 資訊及地理資訊
* 有可能增加營收

### Google 提供的 DNS 對一般大眾的好處
* 理論上可以更快的存取網際網路
* 更穩定的使用者體驗
* 更安全

**參考資料**

[Why and How to Use Google's Public DNS](https://blog.dnsimple.com/2015/03/why-and-how-to-use-googles-public-dns/)

[Google Public DNS and Your Privacy
](https://www.pcworld.com/article/183671/Google_Public_DNS_and_Your_Privacy.html)

[What is DNS and how does it work?
](https://www.networkworld.com/article/3268449/what-is-dns-and-how-does-it-work.html)

## 什麼是資料庫的 lock？為什麼我們需要 lock？
lock 就是將資料鎖定，把不應進行的指令排除在外，並讓應該進行動作的指令執行，避免資料發生錯誤。不同儲存引擎支援不同的鎖機制。

若沒有鎖定住，可能會有 race condition 問題，也就是同時 update 兩筆資料，所導致的錯誤。舉例來說，現在有一套出貨系統，庫存顯示剩一件，而有兩個人同時間下了選取這個貨件的指令，導致庫存量顯示為 -1，這樣的情況便稱為 race condition。

使用 lock 的方法為，在交易裡面加上 `for update`，其他交易需等有被加上 `for update` 的那筆交易結束，才會繼續執行，也因此可能有效能上的損耗。

程式碼如下：

```
$conn -> autocommit(FALSE);
$conn -> begin_transaction();
$conn -> query("SELECT amount FROM products for update") // lock 整個 table，其他人也不能用，會有效能問題，如果有用 `where id = 1` 的話，就只會 lock 住一個 row
$conn -> commit();
```

**參考資料**

[MySQL Lock : Table Lock與Row Lock](https://www.mysql.tw/2018/06/mysql-lock-table-lockrow-lock.html)

[用 SELECT ... FOR UPDATE 避免 Race condition
](https://blog.xuite.net/vexed/tech/22289223-%E7%94%A8+SELECT+...+FOR+UPDATE+%E9%81%BF%E5%85%8D+Race+condition)

## NoSQL 跟 SQL 的差別在哪裡？
### NoSQL
* 透過多種資料模型（像是 JSON）來存取及管理資料，沒有 Schema（結構）。
* 用 Key-value 的方式來儲存，例如，輸入 user 會得到相對應的 JASON 資料
* 存結構不固定或是量大的資料
* 不支援 JOIN

**參考資料**

[關聯式資料庫 V.S. 非關聯式資料庫 (下)](https://lsyucode.wordpress.com/2017/01/15/%e9%97%9c%e8%81%af%e5%bc%8f%e8%b3%87%e6%96%99%e5%ba%ab-v-s-%e9%9d%9e%e9%97%9c%e8%81%af%e5%bc%8f%e8%b3%87%e6%96%99%e5%ba%ab-%e4%b8%8b/)

## 資料庫的 ACID 是什麼？
為資料庫交易功能的特性，為確保交易正確性而存在，有以下四個特點：

* Atomicity 原子性：交易內的 sql 指令，一定是全部失敗或全部成功，如果無法全部執行的話，會 rollback 到未執行之前的狀態。
* Consistency 一致性：要維持資料的一致性，所有資料必須符合預設的驗證規則、外鍵限制。舉例來說，今天如果從一個帳戶轉帳到另一個帳戶，那轉帳前後的兩個帳戶總額會相同。
* Isolation 隔離性：多筆交易不會互相影響，不能同時改同一個值。
* Durability 持久性：交易成功後，異動結果會完整保留。

**參考資料**

[MySQL 交易功能 Transaction 整理]
(https://xyz.cinc.biz/2013/05/mysql-transaction.html)

[ACID properties of transactions
](https://www.ibm.com/docs/en/cics-ts/5.4?topic=processing-acid-properties-transactions)