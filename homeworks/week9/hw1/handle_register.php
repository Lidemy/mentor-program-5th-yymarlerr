<?php
  require_once("conn.php");

  $nickname = $_POST["nickname"];
  $username = $_POST["username"];
  $password = $_POST["password"]; 

  if (
    empty($nickname) ||
    empty($username) ||
    empty($password)
  ) {
    header("Location:register.php?errCode=1");
    die("請輸入內容");
  }
 
  $sql = sprintf("insert into yide_users(nickname, username, password) values('%s', '%s', '%s')",
    $nickname,
    $username,
    $password
  );

  $result = $conn->query($sql);
  
  if(!$result) {
    if ($conn->errno === 1062) {
      header("Location: register.php?errCode=2");
    }
    die($conn->error);
  } else {
    header("Location:login.php");
  }
  
?>