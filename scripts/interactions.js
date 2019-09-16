'use strict';

// pour ne pas avoir de balise <script> dans le source html, je code en dur la case à cocher. On peut le faire aussi avec un data="" , mais pas besoin : le site n'est qu'en Français

let post_remember_str = 'Se rappeler de moi';
let html_element = null;
let comment_form = null;
let article_player = null;
let header_player = null;


let rotate_placeholder = {
    list : ['hacker', 'serveur', 'startup', 'php', 'graphisme', 'fablab', 'meetup', 'démo', 'matériel', 'pro', 'apprendre', 'bug', 'festival', 'antivirus', 'couleur', 'cdkey', 'son', 'c̵r̵y̵p̵t̵e̵r̵ chiffrer', 'Eugène', 'emploi', 'réseau', 'blog'],
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

function scroll_go_to_top() {
	window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
    });
}

function add_scroll_listeners() {
    function observe_gives(classname) {
        return function observe_menu(elements) {
            console.log(elements[0].intersectionRatio, elements[0])
            if (elements[0].isIntersecting) {
                document.body.classList.remove(classname);
            } else {
                document.body.classList.add(classname);
            }
        }    
    }

	document.getElementById('gotop').addEventListener('click', scroll_go_to_top);
    new IntersectionObserver(observe_gives('scrolled')).observe(document.getElementById('menu'));
    if (article_player) {
        new IntersectionObserver(observe_gives('delegated')).observe(article_player);
    }
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
    article_player = document.querySelector('cpu-audio');
    // la suite du snippet est déléguée et ré-écrite
	add_scroll_listeners();
    window.addEventListener('hashchange', fix_focus_on_search_box);
    rotate_placeholder.run();
}

if ( (document.body) && (document.querySelector('cpu-controller')) ) {
	main();
} else {
	window.addEventListener('DOMContentLoaded', main);
}
