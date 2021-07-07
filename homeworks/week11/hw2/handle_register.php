<?php
  session_start();
  require_once("conn.php");
  
  $username = $_POST["username"];
  $password = password_hash($_POST["password"], PASSWORD_DEFAULT);

  $stmt = $conn->prepare("INSERT INTO yide_blog_users (username, password) VALUES (?, ?)");
  $stmt->bind_param("ss", $username, $password);
  $stmt->execute();

  
?>
