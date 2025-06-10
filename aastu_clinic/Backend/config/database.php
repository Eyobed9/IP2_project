<?php

// Database connection
$host = "localhost:3306";
$db_name = "aastu_clinic";
$username = "root";
$password = "";

# Creating connection
$conn = new mysqli($host, $username, $password, $db_name);
if($conn->connect_error) {
    die("Connection failed: ". $conn->connect_error);
}
// echo "Connected successfully";
?>
