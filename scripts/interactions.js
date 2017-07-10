'use strict';

// pour ne pas avoir de balise <script> dans le source html, je code en dur la case à cocher. On peut le faire aussi avec un data="" , mais pas besoin : le site n'est qu'en Français

var post_remember_str = 'Se rappeler de moi';
var html_element = null;
var comment_form = null;

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

function on_scroll() {
	if ( (html_element.scrollTop != 0) || (document.body.scrollTop != 0) ) {
        document.body.classList.add('scrolled');
    } else {
        document.body.classList.remove('scrolled');
    }
}

function add_scroll_listeners() {
	document.getElementById('gotop').addEventListener('click', scroll_go_to_top);
	window.addEventListener('scroll', on_scroll);
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


function main() {
	html_element = document.querySelector('html');
	// snippet qui était dans _user_footer.tpl
	html_element.classList.remove('nojs');
	html_element.classList.add('js');
	// la suite du snippet est déléguée et ré-écrite
	add_scroll_listeners();

	/**
	comment_form = document.getElementById('comment_form');
	if (comment_form) {
		repeal_comment_informations();
		comment_form.addEventListener('submit', store_comment_informations);
	}
	**/

}

if (document.body) {
	main();
} else {
	window.addEventListener('DOMContentLoaded', main);
}
