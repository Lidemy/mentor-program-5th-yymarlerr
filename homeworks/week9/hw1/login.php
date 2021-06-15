<?php
  require_once('conn.php');
  $result = $conn->query("select * from yide_comments order by id desc");
  if (!$result) {
    die("Error:" . $conn->error);
  }
?>


<DOCTYPE! html>

<html lang="en">
<head>
  <meta charset="utf-8">
  <title>留言板</title>
  <link rel="stylesheet" href="./style.css">

</head>

<body>
  <header class="warning">
      <strong>注意！本站為練習用網站，因教學用途刻意忽略資安的實作，
      註冊時請勿使用任何真實的帳號或密碼</strong>
  </header>
  <main class="board">
    <a href="index.php">回留言板</a>
    <a href="register.php">註冊</a>
    <form method="POST" action="handle_login.php">
      <h1>登入</h1>
      <?php
        if(!empty($_GET['errCode'])) {
          $code = $_GET['errCode'];
          $msg = "資料有誤";

          if($code === "1") {
            $msg = "請輸入完整資料";
          }

          if($code === "2") {
            $msg = "資料輸入錯誤";
          }

          echo "<h3>" . $msg . "</h3>";
        }
      ?>
      <div>帳號：<input type="text" name="username" class="nickname" /></div>
      <div>密碼：<input type="password" name="password" class="nickname" /></div>
      <input type="submit" class="board__submit-button" value="送出">
    </form>
  </main>
</body>
</html>