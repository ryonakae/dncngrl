<?php
  // head内の不要なタグを削除
  remove_action('wp_head', 'wp_generator');
  remove_action('wp_head', 'wp_shortlink_wp_head');
  remove_action('wp_head', 'wlwmanifest_link');
  remove_action('wp_head', 'rsd_link');
  remove_action('wp_head', 'feed_links_extra', 3); // コメントのRSS
  remove_action('wp_head', 'adjacent_posts_rel_link_wp_head');

  function deregister_js() {
    // devicepx-jetpack.js
    wp_dequeue_script('devicepx');
  }
  add_action( 'wp_enqueue_scripts', 'deregister_js', 20 );

  function deregister_css() {
    // jetpack.css
    wp_dequeue_style('jetpack');
  }
  add_action( 'wp_enqueue_style', 'deregister_css', 15 );

  // インラインスタイル削除
  function remove_recent_comments_style() {
    global $wp_widget_factory;
    remove_action( 'wp_head', array( $wp_widget_factory->widgets['WP_Widget_Recent_Comments'], 'recent_comments_style' ) );
  }
  add_action( 'widgets_init', 'remove_recent_comments_style' );

  // アイキャッチ画像の有効化
  add_theme_support('post-thumbnails');
  // add_image_size('thumbnail_small', 360, 360, false);
  // add_image_size('square_medium', 640, 640, true);

  // アイキャッチ画像生成時の画質を変更
  add_filter('jpeg_quality', function($arg){return 95;});

  // セルフピンバックの無効化
  function no_self_ping(&$links){
    $home = get_option('home');
    foreach($links as $l => $link)
      if(0 === strpos($link, $home))
        unset($links[$l]);
    }
  add_action('pre_ping', 'no_self_ping');
?>