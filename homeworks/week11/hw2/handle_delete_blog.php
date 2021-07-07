<?php
  session_start();
  require_once("conn.php");

  $id = $_GET["id"];
 
  $stmt = $conn->prepare("UPDATE yide_blog_articles SET is_deleted = 2 WHERE id = $id");
  $stmt->bind_param("i", $id);
  $result = $stmt->execute();
  if(!$result) {
    die($conn->error);
  }

  header("Location:backstage.php");
  
?>
