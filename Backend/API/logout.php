<?php 
require "../config/headers.php";

$_SESSION = [];

if (ini_get("session.use_cookies")) {
    $params = session_get_cookie_params();
    setcookie(
        session_name(),
        "",
        time() - 3600,
        $params["path"],
        $params["domain"],
        $params["secure"],
        $params["httponly"]
    );
}

if (session_status() === PHP_SESSION_ACTIVE) {
    session_destroy();
}

echo json_encode ([
    "success"=>true,
    "message"=>"Logged out successfully"
]);
?>