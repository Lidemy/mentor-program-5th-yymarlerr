<?php
  session_start();
  require_once("conn.php");
  require_once("utils.php");

  if (
    empty($_GET["id"])
  ) {
    header("Location:update_comment.php?errCode=1");
    die("請輸入內容");
  }
  
  $id = $_GET["id"];

  $sql = 'update yide_comments set is_deleted=1 where id = ?';
  $stmt = $conn->prepare($sql);
  $stmt->bind_param("i", $id);
  $result = $stmt->execute();
  

  if(!$result) {
    die($conn->error);
  } else {
    header("Location:index.php");
  }

  if(!$resultAdmin) {
    die($conn->error);
  } else {
    header("Location:index.php");
  }
  
?>
