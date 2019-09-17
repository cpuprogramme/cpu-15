'use strict';

// pour ne pas avoir de balise <script> dans le source html, je code en dur la case à cocher. On peut le faire aussi avec un data="" , mais pas besoin : le site n'est qu'en Français

let post_remember_str = 'Se rappeler de moi';
let html_element = null;
let comment_form = null;
let article_player = null;
let header_player = null;


let rotate_placeholder = {
    list : ['hacker', 'serveur', 'startup', 'php', 'graphisme', 'fablab', 'meetup', 'démo', 'matériel', 'pro', 'apprendre', 'bug', 'festival', 'antivirus', 'couleur', 'cdkey', 'son', 'c̵r̵y̵p̵t̵e̵r̵ chiffrer', 'emploi', 'réseau', 'blog'],
    count : 0,
    delay : 2000,
    element : null,
    change : function() {
        this.count = (this.count === (this.list.length-1)) ? 0 : ++this.count;
        this.element.placeholder = this.list[this.count];
    },
    run : function() {
        this.element = document.getElementById('q');
        window.setInterval(this.change.bind(this), this.delay);
    }
}

// snippets dont les originaux étaient dans _user_footer.tpl

function scroll_go_to_top() {
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
        article_player = document.querySelector('#content cpu-audio');
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
	window.addEventListener('scroll', on_scroll, {passive: true});
	window.addEventListener('resize', on_scroll, {passive: true});
}


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
    rotate_placeholder.run();
}

if ( (document.body) && (document.querySelector('cpu-controller')) ) {
	main();
} else {
	window.addEventListener('DOMContentLoaded', main);
}
