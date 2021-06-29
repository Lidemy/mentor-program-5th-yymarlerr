<?php
  session_start();
  require_once("conn.php");

  $title = $_POST["blog_title"];
  $content = $_POST["editor1"];
  $id = $_GET["id"];

  if (!($title) || !($content)) {
    header("Location:edit_blog.php?errCode=2&id=$id");
    exit();
  }

  $username = NULL;
  if(!empty($_SESSION["username"])) {
    $username = $_SESSION["username"];
  } else {
    exit();
  }
 
  $stmt = $conn->prepare("UPDATE yide_blog_articles SET title = ?, content = ? WHERE id = ?");
  $stmt->bind_param("ssi", $title, $content, $id);
  $stmt->execute();
  $result = $stmt->get_result();

  header("Location:blog_itself.php?id=$id");


  /* 這邊 $result 沒有值不知道為什麼
  if(!$result) {
    die($conn->error);
  } else {
    header("Location:blog_itself.php?id=$id");
  }
  */
?>
