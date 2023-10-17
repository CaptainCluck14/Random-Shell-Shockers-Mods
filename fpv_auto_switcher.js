// ==UserScript==
// @name         First Person Auto Switcher
// @description  Automatically switches to the player who eliminated the one you were spectating
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

                const v = [
                    /(\w\w)===(\w\w).firstPerson&&\w.id===(\w\w).playerIdx/,
                    /(\w).lastDmgType=\w,(\w).lastDmgType=/
                ].map(x => res.match(x));

                if (v.includes(null)) {
                    return;
                }
                const [[, a, b, d], [, bp, kp]] = v;
                let m1 = res.match(/\w.die\(\),/);
                return res.replace(m1[0], `${m1[0]}${a}===${b}.firstPerson&&${d}.playerIdx==${kp}.id&&setTimeout(x=>${bp}.playing&&${d}.spectatePlayer(${bp}),window.customDelay||500),`)
            }
            return super.response;

        }
    };
}())
