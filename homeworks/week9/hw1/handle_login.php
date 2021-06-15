<?php
  session_start();
  require_once("conn.php");
  require_once("utils.php");

  $username = $_POST["username"];
  $password = $_POST["password"]; 

  if (
    empty($username) ||
    empty($password)
  ) {
    header("Location:login.php?errCode=1");
    die("請輸入內容");
  }
 
  $sql = sprintf("select * from yide_users where username='%s' and password='%s'",
  $username,
  $password
  );

  $result = $conn->query($sql);

  if(!$result) {
    die($conn->error);
  } else if ($result->num_rows > 0) {
    $_SESSION["username"] = $username;
    header("Location:index.php");

  } else {
    header("Location:login.php?errCode=2");
  }
?>