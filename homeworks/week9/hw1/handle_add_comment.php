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
  
  $user = getUserFromSession();
  $nickname = $user["nickname"];

  $sql = sprintf('insert into yide_comments (content, nickname) values("%s", "%s")',
    $_POST["content"],
    $nickname
  );

  $result = $conn->query($sql);
  
  if(!$result) {
    die($conn->error);
  } else {
    header("Location:index.php");
  }
  
?>