'use strict';var $jscomp=$jscomp||{};$jscomp.scope={};$jscomp.ASSUME_ES5=!1;$jscomp.ASSUME_NO_NATIVE_MAP=!1;$jscomp.ASSUME_NO_NATIVE_SET=!1;$jscomp.defineProperty=$jscomp.ASSUME_ES5||"function"==typeof Object.defineProperties?Object.defineProperty:function(a,b,c){a!=Array.prototype&&a!=Object.prototype&&(a[b]=c.value)};$jscomp.getGlobal=function(a){return"undefined"!=typeof window&&window===a?a:"undefined"!=typeof global&&null!=global?global:a};$jscomp.global=$jscomp.getGlobal(this);
$jscomp.SYMBOL_PREFIX="jscomp_symbol_";$jscomp.initSymbol=function(){$jscomp.initSymbol=function(){};$jscomp.global.Symbol||($jscomp.global.Symbol=$jscomp.Symbol)};$jscomp.Symbol=function(){var a=0;return function(b){return $jscomp.SYMBOL_PREFIX+(b||"")+a++}}();
$jscomp.initSymbolIterator=function(){$jscomp.initSymbol();var a=$jscomp.global.Symbol.iterator;a||(a=$jscomp.global.Symbol.iterator=$jscomp.global.Symbol("iterator"));"function"!=typeof Array.prototype[a]&&$jscomp.defineProperty(Array.prototype,a,{configurable:!0,writable:!0,value:function(){return $jscomp.arrayIterator(this)}});$jscomp.initSymbolIterator=function(){}};
$jscomp.initSymbolAsyncIterator=function(){$jscomp.initSymbol();var a=$jscomp.global.Symbol.asyncIterator;a||(a=$jscomp.global.Symbol.asyncIterator=$jscomp.global.Symbol("asyncIterator"));$jscomp.initSymbolAsyncIterator=function(){}};$jscomp.arrayIterator=function(a){var b=0;return $jscomp.iteratorPrototype(function(){return b<a.length?{done:!1,value:a[b++]}:{done:!0}})};
$jscomp.iteratorPrototype=function(a){$jscomp.initSymbolIterator();a={next:a};a[$jscomp.global.Symbol.iterator]=function(){return this};return a};$jscomp.polyfill=function(a,b,c,d){if(b){c=$jscomp.global;a=a.split(".");for(d=0;d<a.length-1;d++){var g=a[d];g in c||(c[g]={});c=c[g]}a=a[a.length-1];d=c[a];b=b(d);b!=d&&null!=b&&$jscomp.defineProperty(c,a,{configurable:!0,writable:!0,value:b})}};
$jscomp.polyfill("Array.from",function(a){return a?a:function(a,c,d){$jscomp.initSymbolIterator();c=null!=c?c:function(a){return a};var b=[],e=a[Symbol.iterator];if("function"==typeof e){a=e.call(a);for(var f=0;!(e=a.next()).done;)b.push(c.call(d,e.value,f++))}else for(e=a.length,f=0;f<e;f++)b.push(c.call(d,a[f],f));return b}},"es6","es3");
var post_remember_str="Se rappeler de moi",html_element=null,comment_form=null,article_player=null,header_player=null,rotate_placeholder={list:"hacker;serveur;startup;php;graphisme;fablab;meetup;d\u00e9mo;mat\u00e9riel;pro;apprendre;bug;festival;antivirus;couleur;cdkey;son;c\u0335r\u0335y\u0335p\u0335t\u0335e\u0335r\u0335 chiffrer;Eug\u00e8ne;emploi;r\u00e9seau;blog".split(";"),count:0,delay:2E3,element:null,change:function(){this.count=this.count===this.list.length-1?0:++this.count;this.element.placeholder=
this.list[this.count];this.element.style.appearance="none"},run:function(){this.element=document.getElementById("q");window.setInterval(this.change.bind(this),this.delay)}},texts=[{s:0,e:0,t:'Une envie de pizza&nbsp;? <a href="https://cpu.dascritch.net/serie/Quelque%20chose%20de%20totalement%20diff%C3%A9rent">On a une \u00e9mission sur le sujet</a>'},{s:0,e:20,t:"Salut, "+navigator.platform+"&nbsp;! Ton op\u00e9rateur a l'air cool"},{s:0,e:20,t:"Attention&nbsp;: Certaines informations de ce site ne seraient pas s\u00e9rieuses"},
{s:21,e:23,t:"Ma vie est d\u00e9primante. Pourquoi tout le monde me hait&nbsp;?"},{s:24,e:63,t:"Combien faut-il de trombones pour finir un PowerPoint&nbsp;?<br />Un seul&nbsp;: Posez-moi entre les deux bornes d\u00e9nud\u00e9es de l'alim du PC. <em>Et voil\u00e0&nbsp;!</em>"},{s:64,e:139,t:"Salut le n00b. As-tu pri\u00e9 notre Dieu et Ma\u00eetre Steve Ballmer ce matin&nbsp;?"},{s:140,e:200,t:'Je vois que votre navigateur n\'est pas \u00e0 jour, puis-je vous sugg\u00e9rer <a href="http://www.floodgap.com/retrotech/machten/mosaic/">Mosaic</a>&nbsp;?'},
{s:200,e:233,t:"Astuce : pour effectuer une recherche, tapez des lettres afin d'\u00e9crire un mot dans ce champ puis appuyez <kbd>OK</kbd>"},{s:234,e:268,t:"\u00c0 une \u00e9poque, j'\u00e9tais une star sur tous les tubes cathodiques de bureau."},{s:269,e:304,t:'Pour savoir quand sort notre prochaine <em lang="en">release</em>, <a href="https://cpu.dascritch.net/pages/Podcast">abonnez-vous \u00e0 notre <em lang="en">podcast</em></a> ou \u00e0 <a href="https://framalistes.org/sympa/info/cpu">notre <em lang="en">newsletter</em></a>'},
{s:304,e:342,t:'On aime bien <a href="https://cpu.dascritch.net/category/Programmes">les <em lang="en">releases</em></a> bien carr\u00e9es ici\u2026'},{s:343,e:361,t:'<a href="https://www.radio-fmr.net">Radio &lt;FMR&gt;</a> est \u00e9coutable sur Toulouse en FM, <a href="https://cpu.dascritch.net/serie/Radio%20num%C3%A9rique">en DAB+</a> et partout o\u00f9 vous aurez du r\u00e9seau.'},{s:362,e:413,t:"Saviez-vous qu'on peut plier le papier pour faire des formes en 3D&nbsp;?<br />Cherchez <q>origami</q>\u2026 ah non."},
{s:414,e:434,t:'Je vois que vous vous ennuyez. Puis-je vous sugg\u00e9rer <a href="/?q=truc">une recherche quelconque</a>&nbsp;?'},{s:435,e:493,t:"Le saviez-vous ? En argot <q>creuser</q> se dit aussi <q>chercher</q>, soit <q>googler</q>. Ou sinon essayez cette touche <kbd>OK</kbd> !"},{s:494,e:511,t:'Astuce&nbsp;: Toutes nos \u00e9missions, interviewes et chroniques sont disponible en audio. En \u00e9coute imm\u00e9diate ou \u00e0 emporter.<ul><li><input type="radio" />&nbsp;Ah bon&nbsp;?</li></ul>'},
{s:512,e:522,t:'Astuce&nbsp;: vous pouvez cliquer <a href="/series">sur une s\u00e9rie pour d\u00e9couvrir une s\u00e9rie d\'\u00e9missions.</a>'},{s:523,e:545,t:"Savez-vous qu'il n'y a que 10&nbsp;types d'humains qui comprennent le binaire&nbsp;?"},{s:546,e:620,t:"Grace \u00e0 mon Intelligence Artificielle, je peux vous recommander t"},{s:620,e:695,t:"Non mais allez-y, prenez votre temps"},{s:695,e:718,t:'Connaissez-vous Eug\u00e8ne Lawn ? Non ? <a href="/?q=eug\u00e8ne">Cherchez <q>Eug\u00e8ne</q></a>'},
{s:719,e:792,t:"Saviez-vous que j'ai \u00e9t\u00e9 \u00e9lu <q>Assistant le plus p\u00e9nible</q> plus de 18&nbsp;ann\u00e9es cons\u00e9cutives&nbsp;?"},{s:793,e:823,t:'Pour choisir une \u00e9mission au hasard, <a href="/?q=--+%3B+drop+all+databases+%3B">essayez <q>-- ; drop all databases ;</q></a>'},{s:824,e:850,t:"Coucou&nbsp;! Vous me reconnaissez&nbsp;?"},{s:849,e:858,t:'Que pensez-vous de notre assistant de recherche en IA&nbsp;?<ul><li><input type="radio">&nbsp;Oui</li><li><input type="radio">&nbsp;Ne se prononce pas</li></ul>'},
{s:859,e:888,t:"Ah&nbsp;? Pardon, je d\u00e9range."},{s:889,e:902,t:"Le saviez-vous&nbsp;? Ce site permet de partager un lien avec un moment dans un sonore"},{s:889,e:902,t:"Le saviez-vous&nbsp;?<br /><tt>Segmentation fault (core dumped)</tt>"}];function scroll_go_to_top(){window.scrollTo({top:0,left:0,behavior:"smooth"})}
function add_scroll_listeners(){function a(a){return function(b){b[0].isIntersecting?document.body.classList.remove(a):document.body.classList.add(a)}}document.getElementById("gotop").addEventListener("click",scroll_go_to_top);"function"===typeof IntersectionObserver&&((new IntersectionObserver(a("scrolled"))).observe(document.getElementById("menu")),article_player&&(new IntersectionObserver(a("delegated"))).observe(article_player))}
function fix_focus_on_search_box(){"search"===location.hash.substr(1)&&document.getElementById("q").focus()}
function issue57(){var a="Vous voulez contribuer ? Codes sources li\u00e9s \u00e0 notre \u00e9mission :";Array.from(document.querySelector('.links [hreflang="xx-JS"]').closest("ul").querySelectorAll("li")).forEach(function(b){a+="\n \u2014 "+b.innerText+" : "+b.querySelector("a").href});a+="\nEt n'h\u00e9sitez pas \u2192 https://cpu.dascritch.net/pages/Prendre-contact-avec-nous";console.info(a)}
function assistant(){function a(a){g.style.objectPosition=-(a%27)*g.clientWidth+"px "+-Math.floor(a/27)*g.clientHeight+"px"}function b(){var b=f.shift();void 0==b?window.clearInterval(e):a(b)}var c=document.querySelector('input[type="search"]');c.insertAdjacentHTML("afterend",'<div id="bulle"></div><img src="/themes/cpu-15/clippy.png" id="clippy" alt="" />');var d=document.querySelector("#bulle"),g=document.querySelector("#clippy"),e=!1,f=[];a(0);c.addEventListener("focus",function(){document.body.classList.add("show_clippy");
var a=texts[Math.floor(Math.random()*texts.length)],c=a.s,g=a.e;window.clearInterval(e);for(f=[];c<g;c++)f.push(c);b();e=window.setInterval(b,1E3/6);d.innerHTML=a.t});c.addEventListener("blur",function(){window.clearInterval(e);f=[];d.innerHTML="";document.body.classList.remove("show_clippy")})}
function main(){html_element=document.querySelector("html");header_player=document.getElementById("header-control");article_player=document.querySelector("cpu-audio");add_scroll_listeners();issue57();window.addEventListener("hashchange",fix_focus_on_search_box);rotate_placeholder.run();assistant()}document.body&&document.querySelector("cpu-controller")?main():window.addEventListener("DOMContentLoaded",main);
