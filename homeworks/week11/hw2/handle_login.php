<?php
  session_start();
  require_once("conn.php");

  $username = $_POST["username"];
  $password = $_POST["password"];
  
  $stmt = $conn->prepare("SELECT * FROM yide_blog_users WHERE username = ?");
  $stmt->bind_param("s", $username);
  $result = $stmt->execute();
  $result = $stmt->get_result();
  
  if (!$result) {
    header("Location:login.php?errCode=1");
  }
  
  $row = $result->fetch_assoc();
  if (password_verify($password, $row["password"])) {
    header("Location:index.php");
  } else {
    header("Location:login.php?errCode=2");
  } 

  $_SESSION["username"] = $username;
?>
