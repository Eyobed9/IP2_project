<?php
$server = "localhost:3377";
$user_name = "root";
$password = "";
$db_name = "lab2";

$conn = new mysqli($server, $user_name, $password, $db_name);
if ($conn->connect_error)
    echo "Connection error";
// echo "Connection success";

?>