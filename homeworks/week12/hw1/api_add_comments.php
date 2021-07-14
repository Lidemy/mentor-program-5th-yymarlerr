<?php
  require_once('conn.php');
  header('conten-type:application/json;charset:utf-8'); //瀏覽器才知道是 JSON 格式的資料
  header('Access-Control-Allow-Origin: *');


  if (
      empty($_POST['content']) ||
      empty($_POST['nickname']) ||
      empty($_POST['site_key'])
    ) {
      $json = array(
      "ok" => false,
      "message" => "Missing information, please fill in the blanks"
    );

    $response = json_encode($json);
    echo $response;
    die();
  }

  $content = $_POST['content'];
  $nickname = $_POST['nickname'];
  $site_key = $_POST['site_key'];

  $sql = 'insert into yide_board_discussions(content, nickname, site_key) values (?, ?, ?)';
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('sss', $content, $nickname, $site_key);
  $result = $stmt->execute();

  if(!$result) {
    $json = array(
      "ok" => false,
      "message" => $conn->error
    );
    $response = json_encode($json);
    echo $response;
    die();
  }

  $json = array(
    "ok" => true,
    "message" => "success"
  );
  $response = json_encode($json);
  echo $response;
?>