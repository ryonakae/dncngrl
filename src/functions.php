<?php
// head内の不要なタグを削除
remove_action('wp_head', 'wp_generator');
remove_action('wp_head', 'wp_shortlink_wp_head');
remove_action('wp_head', 'wlwmanifest_link');
remove_action('wp_head', 'rsd_link');
remove_action('wp_head', 'feed_links_extra', 3); // コメントのRSS
remove_action('wp_head', 'rel_canonical');
remove_action('wp_head', 'rest_output_link_wp_head');
remove_action('wp_head', 'wp_oembed_add_discovery_links');
remove_action('wp_head', 'wp_oembed_add_host_js');
remove_action('wp_head', 'adjacent_posts_rel_link_wp_head');
remove_action('wp_head', 'print_emoji_detection_script', 7);
remove_action('wp_print_styles', 'print_emoji_styles');
remove_action('admin_print_scripts', 'print_emoji_detection_script');
remove_action('admin_print_styles', 'print_emoji_styles');

// head内のインラインスタイル削除
function remove_recent_comments_style() {
  global $wp_widget_factory;
  remove_action('wp_head', array( $wp_widget_factory->widgets['WP_Widget_Recent_Comments'], 'recent_comments_style'));
}
add_action('widgets_init', 'remove_recent_comments_style');

// head内のdns-prefetchを削除
function remove_dns_prefetch($hints, $relation_type) {
  if ('dns-prefetch' === $relation_type) {
    return array_diff(wp_dependencies_unique_hosts(), $hints);
  }
  return $hints;
}
add_filter('wp_resource_hints', 'remove_dns_prefetch', 10, 2);

// アイキャッチ画像の有効化
// add_theme_support('post-thumbnails');

// アイキャッチ画像生成時の画質を変更
add_filter('jpeg_quality', function($arg){return 100;});

// セルフピンバックの無効化
function no_self_ping(&$links){
  $home = get_option('home');
  foreach($links as $l => $link)
  if(0 === strpos($link, $home))
  unset($links[$l]);
}
add_action('pre_ping', 'no_self_ping');

// ビジュアルエディタを無効化
function disable_visual_editor_mypost(){
  add_filter('user_can_richedit', 'disable_visual_editor_filter');
}
function disable_visual_editor_filter(){
  return false;
}
add_action('load-post.php', 'disable_visual_editor_mypost');
add_action('load-post-new.php', 'disable_visual_editor_mypost');

// 投稿の自動保存を無効化
function disable_autosave() {
  wp_deregister_script('autosave');
}
add_action('wp_print_scripts', 'disable_autosave');

// カテゴリーを無効化(非表示)
function unregister_categories() {
  register_taxonomy('category', array());
}
add_action('init', 'unregister_categories');
unregister_widget( 'WP_Widget_Categories' );

// タグを無効化
// function unregister_tags() {
//   unregister_taxonomy_for_object_type('post_tag', 'post');
// }
// add_action('init', 'unregister_tags');

// 画像をアップロードしたときにファイル名をタイムスタンプに変更
function rename_mediafile($filename) {
	$info = pathinfo($filename);
	$ext  = empty($info['extension']) ? '' : '.' . $info['extension'];
	if( $info['filename'] != 'sitemap' ){
		$filename = strtolower(time().$ext);
	}
    return $filename;
}
add_filter('sanitize_file_name', 'rename_mediafile', 10);

// Cloudinary
if (function_exists('cloudinary_url')) {
  // デフォルトのフォーマットを設定
  add_filter('cloudinary_default_crop', function($crop) {
    return 'limit';
  }, 10, 1);
  add_filter('cloudinary_default_args', function($args) {
    $args['transform']['crop'] = 'limit';
    $args['transform']['fetch_format'] = 'auto';
    $args['transform']['quality'] = 'auto:best';
    $args['transform']['flags'] = 'progressive';
    return $args;
  });
}

// Enable ACF 5 early access
define('ACF_EARLY_ACCESS', '5');
?>
