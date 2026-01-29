<?php
# -- BEGIN LICENSE BLOCK ---------------------------------------
# This file is part of Ductile, a theme for Dotclear
#
# Copyright (c) 2011 - Association Dotclear
# Licensed under the GPL version 2.0 license.
# See LICENSE file or
# http://www.gnu.org/licenses/old-licenses/gpl-2.0.html
#
# -- END LICENSE BLOCK -----------------------------------------

if (!defined('DC_RC_PATH')) { return; }

l10n::set(dirname(__FILE__).'/locales/'.dcCore::app()->lang.'/main');

# Access to twitter-player
dcCore::app()->url->register('twitterplayer', 'm', '^twitter-player(?:/(.+))?$', ['CPU15_url', 'twitterplayer']);
dcCore::app()->url->register('showshortcut', 'ex', '^([0-9]{1,4})$', ['CPU15_url', 'showshortcut']);

dcCore::app()->tpl->addValue('EntryURLsegment',['CPU15_template','EntryURLsegment']);
dcCore::app()->tpl->addBlock('Entry1stLevelCategory',['CPU15_template','Entry1stLevelCategory']);
dcCore::app()->tpl->addValue('CountEntriesInSeries',['CPU15_template','CountEntriesInSeries']);
dcCore::app()->tpl->addValue('EpisodeNumber',['CPU15_template','EpisodeNumber']);
dcCore::app()->tpl->addValue('EpisodeCountReset',['CPU15_template','EpisodeCountReset']);

dcCore::app()->tpl->addBlock('AttachmentsNo',['CPU15_template','AttachmentsNo']);
dcCore::app()->tpl->addBlock('SeriesNotLostAndFound', ['CPU15_template', 'SeriesNotLostAndFound']);
dcCore::app()->tpl->addBlock('EpisodeCountLowerThan', ['CPU15_template', 'EpisodeCountLowerThan']);

class CPU15_url extends dcUrlHandlers
{

	public static function twitterplayer($args) {
		if ($args === '') {
			# No entry was specified.
			self::p404();
		}

		dcCore::app()->blog->withoutPassword(false);
		$params = new ArrayObject([ 'post_url' => $args ]);
		dcCore::app()->callBehavior('publicPostBeforeGetPosts',$params,$args);

		dcCore::app()->ctx->posts = dcCore::app()->blog->getPosts($params);
		if (dcCore::app()->ctx->posts->isEmpty()) {
			# The specified entry does not exist.
			self::p404();
		}

		self::serveDocument('twitter-player.html');
	}	

	public static function showshortcut($args) {
		if ($args === '') {
			# No entry was specified.
			self::p404();
		}

		$numero = str_pad(strval(intval($args, 10)), 4, '0', STR_PAD_LEFT);

		dcCore::app()->blog->withoutPassword(false);
		$params = new ArrayObject([
			'post_status' 	=> 1, 		# published
			'post_type'		=> 'post',
			'no_content' 	=> true, 		# no need to fetch contents
			'sql' 			=> ' and ( "post_title" like \'Ex'.$numero.'%\' )'

		]);
		$post = dcCore::app()->blog->getPosts($params);
		if ($post->isEmpty()) {
			# The specified entry does not exist.
			self::p404();
		}

		$redirect = '/post/'.$post->post_url;
		header('HTTP/1.1 301 Moved Permanently');
		header('Location: '.$redirect);
		header('Content-Type: text/html; charset=UTF-8');
		echo '<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"><html>
				<head>
					<title>Ce document est à une autre adresse - This document is at another location</title>
					<meta http-equiv="refresh" content="0;url='.$redirect.'" />
					<link rel="top" href="/" />
					<link rel="canonical" href="'.$redirect.'" />
				</head><body>
					<p lang="fr"><a href="'.$redirect.'">Ce document est en fait à une autre adresse, canonique&nbsp;: '.$redirect.'</a></p>
					<p lang="en"><a href="'.$redirect.'">This document is actually at this canonical address&nbsp;: '.$redirect.'</a></p>
				</body>
				</html>';

		exit;
	}
}

class CPU15_template
{
	public static function AttachmentsNo($attr, $content) {
		return
		"<?php\n".
		'if (dcCore::app()->ctx->posts !== null && dcCore::app()->media) {'."\n".
			'dcCore::app()->ctx->attachments = new ArrayObject(dcCore::app()->media->getPostMedia(dcCore::app()->ctx->posts->post_id));'."\n".
		"?>\n".
		
		'<?php if (sizeof(dcCore::app()->ctx->attachments) === 0) ?>'.
		$content.
		
		"<?php } ?>\n";
	}

	public static function EntryURLsegment($attr) {
		return '<?php echo dcCore::app()->ctx->posts->post_url ; ?>';
	}

	public static function Entry1stLevelCategory($attr,$content) {
		return
		"<?php\n".
		'dcCore::app()->ctx->categories = dcCore::app()->blog->getCategoryParents(dcCore::app()->ctx->posts->cat_id);'."\n".
		'dcCore::app()->ctx->categories->fetch();'.
		"\n".
		' if (dcCore::app()->ctx->categories !== null) { ?>'.
			"\n".
			$content.
			"\n".
		'<?php }'.
		"\n".
		' dcCore::app()->ctx->categories = null; ?>';
	}

	public static function CountEntriesInSeries($attr) 
	{
		$that = $GLOBALS['core']->tpl;
		$f = $that->getFilters($attr);

		return 
			"<?php \n".
			'$sql = "SELECT count(*) FROM ".'.
			'    dcCore::app()->prefix . "meta as m," .'.
			'    dcCore::app()->prefix . "post as p ".'.
			'    " WHERE m.post_id = p.post_id " .'.
			'    " AND post_type = \'post\' ".'.
			'    " AND post_status = 1 ".'.
			'    " AND blog_id = \'" . dcCore::app()->blog->id . "\'" .'.
			'	" AND meta_type = \'serie\' AND meta_id = \'".dcCore::app()->ctx->meta->meta_id."\' ;";'.
			'$rs = dcCore::app()->con->select($sql);'.
			'$_nb = $rs->f(0); ?>'.
			$that->displayCounter(
				sprintf($f, '$_nb'),
				array(
					'none' => '(prochainement)', 
					'one' => 'un épisode', 
					'more' => '%s épisodes', 
				),
				$attr
			);
	}

	public static function EpisodeNumber($attr) {
		return '<?php echo substr(dcCore::app()->ctx->posts->post_title, 2, 4); ?>';
	}

	public static function EpisodeCountReset(ArrayObject $attr) {
		# Ugly but faster
		return  '<?php $_EpisodeCountReset = 0; ?>';
	}

	public static function EpisodeCountLowerThan(ArrayObject $attr, string $content) {
		$number = (int) $attr['number'];
		return 
			'<?php if ( $_EpisodeCountReset++ < '.$number.' ) { ?>' . $content . '<?php }  ?>';
	}

	public static function SeriesNotLostAndFound($attr,$content) {
		return 
			'<?php if (dcCore::app()->ctx->meta->meta_id != "lost and found") { ?>' . $content . '<?php }  ?>';

	}

}


?>