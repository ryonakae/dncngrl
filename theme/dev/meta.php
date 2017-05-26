<meta charset="<?php bloginfo('charset'); ?>">

<?php
  $title = '';
  $description = '';
  $og_url = '';
  $og_type = '';
  $og_image = '';

  // indexとか一覧系
  if (is_home() || is_archive() || is_post_type_archive() || is_tax()) {
    $title = get_bloginfo('name');
    $description = get_bloginfo('description');
    $og_url = get_bloginfo('url');
    $og_type = 'website';
    $og_image = get_template_directory_uri().'/assets/images/ogp.png';
  }
  else {
    $title = wp_title('-', false, 'right').get_bloginfo('name');
    $og_url = get_permalink();
    $og_type = 'article';

    // description
    // 抜粋がある時
    if (get_the_excerpt() != '') {
      $description = get_the_excerpt();
    }
    // 抜粋がない→本文から指定文字数をdescriptionにする
    else {
      $post_id = get_the_ID();
      $post = get_post($post_id);
      $content = $post->post_content;
      $content = apply_filters('the_content', $content);
      $content = strip_tags($content);
      $content = str_replace(" ", "", $content);
      $content = str_replace("　", "", $content);
      $description = mb_strimwidth($content, 0, 100, "…");
    }

    // og_image
    if (get_field('works-imagelist')) {

    }
    else if (has_post_thumbnail()) {
      $thumbnail_id = get_post_thumbnail_id($post->ID);
      $image = wp_get_attachment_image_src( $thumbnail_id, 'medium' );
      $og_image = $image[0];
    }
    else {
      $og_image = get_template_directory_uri().'/dist/img/ogp.png';
    }
  }
?>

<title><?php bloginfo('name'); ?></title>
<meta name="description" content="<?php echo $description; ?>">
<meta name="robots" content="index,follow">
<meta name="viewport" content="width=device-width, maximum-scale=1.0">
