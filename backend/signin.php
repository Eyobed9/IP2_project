<?php
require "connection.php";
session_start();

$_SESSION['errorL'] = [];

# Get input from the form

// Check the inputs for errorL and empty values
if (isset($_POST['username']) && !empty(trim($_POST['username'])))
    $username = htmlspecialchars(trim($_POST['username']));
else
    $_SESSION['errorL']['usernameL'] = "Username is required";

if (isset($_POST['password']) && !empty(trim($_POST['password'])))
    $password = htmlspecialchars(trim($_POST['password']));
else
    $_SESSION['errorL']['passwordL'] = "Password is required";

# compare the password and email

// Redirect back to the form if there are errors
if (!empty($_SESSION['errorL'])) {
    header("Location: ../frontend/pages/signin.php");
    exit();
}

// get the password from the database
$sql = "SELECT username, password, role, email, profilepic FROM User WHERE username = ?";
$stmt = $conn->prepare($sql);

if ($stmt) {
    $stmt->bind_param("s", $username);

    // Execute
    if ($stmt->execute()) {
        $stmt->store_result();
        if ($stmt->num_rows > 0) {
            // check the password
            $stmt->bind_result($db_username, $db_password, $db_role, $db_email, $db_profilepic);
            $stmt->fetch();


            if (password_verify($password, $db_password)) {
                $_SESSION['username'] = $db_username;
                $_SESSION['role'] = $db_role;
                
                // redirect
                header("Location: ../frontend/pages/dashboard.php");
                exit();
            } else
                $_SESSION['errorL']['passwordL'] = "Incorrect password";

        } else
            $_SESSION['errorL']['usernameL'] = "Username doesn't exist";
    } else
        echo "Error";
}


// If there are errorL, redirect back to the form
// if(!empty($_SESSION['errorL'])) {
//     header("Location: ../frontend/pages/signin.php");
//     exit();
// }

// if correct lead to the dashboard based on the role of the user
$conn->close();
?>