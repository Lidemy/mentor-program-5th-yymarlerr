<?php
  session_start();
  require_once("conn.php");

  $msg = "";
  if (!empty($_GET["errCode"])) {
    if ($code == 2) {
      $msg = "帳號或密碼錯誤";
    } else {
      $msg = "出現錯誤";
    }
  }
  
?>


<DOCTYPE! html>

<html lang="en">
<head>
  <meta charset="utf-8">
  <title>部落格</title>
  <link rel="stylesheet" href="./login.css">
</head>

<body>
  <div class="wrapper">
    <form class="cards" method="POST" action="handle_login.php">
      <h1>Log In</h1>
      <div class="username" >USERNAME</div>
      <input type="text" name="username" />
      <div class="password" >PASSWORD</div>
      <input type="password" name="password" />
      <div class="reminder"><?php echo $msg; ?></div>
      <div><input type="submit" value="SIGN IN" class="submit"/></div>
    </form>
  </div>
</body>
</html>