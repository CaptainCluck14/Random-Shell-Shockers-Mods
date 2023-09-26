// ==UserScript==
// @name         Shell Shockers Compass Mod
// @description  Really useful mod if you're looking to win in competitive play! (if allowed)
// @author       Axudus#1315 (357741912095981579)
// @match        *://shellshock.io/*
// @run-at       document-start
// @grant        none
// @namespace    none
// @version      1.0
// ==/UserScript==


(function () {
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

                let [a, b] = res.match(/&&\(([^&]+).weapon&&0/);
                return res.replace(a, `&&(${b}.weapon&&((angle)=>bestStreak.innerText=angle+"\xb0"+["N","NE","E","SE","S","SW","W","NW"][Math.mod(Math.round(angle/45),8)])(Math.floor(180*${b}.yaw/Math.PI))&&0`);
            }
            return super.response;

        }
    };

    setTimeout(() => {
        let bestStreakElm = document.getElementById("bestStreak");
        bestStreakElm.style.textTransform = "uppercase";
    }, 15 * 1000);
}())
