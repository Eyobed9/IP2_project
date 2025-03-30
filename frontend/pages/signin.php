<?php include "../Components/head.php"?>
<body>
	<?php include "../Components/navbar.php" ?>
	<div class="content">
		<form action="../../backend/signin.php" method="post" enctype="multipart/form-data">
			<h2 class="text-primary-emphasis">Login</h2>
			<input required name="username" placeholder="Username" />
			<?php if (isset($_SESSION['errorL']['usernameL']))
				echo '<p class="alert">' . $_SESSION['errorL']['usernameL'] . '</p>';
			?>

			<input required name="password" type="password" placeholder="Password" />
			<?php if (isset($_SESSION['errorL']['passwordL']))
				echo '<p class="alert">' . $_SESSION['errorL']['passwordL'] . '</p>';
			unset($_SESSION['errorL']);
			?>
			<button type="submit">Sign in</button>
		</form>
		<img src="../assets/image.png" alt="Sample Image" />
	</div>
</body>

</html>