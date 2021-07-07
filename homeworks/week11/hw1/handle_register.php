<?php
  session_start();
  require_once("conn.php");

  $nickname = $_POST["nickname"];
  $username = $_POST["username"];
  $password = password_hash($_POST["password"], PASSWORD_DEFAULT); 

  if (
    empty($nickname) ||
    empty($username) ||
    empty($password)
  ) {
    header("Location:register.php?errCode=1");
    die("請輸入內容");
  }
 
  $sql = "insert into yide_users(nickname, username, password) values(?, ?, ?)";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('sss', $nickname, $username, $password);
  $result = $stmt->execute();

  if(!$result) {
    if ($conn->errno === 1062) {
      header("Location: register.php?errCode=2");
    }
    die($conn->error);
  } else {
    $_SESSION['username'] = $username;
    header("Location:index.php");
  }
  
?>