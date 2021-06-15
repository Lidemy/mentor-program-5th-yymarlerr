<?php
  session_start();
  require_once("conn.php");
  require_once("utils.php");
  
  $username = NULL;
  
  if(!empty($_SESSION["username"])) {
    $username = $_SESSION["username"];
  }
  
  $result = $conn->query("select * from yide_comments order by id desc");
  if (!$result) {
    die("Error:" . $conn->error);
  }
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
    <?php if (!$username) { ?>
    <a href="register.php">註冊</a>
    <a href="login.php">登入</a>
    <?php } else { ?>
    <a href="logout.php">登出</a>
    <?php } ?>
    <h1>Comments</h1>
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
    <form method="POST" action="handle_add_comment.php">
    <?php if ($username) { ?>
      <div class="greeting" >你好！
        <?php echo $username; ?>
      </div>
      <textarea row="5" placeholder="你想說些什麼呢"  name="content" ></textarea>
      <input type="submit" class="board__submit-button" value="送出">
    <?php } else { ?>
      <h3>請登入發布留言</h3>
    <?php } ?>
    </form>
    <div class="hr"></div>
    <section class="board__comment">
      <div class="cards">
      <?php  while ($row = $result->fetch_assoc()) { ?>
        <div class="card__info">
          <div class="card__avatar"></div>
          <div class="card__comment">
            <div class="card__author">
              <?php echo $row["nickname"]; ?>
              <span class="date">
                <?php echo $row["created_at"]; ?>
              </span>
            </div>
            <div class="card__content"><?php echo $row["content"]; ?></div>
          </div>
        </div>
      <?php } ?>
      </div>     
    </section>
  </main>
</body>
</html>