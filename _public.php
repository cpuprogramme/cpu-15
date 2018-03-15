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

l10n::set(dirname(__FILE__).'/locales/'.$_lang.'/main');

# Access to twitter-player
$core->url->register('twitterplayer', 'm', '^twitter-player(?:/(.+))?$', ['CPU15_url', 'twitterplayer']);

$core->tpl->addValue('EntryURLsegment',array('CPU15_template','EntryURLsegment'));
$core->tpl->addBlock('Entry1stLevelCategory',array('CPU15_template','Entry1stLevelCategory'));
$core->tpl->addValue('CountEntriesInSeries',array('CPU15_template','CountEntriesInSeries'));

$core->tpl->addBlock('AttachmentsNo',array('CPU15_template','AttachmentsNo'));


class CPU15_url extends dcUrlHandlers
{

	public static function twitterplayer($args) {
		global $core, $_ctx;

		if ($args === '') {
			# No entry was specified.
			self::p404();
		}

		$core->blog->withoutPassword(false);
		$params = new ArrayObject([ 'post_url' => $args ]);
			
		$core->callBehavior('publicPostBeforeGetPosts',$params,$args);

		$_ctx->posts = $core->blog->getPosts($params);
		if ($_ctx->posts->isEmpty()) {
			# The specified entry does not exist.
			self::p404();
		}

		self::serveDocument('twitter-player.html');
	}	
}

class CPU15_template
{
	public static function AttachmentsNo($attr,$content) {
		return
		"<?php\n".
		'if ($_ctx->posts !== null && $core->media) {'."\n".
			'$_ctx->attachments = new ArrayObject($core->media->getPostMedia($_ctx->posts->post_id));'."\n".
		"?>\n".
		
		'<?php if (sizeof($_ctx->attachments) === 0) ?>'.
		$content.
		
		"<?php } ?>\n";
	}

	public static function EntryURLsegment($attr) {
		return '<?php echo $_ctx->posts->post_url ; ?>';
	}

	public static function Entry1stLevelCategory($attr,$content)
	{
		return
		"<?php\n".
		'$_ctx->categories = $core->blog->getCategoryParents($_ctx->posts->cat_id);'."\n".
		'$_ctx->categories->fetch();'.
		"\n".
		' if ($_ctx->categories !== null) { ?>'.
			"\n".
			$content.
			"\n".
		'<?php }'.
		"\n".
		' $_ctx->categories = null; ?>';
	}

	public static function CountEntriesInSeries($attr) 
	{
		$that = $GLOBALS['core']->tpl;
		$f = $that->getFilters($attr);

		return 
			"<?php \n".
			'$sql = "SELECT count(*) FROM ".'.
		    '    $core->prefix . "meta as m," .'.
	        '    $core->prefix . "post as p ".'.
	        '    " WHERE m.post_id = p.post_id " .'.
	        '    " AND post_type = \'post\' ".'.
	        '    " AND post_status = 1 ".'.
	        '    " AND blog_id = \'" . $core->blog->id . "\'" .'.
       		'	" AND meta_type = \'serie\' AND meta_id = \'".$_ctx->meta->meta_id."\' ;";'.
			'$rs = $core->con->select($sql);'.
			'$_nb = $rs->f(0); ?>'.
		    $that->displayCounter(
	            sprintf($f, '$_nb'),
	            array(
	            	'none' => '(prochainement)', 
	            	'one' => 'un épisode', 
	            	'more' => '%s épisodes', 
	            ),
	            $attr,
	            true
    		);
	}

}


?>