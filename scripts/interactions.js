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
        this.element.style.appearance =  'none';  // Is Safari reset this property when you modify placeholder ?
    },
    run : function() {
        this.element = document.getElementById('q');
        window.setInterval(this.change.bind(this), this.delay);
    }
}

const texts = [

    {s:0, e:0, t:`Une envie de pizza&nbsp;? <a href="https://cpu.dascritch.net/serie/Quelque%20chose%20de%20totalement%20diff%C3%A9rent">On a une émission sur le sujet</a>`},
    {s:0, e:20, t:`Salut, ${navigator.platform}&nbsp;! Ton opérateur a l'air cool`},
    {s:0, e:20, t:`Attention&nbsp;: Certaines informations de ce site ne seraient pas sérieuses`},
    {s:21, e:23, t:`Ma vie est déprimante. Pourquoi tout le monde me hait&nbsp;?`},
    {s:24, e:63, t:`Combien faut-il de trombones pour finir un PowerPoint&nbsp;?<br />Un seul&nbsp;: Posez-moi entre les deux bornes dénudées de l'alim du PC. <em>Et voilà&nbsp;!</em>`},
    {s:64, e:139, t:`Salut le n00b. As-tu prié notre Dieu et Maître Steve Ballmer ce matin&nbsp;?`},
    {s:140, e:200, t:`Je vois que votre navigateur n'est pas à jour, puis-je vous suggérer <a href="http://www.floodgap.com/retrotech/machten/mosaic/">Mosaic</a>&nbsp;?`},
    {s:200, e:233, t:`Astuce : pour effectuer une recherche, tapez des lettres afin d'écrire un mot dans ce champ puis appuyez <kbd>OK</kbd>`},
    {s:234, e:268, t:`À une époque, j'étais une star sur tous les tubes cathodiques de bureau.`},
    {s:269, e:304, t:`Pour savoir quand sort notre prochaine <em lang="en">release</em>, <a href="https://cpu.dascritch.net/pages/Podcast">abonnez-vous à notre <em lang="en">podcast</em></a> ou à <a href="https://framalistes.org/sympa/info/cpu">notre <em lang="en">newsletter</em></a>`},
    {s:304, e:342, t:`On aime bien <a href="https://cpu.dascritch.net/category/Programmes">les <em lang="en">releases</em></a> bien carrées ici…`},
    {s:343, e:361, t:`<a href="https://www.radio-fmr.net">Radio &lt;FMR&gt;</a> est écoutable sur Toulouse en FM, <a href="https://cpu.dascritch.net/serie/Radio%20num%C3%A9rique">en DAB+</a> et partout où vous aurez du réseau.`},
    {s:362, e:413, t:`Saviez-vous qu\'on peut plier le papier pour faire des formes en 3D&nbsp;?<br />Cherchez <q>origami</q>… ah non.`},
    {s:414, e:434, t:`Je vois que vous vous ennuyez. Puis-je vous suggérer <a href="/?q=truc">une recherche quelconque</a>&nbsp;?`},
    {s:435, e:493, t:`Le saviez-vous ? En argot <q>creuser</q> se dit aussi <q>chercher</q>, soit <q>googler</q>. Ou sinon essayez cette touche <kbd>OK</kbd> !`},
    {s:494, e:511, t:`Astuce&nbsp;: Toutes nos émissions, interviewes et chroniques sont disponible en audio. En écoute immédiate ou à emporter.<ul><li><input type="radio" />&nbsp;Ah bon&nbsp;?</li></ul>`},
    {s:512, e:522, t:`Astuce&nbsp;: vous pouvez cliquer <a href="/series">sur une série pour découvrir une série d'émissions.</a>`},
    {s:523, e:545, t:`Savez-vous qu'il n'y a que 10&nbsp;types d'humains qui comprennent le binaire&nbsp;?`},
    {s:546, e:620, t:`Grace à mon Intelligence Artificielle, je peux vous recommander t`},
    {s:620, e:695, t:`Non mais allez-y, prenez votre temps`},
    {s:695, e:718, t:`Connaissez-vous Eugène Lawn ? Non ? <a href="/?q=eugène">Cherchez <q>Eugène</q></a>`},
    {s:719, e:792, t:`Saviez-vous que j'ai été élu <q>Assistant le plus pénible</q> plus de 18&nbsp;années consécutives&nbsp;?`},
    {s:793, e:823, t:`Pour choisir une émission au hasard, <a href="/?q=--+%3B+drop+all+databases+%3B">essayez <q>-- ; drop all databases ;</q></a>`},
    {s:824, e:850, t:`Coucou&nbsp;! Vous me reconnaissez&nbsp;?`},
    {s:849, e:858, t:`Que pensez-vous de notre assistant de recherche en IA&nbsp;?<ul><li><input type="radio">&nbsp;Oui</li><li><input type="radio">&nbsp;Ne se prononce pas</li></ul>`},
    {s:859, e:888, t:`Ah&nbsp;? Pardon, je dérange.`},
    {s:889, e:902, t:`Le saviez-vous&nbsp;? Ce site permet de partager un lien avec un moment dans un sonore`},
    {s:889, e:902, t:`Le saviez-vous&nbsp;?<br /><tt>Segmentation fault (core dumped)</tt>`},

];

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
            if (elements[0].isIntersecting) {
                document.body.classList.remove(classname);
            } else {
                document.body.classList.add(classname);
            }
        }    
    }

	document.getElementById('gotop').addEventListener('click', scroll_go_to_top);
    if (typeof IntersectionObserver !== 'function') {
        return ;
    }
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

