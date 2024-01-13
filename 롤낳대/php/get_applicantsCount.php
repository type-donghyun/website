<?php
$host = "222.119.120.28:3306";
$username = "admin";
$password = "root";
$database = "lol";

$conn = new mysqli($host, $username, $password, $database);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT COUNT(*) as count FROM member";
$result = $conn->query($sql);

if ($result) {
    $row = $result->fetch_assoc();
    echo $row['count'];
} else {
    echo "Error: " . $conn->error;
}

$conn->close();
