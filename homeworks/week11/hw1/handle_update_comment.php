<?php
  session_start();
  require_once("conn.php");
  require_once("utils.php");

  if (
    empty($_POST["content"])
  ) {
    header("Location:update_comment.php?errCode=1&id=" . $_POST['id']);
    die("請輸入內容");
  }
  
  $username = $_SESSION["username"];
  $id = $_POST["id"];
  $content = $_POST["content"];

  $sql = 'update yide_comments set content = ? where id = ?';
  $stmt = $conn->prepare($sql);
  $stmt->bind_param("si", $content, $id);
  $result = $stmt->execute();
  
  if(!$result) {
    die($conn->error);
  } else {
    header("Location:index.php");
  }
  
?>
