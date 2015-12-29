'use strict';

// pour ne pas avoir de balise <script> dans le source html, je code en dur la case à cocher. On peut le faire aussi avec un data="" , mais pas besoin : le site n'est qu'en Français

var post_remember_str = 'Se rappeler de moi';

var _paq = _paq || [];
	_paq.push(['trackPageView']);
 	_paq.push(['enableLinkTracking']);

// snippets dont les originaux étaient dans _user_footer.tpl

function scroll_go_to_top() {
	$('body,html').animate({scrollTop:0},800);
}


function on_scroll() {
	if($(this).scrollTop() != 0) {
        $('#gotop').fadeIn();
    } else {
        $('#gotop').fadeOut();
    }
}

function on_switch_menu_logo(event) {
	console.log('on_switch_menu_logo');
	// honnêtement, je devrais le faire avec element.classList.switch('logo_ouvert');
	$("html").toggleClass('logo_ouvert');
	event.preventDefault();
}

function add_scroll_listeners() {
	document.getElementById('gotop').addEventListener('click', scroll_go_to_top);
	window.addEventListener('scroll', on_scroll);
}

function track_visitors_in_favor_of_a_big_advertizing_company() {
	var advert_mogul="//ultrawaves.fr/piwik/";
	_paq.push(['setTrackerUrl', advert_mogul+'piwik.php']);
	_paq.push(['setSiteId', 2]);
	var element = document.createElement('script');
	element.type = 'text/javascript';
	element.async=true;
	element.defer=true;
	element.src = advert_mogul+'piwik.js';
	document.head.appendChild(element);
}


function main() {
	// snippet qui était dans _user_footer.tpl
	$("html").removeClass("nojs").addClass("js");
	//track_visitors_in_favor_of_a_big_advertizing_company();
	// la suite du snippet est déléguée et ré-écrite
	add_scroll_listeners();

	// animation spécifique au menu/logo
	document.getElementById('logo').addEventListener('click', on_switch_menu_logo);
}

window.addEventListener('DOMContentLoaded', main);
