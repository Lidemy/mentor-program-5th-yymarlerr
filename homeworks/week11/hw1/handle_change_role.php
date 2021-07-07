<?php
  session_start();
  require_once("conn.php");
  require_once("utils.php");

  $role = $_GET["role"];
  $id = $_GET["userid"];
  $page = $_GET["page"];

  if (!$role) {
    header("Location:backstage.php?errCode=1");
    exit();
  } else if (!($role == 1 || $role == 2 || $role == 3)) {
    header("Location:backstage.php?errCode=2");
    exit();
  } else {
    header("Location:backstage.php?page=$page");
  }
  
  $stmt = $conn->prepare("update yide_users set role = ? where id = ?");
  $stmt->bind_param("ii", $role, $id);
  $stmt->execute();

?>