<?php
  session_start();
  require_once("conn.php");
  require_once("utils.php");
  
  $username = NULL;
  $user = NULL;
  
  if(!empty($_SESSION["username"])) {
    $username = $_SESSION["username"];
    $user = getUserFromSession($username);
  }
  
  $page = 1;
  if (!empty($_GET["page"])) {
    $page = intval($_GET["page"]);
  }
  $items_per_page = 5;
  $offset = ($page - 1) * $items_per_page; 
  
  $stmt = $conn->prepare(
    "select " . 
    "C.id as id, C.content as content, U.nickname as nickname, 
    C.created_at as created_at, U.username as username " . 
    "from yide_comments as C " . 
    "left join yide_users as U on C.username = U.username " .
    "where C.is_deleted IS NULL " .
    "order by C.id desc " .
    "limit ? offset ?"
  );

  $stmt->bind_param("ii", $items_per_page, $offset);
  $result = $stmt->execute();
  if (!$result) {
    die("Error:" . $conn->error);
  }
  $result = $stmt->get_result(); //執行有成功的話，把結果拿回來

  $stmtAdmin = $conn->prepare("select * from yide_users where role = 3 and id = ?");
  $stmtAdmin->bind_param("i", $user["id"]);
  $resultAdmin = $stmtAdmin->execute();
  $resultAdmin = $stmtAdmin->get_result();
  $admin = $resultAdmin->fetch_assoc();
  $passwordAdmin = $admin["password"];

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
    <?php if ($username && $user["role"] == 3) { ?>
      <a href="backstage.php">管理後台</a>
    <?php } ?>
    <span class="edit-button">編輯暱稱</span> 
    <?php } ?>
    <h1>留言板</h1>
    <?php if ($username && $user["role"] != 2) { ?>
      <form method="post" action="update_users.php" class="hide update_nickname"/>
        新的暱稱：<input type="text" name="nickname" class="new_nickname" />
        <input type="submit" class="board__submit-button"/>
      </form>
      <div class="greeting" >你好！<?php echo $user["nickname"]; ?></div>
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
      <textarea row="5" placeholder="你想說些什麼呢"  name="content" ></textarea>
      <input type="submit" class="board__submit-button" value="送出">
    <?php } else if ($username && $user["role"] == 2) { ?>
      <form method="post" action="update_users.php" class="hide update_nickname"/>
        新的暱稱：<input type="text" name="nickname" class="new_nickname" />
        <input type="submit" class="board__submit-button"/>
      </form>
      <div class="greeting" >你好！<?php echo $user["nickname"]; ?></div>
      <h3>帳號遭停權，無法新增留言</h3>
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
              <?php echo escape($row["nickname"]); ?>
              <?php echo escape("(@" . $row["username"] . ")"); ?>
              <span class="date">
                <?php echo escape($row["created_at"]); ?>
              </span>
              <?php if ($row["username"] === $username && $user["role"] == 1) { ?>
                <a class="edit_content" href="update_comment.php?id=<?php echo $row['id']?>">編輯</a>
                <a class="edit_content" href="handle_delete_comment.php?id=<?php echo $row['id']?>">刪除</a>
                <?php } else if ($row["username"] === $username && $user["role"] == 3) { ?>
                  <a class="edit_content" href="update_comment_admin.php?id=<?php echo $row['id']?>&token=<?php echo $passwordAdmin?>">編輯</a>
                  <a class="edit_content" href="handle_delete_comment_admin.php?id=<?php echo $row['id']?>&token=<?php echo $passwordAdmin?>">刪除</a>
                <?php } ?>
            </div>
            <div class="card__content"><?php echo escape($row["content"]); ?></div>
          </div>
        </div>
      <?php } ?>
      </div>     
    </section>
    <div class="hr"></div>
    <?php
      $stmt = $conn->prepare(
        "select count(id) as count from yide_comments where is_deleted IS NULL"
      );
      $result = $stmt->execute();
      $result = $stmt->get_result();
      $row = $result->fetch_assoc();
      $count = $row["count"];
      $total_pages = ceil($count / $items_per_page);
    ?>
    <div class="page_info">
      <span>總共有 <?php echo $count; ?> 幾筆留言，頁數：</span>
      <span> <?php echo $page; ?> / <?php echo $total_pages; ?></span>
    </div>
    <div class="paginator">
      <?php if ($page != 1) { ?>
        <div><a href="index.php?page=1">首頁</a></div>
        <div><a href="index.php?page=<?php echo $page - 1; ?>">上一頁</a></div>
      <?php } ?>
      <?php if ($page != $total_pages) { ?>
        <div><a href="index.php?page=<?php echo $page + 1; ?>">下ㄧ頁</a></div>
        <div><a href="index.php?page=<?php echo $total_pages; ?>">末頁</a></div>
      <?php } ?>
    </div>
  </main>
  <script>
    document.querySelector(".edit-button").addEventListener("click", (
      ) => {  
        let updateNickname = document.querySelector(".update_nickname")
        updateNickname.classList.toggle("hide")
      }
    )
  </script>
</body>
</html>