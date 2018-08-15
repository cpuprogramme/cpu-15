'use strict';

// pour ne pas avoir de balise <script> dans le source html, je code en dur la case à cocher. On peut le faire aussi avec un data="" , mais pas besoin : le site n'est qu'en Français

var post_remember_str = 'Se rappeler de moi';
var html_element = null;
var comment_form = null;
var article_player = null;
var header_player = null;

// snippets dont les originaux étaient dans _user_footer.tpl

function scroll_go_to_top() {
	// $('body,html').animate({scrollTop:0},800);
	/* Honte à moi : repris de https://stackoverflow.com/posts/24559613/revisions */

	scrollDuration = 800;

    var cosParameter = window.scrollY / 2,
        scrollCount = 0,
        oldTimestamp = performance.now();
    function step (newTimestamp) {
        scrollCount += Math.PI / (scrollDuration / (newTimestamp - oldTimestamp));
        if (scrollCount >= Math.PI) window.scrollTo(0, 0);
        if (window.scrollY === 0) return;
        window.scrollTo(0, Math.round(cosParameter + cosParameter * Math.cos(scrollCount)));
        oldTimestamp = newTimestamp;
        window.requestAnimationFrame(step);
    }
    window.requestAnimationFrame(step);
}

function refresh_player_focus() {
    if (article_player === null) {
        article_player = document.querySelector('#content .OndeMiroirAudio-Player');
    }
    if ( (header_player === null) || (article_player === null)) {
        return;
    }
    var position = article_player.getBoundingClientRect();
    if ((position.bottom < 0) || (position.top > window.innerHeight)) {
        header_player.classList.add('delegated');
    } else {
        header_player.classList.remove('delegated');
       
    }    
}

function on_scroll() {
	if ( (html_element.scrollTop !== 0) || (document.body.scrollTop !== 0) ) {
        document.body.classList.add('scrolled');
    } else {
        document.body.classList.remove('scrolled');
    }

    refresh_player_focus();
}

function add_scroll_listeners() {
	document.getElementById('gotop').addEventListener('click', scroll_go_to_top);
	window.addEventListener('scroll', on_scroll);
	window.addEventListener('resize', on_scroll);
}

/** Not so useful

var comment_keys = ['name', 'mail', 'site'];
function repeal_comment_informations() {
	for (var index in comment_keys) {
		key = 'c_'+comment_keys[index];
		var value = localStorage.getItem(key)
		if (value.length > 0) {
			document.getElementById(key).value = value;			
		}
	}
}

function store_comment_informations() {
	if (!document.getElementById('c_remember').checked) {
		return;
	}
	for (var index in comment_keys) {
		key = 'c_'+comment_keys[index];
		localStorage.setItem(key, document.getElementById(key))
	}
}
**/


function fix_focus_on_search_box() {
    /* a very ugly way to have a correct focus on the search box when its label is focused */
    if (location.hash.substr(1) === 'search') {
        document.getElementById('q').focus();
    }
}

function main() {
	html_element = document.querySelector('html');
    header_player = document.getElementById('header-control');
    // la suite du snippet est déléguée et ré-écrite
	add_scroll_listeners();
    window.setTimeout(refresh_player_focus, 3000);
    window.addEventListener('hashchange', fix_focus_on_search_box);

	/**
	comment_form = document.getElementById('comment_form');
	if (comment_form) {
		repeal_comment_informations();
		comment_form.addEventListener('submit', store_comment_informations);
	}
	**/

}

if ( (document.body) && (document.getElementById('header-control')) ) {
	main();
} else {
	window.addEventListener('DOMContentLoaded', main);
}
