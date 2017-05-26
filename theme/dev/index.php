<!DOCTYPE html>
<html lang="ja" prefix="og: http://ogp.me/ns#">
<head>
  <?php include('meta.php'); ?>
  <?php wp_head(); ?>
  <script src="<?php echo get_template_directory_uri(); ?>/assets/scripts/lib.js"></script>
</head>
<body style="background-color:#080808;">
  <div id="app"></div>
  <script src="<?php echo get_template_directory_uri(); ?>/assets/scripts/app.js"></script>
  <?php wp_footer(); ?>
</body>
</html>
