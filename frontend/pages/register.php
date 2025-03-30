<?php include "../Components/head.php"?>
<body>
	<?php include "../Components/navbar.php" ?>
	<div class="content">
		<form action="../../backend/register.php" method="post" enctype="multipart/form-data">
			<h2 class="text-primary-emphasis">Register</h2>
			<input required name="username" placeholder="Username" />
			<?php
			if (isset($_SESSION['errors']['username'])) {
				echo '<p class="alert">' . $_SESSION['errors']['username'] . '</p>';
			}
			?>
			<input required pattern="*@*.*" name="email" type="email" placeholder="Email" />
			<?php
			if (isset($_SESSION['errors']['email'])) {
				echo '<p class="alert">' . $_SESSION['errors']['email'] . '</p>';
			}
			?>
			<input required name="password" type="password" placeholder="Password" />
			<input required name="confPassword" type="password" placeholder="Confirm Password" />
			<?php
			if (isset($_SESSION['errors']['password'])) {
				echo '<p class="alert">' . $_SESSION['errors']['password'] . '</p>';
			}
			?>
			<div class="radio-group">
				<p id="role">Role:</p>
				<input required id="admin" type="radio" name="role" value="Admin" />
				<label for="admin">
					Admin
				</label>
				<input required id="user" type="radio" name="role" value="User" />
				<label for="user">
					User
				</label>

			</div>

			<?php
			if (isset($_SESSION['errors']['role'])) {
				echo '<p class="alert">' . $_SESSION['errors']['role'] . '</p>';
			}
			?>
			<label>
				Profile Picture
				<input name="image" type="file" />
			</label>
			<?php
			if (isset($_SESSION['errors']['picture'])) {
				echo '<p class="alert">' . $_SESSION['errors']['picture'] . '</p>';
			}
			// Clear all errors at the end
			unset($_SESSION['errors']);
			?>
			<button  type="submit">Sign up</button>
		</form>
		<img src="../assets/image.png" alt="Sample Image" />
	</div>
</body>

</html>