// ==UserScript==
// @name         Auto Set Username
// @version      0.1
// @description  Parses URL to set username
// @author       Axudus#1315 (357741912095981579)
// @match        https://shellshock.io/*
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function () { // Example URL: https://shellshock.io/?name=USERNAME#GAMECODE
    window.comp_play_panel.methods.showJoinPrivateGamePopup = function (showCode, urlRequest) {

        if (parsedUrl?.query?.name) {
            let name = decodeURIComponent(parsedUrl.query.name);
            if (name) vueApp.setPlayerName(name);
        }

        this.joinUrlRequest = hasValue(urlRequest);
        this.$refs.joinPrivateGamePopup.show();
        this.$refs.createPrivateGame.onKeyDownMapSelect();

        vueData.home.joinPrivateGamePopup.code = showCode;
    }
}());
