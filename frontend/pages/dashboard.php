<?php include "../Components/head.php" ?>

<body id="myBody">
	<?php include "../Components/navbar.php" ?>
	<div class="content">
		Hello, <?php echo $_SESSION['username'] ?>
	</div>
	<?php if (isset($_SESSION['username']) && $_SESSION['role'] == 'Admin'): ?>
		<table id="users_table" class="table table-striped table-bordered m-5 w-50">
			<thead id="users_tableh" class="table table-dark">
				<th>Username</th>
				<th>Email</th>
				<th>Role</th>
			</thead>
			<tbody id="users_tableb">
			</tbody>
		</table>
	<?php endif; ?>
</body>
</html>