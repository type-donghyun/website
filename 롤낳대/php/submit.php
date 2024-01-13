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
    // 데이터베이스에 저장
    $name = $_POST["name"];
    $riotId = $_POST["riotid"];
    $currrank = $_POST["currrank"];
    $toprank = $_POST["toprank"];
    $toprankseason = isset($_POST["toprankseason"]) ? $_POST["toprankseason"] : "";
    $mainline = $_POST["mainline"];
    $mainlinechampion = isset($_POST["mainlinechampion"]) ? implode(", ", $_POST["mainlinechampion"]) : "";
    $subline = $_POST["subline"];
    $sublinechampion = isset($_POST["sublinechampion"]) ? implode(", ", $_POST["sublinechampion"]) : "";
    $aspiration = $_POST["aspiration"];

    $sql = "INSERT INTO member (name, riotid, currrank, toprank, toprankseason, mainline, mainlinechampion, subline, sublinechampion, aspiration) 
            VALUES ('$name', '$riotId', '$currrank', '$toprank', '$toprankseason', '$mainline', '$mainlinechampion', '$subline', '$sublinechampion', '$aspiration')";

    if ($conn->query($sql) === TRUE) {
        echo "Success";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
} else {
    echo "<p>잘못된 접근입니다.</p>";
    echo "<a href='index.html'>돌아가기</a>";
}

$conn->close();
