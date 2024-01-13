<?php

$host = "222.119.120.28:3306";
$username = "admin";
$password = "root";
$database = "lol";

$conn = new mysqli($host, $username, $password, $database);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// UTF-8 인코딩 설정
$conn->set_charset("utf8");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST["name"];
    $riotId = $_POST["riotid"];

    // 이름과 Riot ID를 기준으로 중복 체크
    $sql = "SELECT * FROM member WHERE name = '$name' AND riotid = '$riotId'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        // 중복된 정보가 있을 경우
        $response = array("duplicate" => true);
        echo json_encode($response);
    } else {
        // 중복된 정보가 없을 경우
        $response = array("duplicate" => false);
        echo json_encode($response);
    }
} else {
    echo "<p>잘못된 접근입니다.</p>";
    echo "<a href='index.html'>돌아가기</a>";
}

$conn->close();
