'use strict';var post_remember_str="Se rappeler de moi",html_element=null,comment_form=null,article_player=null,header_player=null;function scroll_go_to_top(){function a(c){b+=Math.PI/(scrollDuration/(c-d));b>=Math.PI&&window.scrollTo(0,0);0!==window.scrollY&&(window.scrollTo(0,Math.round(e+e*Math.cos(b))),d=c,window.requestAnimationFrame(a))}scrollDuration=800;var e=window.scrollY/2,b=0,d=performance.now();window.requestAnimationFrame(a)}
function refresh_player_focus(){null===article_player&&(article_player=document.querySelector("#content .OndeMiroirAudio-Player"));if(null!==header_player&&null!==article_player){var a=article_player.getBoundingClientRect();0>a.bottom||a.top>window.innerHeight?header_player.classList.add("delegated"):header_player.classList.remove("delegated")}}
function on_scroll(){0!==html_element.scrollTop||0!==document.body.scrollTop?document.body.classList.add("scrolled"):document.body.classList.remove("scrolled");refresh_player_focus()}function add_scroll_listeners(){document.getElementById("gotop").addEventListener("click",scroll_go_to_top);window.addEventListener("scroll",on_scroll);window.addEventListener("resize",on_scroll)}

function fix_focus_on_search_box() {
    /* a very ugly way to have a correct focus on the search box when its label is focused */
    if (location.hash.substr(1) === 'search') {
        document.getElementById('q').focus();
    }
}
function main(){html_element=document.querySelector("html");header_player=document.getElementById("header-control");add_scroll_listeners();window.setTimeout(refresh_player_focus,3E3);
    window.addEventListener('hashchange', fix_focus_on_search_box);

}document.body&&document.getElementById("header-control")?main():window.addEventListener("DOMContentLoaded",main);
