<?php
require "../config/headers.php";


if (isset($_SESSION['user'])) {
    echo json_encode([
        "loggedIn" => true,
        "user" => $_SESSION["user"],
        "role" => $_SESSION["user"]["role"]
    ]);
} else {
    echo json_encode([
        "loggedIn" => false
    ]);
}
?>