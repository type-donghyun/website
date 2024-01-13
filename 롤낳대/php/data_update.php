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
    // 데이터베이스에서 기존 정보 찾기
    $name = $_POST["name"];
    $riotId = $_POST["riotid"];

    $selectSql = "SELECT * FROM member WHERE name = '$name' AND riotid = '$riotId'";
    $result = $conn->query($selectSql);

    if ($result->num_rows > 0) {
        // 이미 있는 정보가 있다면 업데이트 수행
        $currrank = $_POST["currrank"];
        $toprank = $_POST["toprank"];
        $toprankseason = isset($_POST["toprankseason"]) ? $_POST["toprankseason"] : "";
        $mainline = $_POST["mainline"];
        $mainlinechampion = isset($_POST["mainlinechampion"]) ? implode(", ", $_POST["mainlinechampion"]) : "";
        $subline = $_POST["subline"];
        $sublinechampion = isset($_POST["sublinechampion"]) ? implode(", ", $_POST["sublinechampion"]) : "";
        $aspiration = $_POST["aspiration"];

        // 업데이트 쿼리 작성
        $updateSql = "UPDATE member SET currrank = '$currrank', toprank = '$toprank', toprankseason = '$toprankseason', mainline = '$mainline', mainlinechampion = '$mainlinechampion', subline = '$subline', sublinechampion = '$sublinechampion', aspiration = '$aspiration' WHERE name = '$name' AND riotid = '$riotId'";

        // 업데이트 쿼리 실행
        if ($conn->query($updateSql) === TRUE) {
            echo "Success";
        } else {
            echo "Error: " . $updateSql . "<br>" . $conn->error;
        }
    }
} else {
    echo "<p>잘못된 접근입니다.</p>";
    echo "<a href='index.html'>돌아가기</a>";
}

$conn->close();
