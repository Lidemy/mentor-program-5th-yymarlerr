## 請說明雜湊跟加密的差別在哪裡，為什麼密碼要雜湊過後才存入資料庫

### 加密
利用演算法，將密碼加密成密文，密文可以被解密回原本的密碼，所以如果對方知道加密的原理，便可以破解密碼。一組密碼對應一組密文。

### 雜湊
將密碼改成一組亂數，亂數不能被反推回原本的密碼，所以每一次用戶登入時，都要把他輸入的密碼 hash 過，再來和資料庫的亂數比對，看是不是一樣。

不同組密碼有可能會對應到同組亂數，這種情況稱為碰撞，不過極少時候發生。

有時，會將密碼加上幾個字元後再變成雜湊，這樣即使駭客利用暴力法解出密碼，也沒有辦法得到真正的密碼，這種方法稱為「加鹽」。

密碼如果不經過雜湊再放入資料庫，當資料庫被侵入後，別人有可能取得用戶的密碼，盜用用戶身份。


## `include`、`require`、`include_once`、`require_once` 的差別
當我們有一串程式碼在很多個檔案都需要被使用時，我們會將它獨立放在某個檔案，要使用時，只要用函式呼叫該檔案並執行裡面的程式碼即可。以上函式的功能都是讀取某個檔案的程式碼。差別如下：

### `include`
會將指定的檔案讀入並且執行裡面的程式。有回傳值（return）的功能，如果引入檔的內容有誤，會跳出錯誤訊息，並忽略錯誤，繼續執行後續的程式碼。

### `require`
會將目標檔案的內容讀入，並且把自己本身代換成這些讀入的內容。PHP 4.0 引擎會先編譯程式碼，編譯完全部程式碼才會開始執行，而「讀入」便是在「編譯」時進行。沒有回傳值（return）的功能，如果引入檔的內容有誤，會停止執行後續的程式碼。

### `include_once`
會將指定的檔案讀入並且執行裡面的程式，和 `include` 的差別在於 `include_once()` 函式會先檢查要匯入的檔案是不是已經在該程式中的其它地方被匯入過了，這樣可以預防情況像是，自定義函式被重複宣告等。

### `require_once`
會將目標檔案的內容讀入，並且把自己本身代換成這些讀入的內容。和 `require` 的差別為會先檢查目標檔案的內容是不是在之前就已經匯入過了，如果是的話，便不會再次重複匯入同樣的內容。

