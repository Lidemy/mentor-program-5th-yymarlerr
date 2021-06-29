<?php
  session_start();
  require_once("conn.php");
  
  $username = NULL;

  if(!empty($_SESSION["username"])) {
    $username = $_SESSION["username"];
  }
  
  $stmt = $conn->prepare("SELECT * FROM yide_blog_articles WHERE is_deleted=1 ORDER BY id DESC LIMIT 5");
  $stmt->execute();
  $result = $stmt->get_result();
?>


<DOCTYPE! html>

<html lang="en">
<head>
  <meta charset="utf-8">
  <title>部落格</title>
  <link rel="stylesheet" href="./style.css">
</head>

<body>
  <div class="wrapper">
    <div class="upper_part">
      <div class="section_header">
        <section class="section_first">
          <h1><a href="index.php">山の文</a></h1>
          <nav>
            <ul><a href="articles_list.php">文章列表</a></ul>
            <ul>分類專區</ul>
            <ul>關於我</ul>
          </nav>
        </section>
        <section class="section_second">
          <nav>
            <?php if ($username) { ?>
            <ul><a href="backstage.php">管理後檯</a></ul>
            <ul><a href="logout.php">登出</a></ul>
            <?php } else { ?>
            <ul><a href="login.php">登入</a></ul>
            <?php } ?>
          </nav>
        </section>
      </div>
      <section class="section_banner">
        <h2>存放記錄之地</h2>
        <p>Ｗelcome to My Blog</p>
      </section>
      <main>
        <div class="cards">
          <?php 
            while ($row = $result->fetch_assoc()) {
          ?>
          <div class="card">
            <div class="card_first_part">
              <div class="article_title"><?php echo $row["title"]; ?></div>
              <?php if ($username) { ?>
              <div class="edit_button"><a href="edit_blog.php?errCode=&id=<?php echo $row["id"] ?>">編輯</a></div>
              <?php } ?>
            </div>
            <div class="time"><?php echo $row["time"]; ?> 歷史公告</div>
            <div class="article_content hide_overflow">
              <?php echo $row["content"]; ?>
            </div>
            <div class="read_article">
              <a href="blog_itself.php?id=<?php echo $row["id"]; ?>">READ MORE</a>
            </div>
          </div>
          <?php 
            } 
          ?>
        </div>
      </main>
    </div>
    <footer>
    Copyright © 2020 Who's Blog All Rights Reserved.
    </footer>
  </div>
</body>
</html>