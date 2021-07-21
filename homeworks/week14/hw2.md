## 部署

### 心得
一開始一直沒辦法成功用 SSH 連上伺服器，但找不到原因，一直覺得是自己的鑰匙有問題，因為檔名不是 `.pem` 而是 `.cer`，後來根據 [stackoverflow](https://stackoverflow.com/questions/23225112/amazon-aws-ec2-getting-a-cer-file-instead-of-pem/23595139)，發現應該不是檔案問題，而是鑰匙的路徑設錯了。

用顯示的錯誤訊息 `port 22 operation timed out` 去查，發現有可能是防火牆 ufw 開啟，所以想用 `sudo ufw disable` 來關閉防火牆，得到沒有 ufw 這個 command 存在的訊息，所以下個想法就是去安裝 ufw，google 了一下，都說要用 `apt-get` 這個指令安裝 ufw，但沒有進去 Ubuntu 伺服器，好像就沒辦法使用（？），然後又查到 [這篇文章](https://blog.twshop.asia/ubuntu-%E5%85%A7%E5%BB%BA%E9%98%B2%E7%81%AB%E7%89%86-ufw-%E8%A8%AD%E5%AE%9A%E7%AF%84%E4%BE%8B/)，ubuntu 預設的 ufw 是關閉的，所以應該不是防火牆問題。

卡關太久了，所以後來直接參考老師的影片，發現老師 ssh i 後面是填 ubuntu 的 IP 而不是 DNS ， 所以改成用 IP 位置，再接著把 security group 的傳入規則 port 22 的來源從自己的 IP 改為 anywhere，就成功連上了！（後來查證，是搞錯自己的 ip 位置，把 port 22 的來源重新設訂為自己正確的 IP）。

因為前面連上主機已經花了很久的時間，所以後面就參考學長姐的文章、老師影片及 google，完成同步資料庫。

除了在設定用密碼連 mysql 時，先用 `sudo mysql_secure_installation` 設置了密碼，才用 `sudo mysql -u root mysql` 更改登入 phpmyadmin 的方式，一直登不進去外（後來改成先設定登入方式，才設定密碼後，就順利登入 phpmyadmin 了），其他沒遇到什麼特殊問題。

最後用 SFTP 上傳檔案，完成部署。


[學長姐紀錄：部屬 AWS EC2 雲端主機 + LAMP Server + phpMyAdmin](https://mtr04-note.coderbridge.io/2020/09/15/-%E7%B4%80%E9%8C%84-%08-%E9%83%A8%E5%B1%AC-aws-ec2-%E9%9B%B2%E7%AB%AF%E4%B8%BB%E6%A9%9F-/)

[參考資料：如何設置 phpmyadmin](https://www.digitalocean.com/community/tutorials/how-to-install-and-secure-phpmyadmin-on-ubuntu-18-04)

[參考資料：如何 inatall lamp on ubuntu](https://vitux.com/install-and-configure-lamp-server-on-ubuntu/)

[參考資料：Web Hosting using PHP and MySQL on AWS](https://maskaravivek.medium.com/web-hosting-using-php-and-mysql-on-aws-95bd5df0bd75)

***
### [網址](http://yide.tw/blog/index.php)