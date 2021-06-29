<?php
  session_start();
  require_once("conn.php");
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
    <form class="cards" method="POST" action="handle_register.php">
      <h1>Register</h1>
      <div class="username" >USERNAME</div>
      <input type="text" name="username" />
      <div class="password" >PASSWORD</div>
      <input type="password" name="password" />
      <div><input type="submit" value="SIGN IN" class="submit"/></div>
    </form>
  </div>
</body>
</html>