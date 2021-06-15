<?php
  require_once("conn.php");

  function getUserFromSession() {
      global $conn;
      $sql = sprintf("select * from yide_users where username = '%s'",
      $_SESSION["username"]
      );
      $result = $conn->query($sql);
      $row = $result->fetch_assoc();
      return $row;
  }
  

?>