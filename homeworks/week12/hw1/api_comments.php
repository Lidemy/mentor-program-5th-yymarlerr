<?php
  require_once('conn.php');
  header('conten-type:application/json;charset:utf-8'); //瀏覽器才知道是 JSON 格式的資料
  header('Access-Control-Allow-Origin: *');

  if (
      empty($_GET['site_key'])
    ) {
      $json = array(
      "ok" => false,
      "message" => "Please send site_key in url"
    );

    $response = json_encode($json);
    echo $response;
    die();
  }

  $site_key = $_GET['site_key'];

  $sqlCounts = 'SELECT COUNT(*) FROM yide_board_discussions';
  $stmtCounts = $conn->prepare($sqlCounts);
  $resultCounts = $stmtCounts->execute();

  if(!$resultCounts) {
    $json = array(
      "ok" => false,
      "message" => $conn->error
    );
    $response = json_encode($json);
    echo $response;
    die();
  }

  $resultCounts = $stmtCounts->get_result();
  $rowCounts = $resultCounts->fetch_assoc();
  $total = $rowCounts["COUNT(*)"];


  if (
    empty($_GET['before'])
  ) {
    $json = array(
    "ok" => false,
    "message" => "Please send the value for before in url"
    );
  }

  $sql = 'select * from yide_board_discussions
    where site_key = ? and id < ? order by id desc limit 5';
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('si', $site_key, $_GET['before']);
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

  $result = $stmt->get_result();
  $discussion = array();
  while ($row = $result->fetch_assoc()) {
    array_push($discussion, array(
      "id" => $row["id"],
      "nickname" => $row["nickname"],
      "content" => $row["content"],
      "created_at" => $row["created_at"],
      "total" => $total
    ));
  }

  $json = array(
    "ok" => true,
    "discussion" => $discussion
  );
  $response = json_encode($json);
  echo $response;
?>
