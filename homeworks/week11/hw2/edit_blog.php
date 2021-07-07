<?php
  session_start();
  require_once("conn.php");
  require_once("utils.php");

  $id = $_GET["id"];
  $stmt = $conn->prepare("SELECT * FROM yide_blog_articles WHERE id = ?");
  $stmt->bind_param("i", $id);
  $stmt->execute();
  $result = $stmt->get_result();
  if (!$result) {
    die("$conn->error");
  }

  $row = $result->fetch_assoc();
  
  if(!empty($_GET["errCode"])) {
    $code = $_GET["errCode"];
    if ($code == 2) {
    $msg = "標題或內容為空白";
    } else {
    $msg = "出現錯誤";
    }
  }

  $username = NULL;
  if(!empty($_SESSION["username"])) {
    $username = $_SESSION["username"];
  }
?>


<DOCTYPE! html>

<html lang="en">
<head>
  <meta charset="utf-8">
  <title>部落格</title>
  <link rel="stylesheet" href="./style.css">
  <script src="https://cdn.ckeditor.com/4.16.1/standard-all/ckeditor.js"></script>
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
          <div class="card">
          <?php if(!empty($_GET["errCode"])) { ?>
          <div class="reminder"><?php echo $msg; ?></div>
          <?php } ?>
            <div class="card_first_part">
              <h3 class="publish_blog">發表文章：</h3>
            </div>
            <form method="POST" action="handle_edit_blog.php?id=<?php echo $row["id"] ?>">
              <div><input type="text" class="enter_blog_title" value="<?php echo $row["title"] ?>" name="blog_title"/></div>
              <div class="blog_type">請輸入文章分類</div>
              <textarea cols="10" id="editor1" name="editor1" rows="10" data-sample-short>
                  <?php echo $row["content"] ?>
              </textarea>
              <input class="submit_blog" name="type" type="submit" value="送出文章" />
            </form>
          </div>
        </div>
      </main>
    </div>
    <footer>
    Copyright © 2020 Who's Blog All Rights Reserved.
    </footer>
  </div>
  <script>
    CKEDITOR.replace('editor1', {
      extraPlugins: 'editorplaceholder',
      editorplaceholder: 'Start typing here...'
    });
  </script>
</body>
</html>