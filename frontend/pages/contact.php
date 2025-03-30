<?php include "../Components/head.php" ?>

<body>
  <?php include "../Components/navbar.php" ?>
  </header>

  <div class="new-container">
    <h1 class="text-primary-emphasis fs-2">Contact Us</h1>
    <form action="#" method="post">
      <input type="text" name="name" placeholder="Your Name" required />
      <input type="email" name="email" placeholder="Your Email" required />
      <textarea name="message" rows="5" placeholder="Your Message" required></textarea>
      <button type="submit">Send Message</button>
    </form>
  </div>
</body>

</html>