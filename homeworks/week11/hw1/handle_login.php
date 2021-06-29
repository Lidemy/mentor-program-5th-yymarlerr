<?php
  session_start();
  require_once("conn.php");
  require_once("utils.php");

  $username = $_POST["username"];
  $password = $_POST["password"]; 

  if (
    empty($username) ||
    empty($password)
  ) {
    header("Location:login.php?errCode=1");
    die("請輸入內容");
  }
 
  $sql = "select * from yide_users where username=?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('s', $username);
  $result = $stmt->execute();
  $result = $stmt->get_result();
  
  if ($result->num_rows === 0) {
    header("Location:login.php?errCode=2");
    exit();
  }
  
  $row = $result->fetch_assoc();
  if (PASSWORD_VERIFY($password, $row['password']));

  if(!$result) {
    die($conn->error);
  } else if ($result->num_rows > 0) {
    $_SESSION["username"] = $username;
    header("Location:index.php");

  } else {
    header("Location:login.php?errCode=2");
  }
?>