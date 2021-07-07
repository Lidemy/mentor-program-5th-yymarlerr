<?php
  require_once("conn.php");

  function escape($string) {
    return htmlspecialchars($string, ENT_QUOTES);
  }
?>