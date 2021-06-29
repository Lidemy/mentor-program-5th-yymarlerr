<?php
  session_start();
  require_once("conn.php");
  require_once("utils.php");
  
  $username = NULL;
  $user = NULL;
  $id = $_GET["id"];
  
  if(!empty($_SESSION["username"])) {
    $username = $_SESSION["username"];
    $user = getUserFromSession($username);
  }
  
  $stmt = $conn->prepare("select * from yide_comments where id = ? and username = ?");
  $stmt->bind_param('is', $id, $_SESSION["username"]);
  $result = $stmt->execute();
  if (!$result) {
    die("Error:" . $conn->error);
  }
  $result = $stmt->get_result(); //執行有成功的話，把結果拿回來
  $row = $result->fetch_assoc();
?>


<DOCTYPE! html>

<html lang="en">
<head>
  <meta charset="utf-8">
  <title>留言板</title>
  <link rel="stylesheet" href="./style.css">

</head>

<body>
  <header class="warning">
      <strong>注意！本站為練習用網站，因教學用途刻意忽略資安的實作，
      註冊時請勿使用任何真實的帳號或密碼</strong>
  </header>
  <main class="board">
    <h1>編輯留言</h1>
      <?php
        if(!empty($_GET['errCode'])) {
          $code = $_GET['errCode'];
          $msg = "資料有誤";

          if($code === "1") {
            $msg = "請輸入完整資料";
          }

          echo "<h3>" . $msg . "</h3>";
        }
      ?>
    <form method="POST" action="handle_update_comment.php">
      <textarea row="5" placeholder="你想說些什麼呢"  name="content" ><?php echo $row["content"]; ?></textarea>
      <input type="submit" class="board__submit-button" value="送出">
      <input type="hidden" name="id" value="<?php echo $row['id'] ?>" />
    </form>
    
  </main>
</body>
</html>