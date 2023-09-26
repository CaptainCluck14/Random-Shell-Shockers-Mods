// ==UserScript==
// @name         Player Spawned Mod+
// @description  Displays whether players have spawned and what weapons they have
// @author       Axudus#1315 (357741912095981579)
// @match        *://shellshock.io/*
// @run-at       document-start
// @grant        none
// @namespace    none
// @version      4.0
// ==/UserScript==


(function () {

    window.weaponSVGs = [
        "m61.7 51.4.4-1.3 22.4-19.7-.2-1.8 14.6-12.7-3.3-3.3-4.3 3.6C86.7 13.9 83 8.7 83 8.7l-1.9 1.7c3.5 4 5.2 7.5 6.1 9.5l-.9.7-6.1-3-3.4 2.8-1.6-1-11.5 9.5.2 2.2-.5.4-3.6-1.1-5.3 4.8-1.3-.8-1.2 1.2 2.6 3.1-28 23.2.4 6.5-2.7 4.5-3.1-.2L7.1 85l10.5 12.1 14.8-23.3 1.3-.5 8.7 24.1 10.8-9.1-6.4-13.9 7.1-6.7-3-5c2.8 2.7 18.2 16.9 38.8 15.6L91 63.1s-17.8 1.3-29.3-11.7zm24.9-36.3c.2-.2.5-.2.8 0l1.6 1.2c.3.2.3.7 0 1l-.6.5c-.3.2-.7.2-.9-.2l-.9-1.7c-.3-.3-.2-.7 0-.8zM45.5 71.6 44 68.2l4.2-2.1-.5-.9-2.7-.7.9-2 1.4-.3 2.9 4.9-4.7 4.5z",
        "M94.5 15.3c-.3-.6-.9-1.5-1.8-2.6-.9-1-1.6-1.8-2.2-2.3-.5-.4-1.1-.4-1.6-.1l-3.7 3-2.2-.6-3.1 2.2.5 2.2L46 44.6c-.2.2-.4.4-.7.6l-2.6-2.5-1.7 1.5 2.5 3c-5.2 6.5-10 17.3-10 17.3l-3.3.2L11.4 83l11.3 12.9L41 67.7l2.8 1.5.6-.2c7.9-2.4 9.5-7.5 9.5-7.7l.2-.7-3.9-5.1 10.5-6.8L85.1 28c.8-.7.9-1.8.3-2.7l-.7-1 9.4-7.5c.5-.3.7-1 .4-1.5zM44.1 66.1l-1.5-.8 2.5-3.8h3l.9-1-2.1-1.5 1.2-1.4 2.7 3.5c-.5 1.1-2.3 3.5-6.7 5z",
        "m76.8 32.6-.1-2.2 22.5-19.3-3.3-3.3-11.4 9.6-4.7-1.3-7.6 6.5-2.2-1-25.7 21.8-3.6-3.5.9-.7 6.5-3.9 2.7.2 1.2-1.1s-1.8-3.4-6.9-8l-1.2 1.3v2.1l-4.6 5.8-8.3 8-3.9 1.7-13.9 11.1-2.9.9s1 2.1 2.4 3.6c2 2 4 3.2 3.7 3l.8-2.6 13.1-11.7 2.5-3.1.2-.2 3.5 3.8-12.4 10.6 1.7 8.9-19 16.5L17 98.2l16.9-17 3.4 7.5 11.3-6.3-5-9.4 9.4-9.8-2.2-3.8 1.5.8 6.6 5.5 8.7-10.8c-7.7-4.6-9.6-8-9.6-8l5.2-2 13.6-12.3zm1.2-12 1.8.6-4.6 4-1-1.1 3.8-3.5zM17.5 89.1l-3.5-5 2.5-2.2 3.8 4.4-2.8 2.8zm8.1-4.2-4.4-7.3L29 71l3.5 7.3-6.9 6.6zm23.9-22.1-7.3 7.6-2.5-4.6 4.9-2.3-.3-2c-1.5.6-2.5-.1-3.2-.7l4.9-3.7.1.1 3.4 5.6z",
        "m78.1 48.5-5.1-.1.1-1.7 6.2-5.1 1.4-3.2.9 1.1 19.2-13.1s-.9-3.1-3.7-7l.2-1.8c.2-1.2-.7-2.3-1.9-2.4l-1.9-.2c-1.7-1.7-3.7-3.4-6.2-5L70.9 26.6l1.3 1.5-1.5.5-5.5-2.6-4.9 4.1.8 4.4-4.7 3.8-4-4.6.1-.1 1.4.3 7.4-6.9.6.7 4.2-3.4-5.3-6.3-4.2 3.4.4.6-7.8 6v1.5l-12.4 8.6 5.4 6.2 5.7-6 3.4 4.7-1.6-.4-3.7 2.8 1 1.3-22.3 19-1.4-.5-3.5 2.8.2 1.3-8.8 5.2-2.2-.3-3.9 3.5s3.4 11.5 14.7 18.2l4.4-3.5.3-2.2 6-7.5.6-.5 1.3.4 3.2-2.8-.1-1.4 2.9-2.5 11.1 11.6 7.1-6.2-10-12.6 9.5-8.2 8.3.2.2.3-2.1 2.1 5.1 6.8 1.8-1.7 5.8 9 6.5-6.1-4.2-10.8 5.2-5.7-4.6-6.1zm-1.4 2.6 2.5 3.6-3.2 3.4-2-2.5 2.5-1.9-.6-.7-3.1-.1.1-1.9 3.8.1zM63.2 31.2l2.4-2 1.4.7-.3.1-3.3 2.6-.2-1.4z",
        "m98 16.8-2.9-3.4c-.4-.4-1.1-.5-1.5-.1L90.4 16c-.3.3-.5.7-.3 1.1l-6.4 5.6-5.4-5.7-2-1-4-3.9-.7.5-.5 1.1-1.7-2.1-1 .8 1.7 2.1-1.2.2-1.8 1.4.2 1.1-1.1.8-1.1-.4-1.7 1.3.2 1.2-.9.9-1.1-.4-1.7 1.4.2 1.2-1 .8-1.2-.4-1.6 1.3.2 1.3-1.1.8-1.3-.4-1.7 1.4v1.3l-2.8-3.5-1.8 1.5 3.7 4.5-.8 1.2 1.8 8.1L7.8 78l16 16.3H26l18.4-16 10.5-.5 9.5-5.5 5.2-7.1v-7.4l9-6.2 2.1 4.1 5.3-4.2v-6.9l-3.7-6.2 3.7-3.2 3.9 4.2 4.1-3.3-4.7-6.1h-4l.8-2.2 7.6-6.6c.3.1.7 0 1-.2l3.2-2.7c.4-.4.5-1.1.1-1.5zM58.6 66.1l-6.2 4.5-6.6-7.3 10.6-9c1.5 1.9 4.6 4.9 4.6 4.9l-2.4 6.9zm-.8-29.5-.6-2.3 14.4-12.1 3 .5-16.8 13.9zM74.4 50l-4.1-3.3-.8-3.3 5.5-4.6 4.4 6.2-5 5z",
        "m97.3 9.6-3.1-3.1-3.6 2-36.2 31.7h-.8l-1.4-1.6 1.4-1.2 4.2-2 3.7-2.8-4.9-5.6-3.6 2.8-3.8 5.3-.4-.5-1.9 1.6.4.5-9.8 8.3-.5-.6-1.9 1.6.5.6-6.6 3.3-1.8 1.8 5.2 5.7 2.1-1.8 4-5.6 1.5 1.8-.5 1.6-1.1-.8-1.6 1.2.6.9-1.9 1.7 2.9 3.2-3.4 6.2-3.9.4-17 14 2.4 2.1-1.5 1.5-2.3-1.9-4.1 3.9 16.6 13.8 3.3-4.2-2.3-1.9 1.2-1.3 1.5 1.3L41 75.4l6 2.4 4-4-5.7-6-.4-2.8 3.3-4.3 2.3 2.4h6.3l3.7-3.2 1-5.7-3.2-3.6 22-19-3.1-4 16.9-14.1 3.2-3.9zM18.1 83.7l3 2.7-1.4 1.3-3.2-2.7 1.6-1.3zm6.2 7.9-2.4-2 1.3-1.3 2.3 2-1.2 1.3zm17.3-42-1-1.1 9.8-8.2 1.1 1.2-9.9 8.1zm17.3 5.6-.4 3.5-2.5 2.4-4.6.3-1.9-2.1.7-.9 1.3 1.4h3.4l.9-.8-2.8-.7-1.4-1.7.2-.3 4.6-4 2.5 2.9z",
        "m94.3 7.4-2.8.5-1 3-12.1 11.8-1.1-.9-5 4.5 3.8 4.1.6 2.9-2 1.4-5.4-6.5-9-1-12 10.3-.5-.5 2-1.7-3.5-4.3-2.1 2-.7-.7-5.1 4.9.7.7-2 1.8 3.1 3.7 2.4-2 .6.6-6.2 5.2 1.8 1.9 7.9-6.8h1l1.1 1.2.2.7-.3.3.3 2.3-2 1.3-1.2-1.1-28.2 21.2 2.2 2.7-12.1 9.4v4.2l9.4 8.6 1.7-.6 6.2 6.1 5.2-4.6.6-14h2.9l1.5-1.4s2.9 3.2 6.7 6.1c3.8 2.9 10.3 8.1 10.3 8.1L58.3 81v-2.4l-2.7-.6s-8-4.8-11.6-9.1l1.1-1.1-1.1-2.6 7.4-6.5L59 70.5l3.4 1.1 9.5-8-5.7-15.9 1.9-1.4 1.5 1.1 2.3-1.8-1-1.9 1-.8 11.7 10.9 2.7-2.5L77.4 38l4.3-3.3-.7-6.2-.8-1.3.3-1.5L95 15.3l2.8-.5.5-2.9-4-4.5zm-37 31.2-4.3.6.8 2.3-1.8.5-1.1-.3-.9-1.3v-.9l11-9.6 2.3 1.5-.4 2.3-3.2-.1.9 2.2-4.2.4.9 2.4zm11.1 23.6-4.6 4.4-4.6-8 .8-2.4.9-.1-.1-1.6-1.7-2.5 4.3-3.8 5 14z"
    ];

    window.XMLHttpRequest = class extends window.XMLHttpRequest {
        constructor() {
            super(...arguments)
        }
        open() {
            if (arguments[1] && arguments[1].includes("shellshock.js")) {
                this.scriptMatch = true;
            }
            super.open(...arguments)
        }
        get response() {
            if (this.scriptMatch) {
                let res = super.response;
                const matches = [/themClass\[(\w).team\]}`,\w.innerText="";/, /this.playing=!1/, /this.playing=!0/].map(a => res.match(a));
                for (let [m, v] of matches) {
                    res = res.replace(m, m + (v ? `const weaponIcon=document.createElement("svg");weaponIcon.innerHTML=\`<svg viewBox="0 0 100 100" style="width:46%"><path d="\${weaponSVGs[` + v + `.charClass]}" fill="\${` + v + `.playing?"#00FF00":"#FF3F3FFF"}"></path></svg>\`;window.rebuildPlayerList=arguments.callee;` : ',typeof window.rebuildPlayerList=="function"&&window.rebuildPlayerList()'));
                }

                let [a, b, c] = res.match(/((\w).appendChild\(\w\))}for/);
                return res.replace(a, b + ',' + c + '.appendChild(weaponIcon)}for');
            }
            return super.response;

        }
    };

}())
