<nav>
    <a href="index.php">Home</a>
    <?php session_start() ?>
    <?php if (isset($_SESSION['username'])): ?>
        <a href="dashboard.php">Dashboard</a>
        <a href="contact.php">Contact</a>
        <a href="about.php">About</a>
        <a href="../../backend/logout.php">Logout</a>
    <?php else: ?>
        <a href="contact.php">Contact</a>
        <a href="about.php">About</a>
        <a href="register.php">Register</a>
        <a href="signin.php">Signin</a>
    <?php endif; ?>
</nav>