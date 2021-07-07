<?php
  session_start();
  require_once("conn.php");
  require_once("utils.php");
  
  $stmt = $conn->prepare("SELECT * FROM yide_blog_articles ORDER BY id DESC");
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
            <ul><a href="add_blog.php">新增文章</a></ul>
            <ul><a href="logout.php">登出</a></ul>
          </nav>
        </section>
      </div>
      <section class="section_banner">
        <h2>管理後檯</h2>
        <p>Ｗelcome to My Blog</p>
      </section>
      <main>
        <div class="cards">
        <?php while ($row = $result->fetch_assoc()) {
          if ($row["is_deleted"] === 1) { 
        ?>
          <div class="article_list">
            <div class="article_info">
              <div class="article_list_title"><a href=blog_itself.php?id=<?php echo $row["id"] ?>><?php echo escape($row["title"]); ?></a></div>
              <div>
                <div class="article_list_time"><?php echo $row["time"]; ?></div>
                <div class="edit_button"><a href="edit_blog.php?id=<?php echo $row["id"] ?>">編輯</a></div>
                <div class="edit_button"><a href="handle_delete_blog.php?id=<?php echo $row["id"] ?>">刪除</a></div>
              </div>
            </div>
            <hr />
          </div>
        <?php }
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