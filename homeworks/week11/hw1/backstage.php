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
  $items_per_page = 10;
  $offset = ($page - 1) * $items_per_page; 
  
  $stmt = $conn->prepare("select * from yide_users order by id asc limit ? offset ?"
  );
  $stmt->bind_param("ii", $items_per_page, $offset);
  $result = $stmt->execute();
  if (!$result) {
    die("Error:" . $conn->error);
  }
  $result = $stmt->get_result(); //執行有成功的話，把結果拿回來
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
    <a href="index.php">回留言板</a>
    <?php } ?>
    <h1>管理員後台</h1>
    <?php
        if(!empty($_GET['errCode'])) {
          $code = $_GET['errCode'];
          $msg = "資料有誤";

          if($code === "1") {
            $msg = "請輸入完整資料";
          }

          if($code === "2") {
            $msg = "資料錯誤";
          }

          echo "<h3>" . $msg . "</h3>";
        }
      ?>
    <div class="form">
      <table class="board__comment">
        <tr class="table_title">
          <th>ID</th>
          <th>暱稱</th>
          <th>帳號</th>
          <th>建立時間</th>
          <th>身份</th>
          <th>編輯身份</th>
        </tr>
        <?php while ($row = $result->fetch_assoc()) { 
        $role = "";
        if ($row["role"] == 1) {
          $role = "一般使用者";
        } else if ($row["role"] == 2) {
          $role = "已停權";
        } else if ($row["role"] == 3) {
          $role = "管理員";
        }
        ?>
        <form action="handle_change_role.php" method="GET" class="form" >
          <tr>
            <th><?php echo escape($row["id"]); ?></th>
            <th><?php echo escape($row["nickname"]); ?></th>
            <th><?php echo escape($row["username"]); ?></th>
            <th><?php echo escape($row["created_at"]); ?></th>
            <th><?php echo $role; ?></th>
            <th>
              <input type="button" name="button" class="edit-role" value="修改"/>
              <input type="hidden" name="userid" value="<?php echo $row["id"] ?>" />
              <input type="hidden" name="page" value="<?php echo $page ?>" />
              <input type="text" name="role" class="hide role"/>
              <input type="submit" class="hide submit"/>
            </th>
          </tr>
        </form>
        <?php } ?>
          
      </table>
    </div>
    <div class="hr"></div>
    <?php
      $stmt = $conn->prepare(
        "select count(id) as count from yide_users"
      );
      $result = $stmt->execute();
      $result = $stmt->get_result();
      $row = $result->fetch_assoc();
      $count = $row["count"];
      $total_pages = ceil($count / $items_per_page);
    ?>
    <div class="page_info">
      <span>總共有 <?php echo $count; ?> 幾筆資料，頁數：</span>
      <span> <?php echo $page; ?> / <?php echo $total_pages; ?></span>
    </div>
    <div class="paginator">
      <?php if ($page != 1) { ?>
        <div><a href="backstage.php?page=1">首頁</a></div>
        <div><a href="backstage.php?page=<?php echo $page - 1; ?>">上一頁</a></div>
      <?php } ?>
      <?php if ($page != $total_pages) { ?>
        <div><a href="backstage.php?page=<?php echo $page + 1; ?>">下ㄧ頁</a></div>
        <div><a href="backstage.php?page=<?php echo $total_pages; ?>">末頁</a></div>
      <?php } ?>
    </div>
  </main>
  <script>
    document.querySelector(".form").addEventListener("click",
      (e) => {
        const parent = e.target.closest(".edit-role")
        if (parent) {
          parent.parentNode.children.item(3).classList.toggle("hide")
          parent.parentNode.children.item(4).classList.toggle("hide")
        }
      }
    )
  </script>
</body>
</html>