'use strict';

// pour ne pas avoir de balise <script> dans le source html, je code en dur la case à cocher. On peut le faire aussi avec un data="" , mais pas besoin : le site n'est qu'en Français

var post_remember_str = 'Se rappeler de moi';
var html_element = null;

// snippets dont les originaux étaient dans _user_footer.tpl

function scroll_go_to_top() {
	$('body,html').animate({scrollTop:0},800);
}


function on_scroll() {
	if($(this).scrollTop() != 0) {
        document.body.classList.add('scrolled');
    } else {
        document.body.classList.remove('scrolled');
    }
}

function on_switch_menu_logo(event) {
	html_element.classList.toggle('logo_ouvert');
	event.preventDefault();
}

function add_scroll_listeners() {
	document.getElementById('gotop').addEventListener('click', scroll_go_to_top);
	window.addEventListener('scroll', on_scroll);
}

function main() {
	html_element = document.querySelector('html');
	// snippet qui était dans _user_footer.tpl
	html_element.classList.remove('nojs');
	html_element.classList.add('js');

	// la suite du snippet est déléguée et ré-écrite
	add_scroll_listeners();

	// animation spécifique au menu/logo
	document.getElementById('logo').addEventListener('click', on_switch_menu_logo);
}

window.addEventListener('DOMContentLoaded', main);
