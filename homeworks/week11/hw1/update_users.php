<?php
  session_start();
  require_once("conn.php");
  require_once("utils.php");

  if (
    empty($_POST["nickname"])
  ) {
    header("Location:index.php?errCode=1");
    die("請輸入內容");
  }
  
  $username = $_SESSION["username"];
  $nickname = $_POST["nickname"];

  $sql = 'update yide_users set nickname=? where username=?';
  $stmt = $conn->prepare($sql);
  $stmt->bind_param("ss", $nickname, $username);
  $result = $stmt->execute();
  
  if(!$result) {
    die($conn->error);
  } else {
    header("Location:index.php");
  }
  
?>
