// ==UserScript==
// @name         Server Dropdown
// @description  Returns Server Dropdown to Main Menu
// @author       Axudus#1315 (357741912095981579)
// @match        *://shellshock.io/*
// @run-at       document-start
// @grant        none
// @namespace    none
// @version      1.0
// ==/UserScript==

(function () {
    const interval = setInterval(() => {
        if (window.extern?.isGameReady) {
            clearInterval(interval);

            const adHeader = document.getElementById("display-ad-header-home");
            if (adHeader) {
                adHeader.style.display = "none";
            }

            const regionSelect = document.getElementById("regionSelect");
            const playGameSection = document.getElementById("play_game");

            if (regionSelect && playGameSection) {
                playGameSection.appendChild(regionSelect);
            }
        }
    }, 1000);
}());
