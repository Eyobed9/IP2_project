<?php
require "connection.php";
header('Content-Type: application/json');
session_start();

// get the users list from the database 
$sql = "SELECT username, email, role, profilePic FROM User";
$result = $conn->query($sql);

if($result->num_rows > 0)  {
    $users = $result->fetch_all(MYSQLI_ASSOC);
}
else {
    $users = ["No users in the database"];
}


// send the users list using API
echo json_encode($users);
?>