function issue57() {
    // https://github.com/dascritch/cpu-15/issues/57
    let out = 'Vous voulez contribuer ? Codes sources liés à notre émission :';

    function each_li(li) {
        out += `\n — ${li.innerText} : ${li.querySelector('a').href}`;
    }

    Array.from(
        document.querySelector('.links [hreflang="xx-JS"]').closest('ul').querySelectorAll('li')
    ).forEach(each_li);
    out += "\nEt n'hésitez pas → https://cpu.dascritch.net/pages/Prendre-contact-avec-nous";
    console.info(out);
}

function assistant() {
        const search_element = document.querySelector('input[type="search"]');
        // pour éviter le chargement très lourd de l'image d'entrée
        search_element.insertAdjacentHTML('afterend','<div id="bulle"></div><img src="/themes/cpu-15/clippy.png" id="clippy" alt="" />');

        const bulle_element = document.querySelector('#bulle');
        const clippy_element = document.querySelector('#clippy');
        const frame_cols = 27;
        const fps = 6;
        const clippy_a_la_class = 'show_clippy';
        let frame_caller = false;
        let clips = [];

        function frame(f) {
            const x = - (f % frame_cols) * clippy_element.clientWidth; 
            const y = - Math.floor(f / frame_cols) * clippy_element.clientHeight;
            clippy_element.style.objectPosition = `${x}px ${y}px`;
        }


        function no_frames() {
            window.clearInterval(frame_caller);
            clips = [];
        }

        function interclip() {
                const f = clips.shift();
                if (f == undefined) {
                    window.clearInterval(frame_caller);
                    return;
                }
                frame(f);
            }

        function frames(start, end) {
            no_frames();
            for (let f = start ; f < end ; f++) {
                clips.push(f);
            }
            interclip();
            frame_caller = window.setInterval(interclip, 1000/fps);
        }

        frame(0);

        search_element.addEventListener('focus', () => {
            document.body.classList.add(clippy_a_la_class);
            const verbiage = texts[Math.floor(Math.random() * texts.length )];
            frames(verbiage.s,verbiage.e);
            bulle_element.innerHTML = verbiage.t;
        });
        search_element.addEventListener('blur', () => {
            no_frames();
            bulle_element.innerHTML = '';
            document.body.classList.remove(clippy_a_la_class);
        });
}

function main() {
	html_element = document.querySelector('html');
    header_player = document.getElementById('header-control');
    article_player = document.querySelector('cpu-audio');
    // la suite du snippet est déléguée et ré-écrite
	add_scroll_listeners();
    issue57();
    window.addEventListener('hashchange', fix_focus_on_search_box);
    rotate_placeholder.run();
    assistant();
}

if ( (document.body) && (document.querySelector('cpu-controller')) ) {
	main();
} else {
	window.addEventListener('DOMContentLoaded', main);
}

