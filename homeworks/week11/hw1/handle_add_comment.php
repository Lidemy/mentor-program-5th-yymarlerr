<?php
  session_start();
  require_once("conn.php");
  require_once("utils.php");

  if (
    empty($_POST["content"])
  ) {
    header("Location:index.php?errCode=1");
    die("請輸入內容");
  }
  
  $username = $_SESSION["username"];
  $content = $_POST["content"];

  $sql = 'insert into yide_comments (content, username) values(?, ?)';
  $stmt = $conn->prepare($sql);
  $stmt->bind_param("ss", $content, $username);
  $result = $stmt->execute();
  
  if(!$result) {
    die($conn->error);
  } else {
    header("Location:index.php");
  }
  
?>