[參考資料](https://codertw.com/%E7%A8%8B%E5%BC%8F%E8%AA%9E%E8%A8%80/239900/)

[參考資料二](https://ithelp.ithome.com.tw/articles/10238540)


## 請說明 SQL Injection 的攻擊原理以及防範方法

### 攻擊原理
又稱為「駭客的填字遊戲」，使用者在輸入資訊時，利用改變 SQL 語法來得到想要的資訊。舉例如下：

在登入的那個頁面，如果 SQL 語法為 `select * from users where username = '%s' and password = '%s'`

這時用戶填入 `select * from users where username = 'aa'#' and password = '%s'`，從 `#` 後的字串都會被當成備註，所以實際上用戶重構了 SQL 語法為  `select * from users where username = 'aa'`。如此以來，便可以在不知道密碼的情況下，登入別人的帳戶。

[參考資料](https://dev.mysql.com/doc/refman/8.0/en/comments.html)

[參考資料二](https://medium.com/%E7%A8%8B%E5%BC%8F%E7%8C%BF%E5%90%83%E9%A6%99%E8%95%89/%E6%B7%BA%E8%AB%87%E9%A7%AD%E5%AE%A2%E6%94%BB%E6%93%8A-%E7%B6%B2%E7%AB%99%E5%AE%89%E5%85%A8-%E4%B8%80%E6%AC%A1%E7%9C%8B%E6%87%82-sql-injection-%E7%9A%84%E6%94%BB%E6%93%8A%E5%8E%9F%E7%90%86-b1994fd2392a)

### 防範方法

利用 MySQL 內建的 prepared statement，來預防 SQL Injection 的攻擊，用法如下：

```
$mysqli = new mysqli("example.com", "user", "password", "database");

$stmt = $mysqli->prepare("INSERT INTO test(id) VALUES (?), (?), (?), (?)");
$stmt->bind_param('iiii', ...$values);
$stmt->execute();
```

* 先 `prepare()`，values 用 `?` 表示
* 再用 `bind_param(“代號”, "值")` 填入值，字串的代號為 `s`，數值的代號為 `i` ，有幾個值就要填入幾個代號。
* 最後 `execute()` 執行


[參考資料](https://www.php.net/manual/en/mysqli.quickstart.prepared-statements.php)


##  請說明 XSS 的攻擊原理以及防範方法
### 攻擊原理
又稱為 Cross-Site Scripting，若用戶在可以填寫資訊的地方，填上 `<script></script>`，這段文字，會被解讀成程式碼，而用戶便可利用此方法，來獲得資料庫的資訊（像是 cookie）或將網頁導到釣魚網站⋯⋯等。

### 防範方法
利用函式將特殊符號用不同的方法表示，這樣就不會被誤解為程式碼。用 PHP 內建的 函式 `htmlspecialchars($string, ENT_QUOTES)` 來舉例，
左邊的 input 會被轉為右邊的 output：

* `&`  => `&amp;`
* `"`  => `&quot;` 
* `'`  => `&#039;` (for ENT_HTML401) or 
`&apos;` (for ENT_XML1, ENT_XHTML or ENT_HTML5)
* `<` => `&lt;`
* `>` => `&gt;`

[參考資料](https://www.php.net/manual/en/function.htmlspecialchars.php)

## 請說明 CSRF 的攻擊原理以及防範方法
### 攻擊原理
全名為 Cross Site Request Forgery，跨站請求偽造。攻擊者透過一些技術性手段，讓使用者的瀏覽器在不知情的情況下，去取得登入過的網站資訊（若還在 session 期間內）。

* 舉例ㄧ：

	若網路銀行轉帳利用 GET 來發送 request 給 server ，而 URL 為：https://bank.example.com/withdraw?account=AccoutName&amount=1000&for=PayeeName
	
	攻擊者可以在某個網站上放以下程式碼：
	`<img src="https://bank.example.com/withdraw?account=Alice&amount=1000&for=Badman" width='0' height='0' />`
	
	這樣使用者在點擊該網站時，如果登入還在 session 的期限內，便會在不知情的情況下將錢轉到 Badman 這個帳戶。
	
	同理，這串 URL 也可以放在 `<a>` 的 href 裡面。

* 舉例二：
	
	若利用 POST 來發送 request 給 server，攻擊者一樣可以利用 
	
	```
	<form method=POST action="https://bank.example.com/withdraw">
		<input type="type" name="amount" value="1000" />
	</form>
	```
	
	的這個方法來讓使用者在不知情的情況下將錢轉出去


[參考資料](https://zh.wikipedia.org/wiki/%E8%B7%A8%E7%AB%99%E8%AF%B7%E6%B1%82%E4%BC%AA%E9%80%A0)


### 防範方法
#### server 端防禦
* 利用 referer：

	CSRF 和使用者發送請求的差別在於，他們的 domain 不相同，所以 server 可以檢查請求的 header，查看 referer（代表著請求從哪邊過來），若為不合法的 domain，server 就可以辨別出此為惡意存取。 
	
	唯有些瀏覽器不會帶 referer 或使用者關閉帶 referer 這個功能，這樣 server 便會擋掉使用者的請求。或若攻擊者篡改 referer 的內容，讓 server 誤以為他是使用者，也有可能。
	
* 加入校驗 token
	在 form 裡面加入隱藏的 `<input type"hidden name="csfrtoken" value="4iuohrfoh2893484"`，使用者發送請求時，若這串 token 的值和 session 裡面存的值不相同，server 便可以拒絕請求。
	
	不過若 server 接受 cross-origin 的請求，攻擊者可以自己發送 request 來取得 csfrtoken 的值，
	
* 利用 Double Submit Cookie

	除了在表單內加入隱藏的 `<input type"hidden name="csfrtoken" value="4iuohrfoh2893484"` 外，同時也設定 cookie 的值為 csfr token=4iuohrfoh2893484，發送請求時，cookie 的值若和表單中的 csfr token 值相同，server 便可以判別他是否為使用者。這樣即使攻擊者有拿到 csfr 的 token 值，他也因為沒辦法在自己的 domain 設定網站的 cookie ，而使 server 便可以辨別他非使用者。 
	
	不過可能會遇到攻擊者在 subdomain 設定 cookie 的狀況，為預防此情況發生，要確保控制所有的 subdomain、確定 cookie 是在 HTTPS 的協定下被傳送、
	
* Samesite Cookie

	為 Chrome 所提供的服務，在原本的 cookie 後面加上 `Set-cookie: SameSite`，SameSite 有兩種模式
	
	* Strict （預設值）
		
		只要瀏覽器驗證後，發現這個請求不是從同個 domain 發出的話，不會帶上 cookie，意思就是不允許第三方網站存取 cookie，如果我今天要從臉書連到 google，即使我之前已經有登入過 google，他也為自動將我登出。
		
	* Lax
	
		放寬了一些限制，允許從 `<a>`、`<form method="GET">`、`<link rel=""prerender>` 發送請求。
		


[參考資料二](https://blog.techbridge.cc/2017/02/25/csrf-introduction/