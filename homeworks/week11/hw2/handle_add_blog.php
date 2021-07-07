<?php
  session_start();
  require_once("conn.php");

  $title = $_POST["blog_title"];
  $content = $_POST["editor1"];

  if (!($title) || !($content)) {
    header("Location:add_blog.php?errCode=2");
    exit();
  }

  $username = NULL;
  if(!empty($_SESSION["username"])) {
    $username = $_SESSION["username"];
  } else {
    exit();
  }

  $sql = "INSERT INTO yide_blog_articles (title, content) VALUES (?, ?)";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param("ss", $title, $content);
  $result = $stmt->execute();

  if(!$result) {
    die($conn->error);
  }

  $result = $stmt->get_result();

  $stmt2 = $conn->prepare("SELECT * FROM yide_blog_articles WHERE title = ? AND content = ?");
  $stmt2->bind_param("ss", $title, $content);
  $result2 = $stmt2->execute();

  if (!$result2) {
    die($conn->error);
  }

  $result2 = $stmt2->get_result();
  $row = $result2->fetch_assoc();
  $id = $row["id"];

  header("Location:blog_itself.php?id=$id");
?>
