// ==UserScript==
// @name         Change KOTC Colors
// @description  Change the default colors of coup/If you can figure it out- could be cool for themes
// @author       Axudus#1315 (357741912095981579)
// @match        *://shellshock.io/*
// @run-at       document-start
// @grant        none
// @namespace    none
// @version      0.1
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

            super.open(...arguments);
        }
        get response() {
            if (this.scriptMatch) {
                const res = super.response;

                return res
                    .replace(/(\w).match\(\/\^\\s*/, "($1.includes(\", \")?$1:$1.replaceAll(\" \",\", \")).match(/^\\s")
                    .replace(/const (\w\w)=(\[null,{name:"team_blue")/, "let $1={};window.updateColors=function(){$1=$2")
                    .replace(/\}];(var .+=\[{logic)/, "}]};window.updateColors();$1");
            }
            return super.response;
        }
    }


    const monitoredStyles = ["--ss-team-blue-light", "--ss-team-blue-dark", "--ss-team-red-light", "--ss-team-red-dark"];
    const previousValues = {};
    function getCssProp(prop) {
        return getComputedStyle(document.documentElement).getPropertyValue(prop);
    }

    setInterval(function () {
        if (!window.extern?.isGameReady) return;

        for (let style of monitoredStyles) {
            const currentValue = getCssProp(style);
            const previousValue = previousValues[style];

            if (currentValue != previousValue) {
                previousValues[style] = currentValue;

                console.log(`${style} updated to %c${currentValue}`, "color:" + currentValue);
                window.updateColors();
            }
        }
    }, 1000);

})();
