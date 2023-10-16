// ==UserScript==
// @name         FPV+
// @description  Hides name tag, fixes weapon clipping, & adds reticle
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

                const v = [/(\w\w).showDot/,
                    /(\w\w).weapon.constructor.readySpread/,
                    /(\w\w)===(\w\w).firstPerson&&\w.id===(\w\w).playerIdx/,
                    /,(\w\w)\[\w.id\]/,
                    /(\w)==\w.id\|\|/,
                    /copyFrom\((\w.globalPosition)\),/
                ].map(x => res.match(x));

                if (v.includes(null)) {
                    return;
                }
                const [l, c, [, a, b, d], k, u, [, p]] = v;

                const m = [/(\w).actor.hat.setVisible\(!0\)/,
                    /spectatingPlayerName=(\w).name/,
                    /restorePreviousPlayerActor\(\)}/,
                    /if\(document.getElementById\("reticleContainer/,
                    /if\(\w.forwardRay=\w.getForwardRay/,
                    /,\w!=\w\){if\((\w)==\w/,
                    /wieldGun\(\),this.id===(\w\w)/,
                    /this.actor\)\?\(this.id===\w/,
                    /this.actor&&\(this.actor.removeFromPlay\(\),/,
                    /this.weapon.equip\(\),this.id==(\w)/,
                    /pausing game via pointerlock exit"\)/,
                    /this.id==(\w)&&(\w\w).hide\(\),this.actor.wieldingMelee/,
                    /(\w\w)\[\w\].score\)/,
                    /this.actor\?this.id==(\w)/,
                    /(\w.weapon).actor.fire/,
                    /Math.length3\(this.player.x-\w\w.x,this.player.y-\w\w.y,this.player.z-\w\w.z\)/, // name scaling
                    /(\w).respawn\(\w,\w,\w\),/
                ].map(x => res.match(x));

                if (m.includes(null)) {
                    return;
                }
                const [m1, m2, m3, m4, m5, m6, m7, m8, m9, m10, m11, m12, m13, m14, m15, m16, m17] = m;

                const rr = [
                    [m1[0], m1[0] + `;${m1[1]}&&(${m1[1]}.actor.showSprites(),${m1[1]}.actor?.hands?.setRenderingGroupId(0),${m1[1]}.meleeWeapon?.actor.weaponMesh?.setRenderingGroupId(0),${m1[1]}.weapons?.forEach(x=>x.actor?.gunMesh?.setRenderingGroupId(0)),${m1[1]}.actor?.muzzleFlash?.setRenderingGroupId(0));`],
                    [m2[0], m2[0] + `,${l[1]}.show(),${l[1]}.showDot(),${m2[1]}.actor?.hands?.setRenderingGroupId(2),${m2[1]}.meleeWeapon?.actor?.weaponMesh?.setRenderingGroupId(2),${m2[1]}.weapons?.forEach(x=>x.actor?.gunMesh?.setRenderingGroupId(2)),${m2[1]}.actor?.muzzleFlash?.setRenderingGroupId(2),${m2[1]}.actor.hideSprites(),document.getElementById("healthContainer").style.display="block",document.getElementById("hardBoiledContainer").style.display="block"`],
                    [m3[0], `restorePreviousPlayerActor(),${l[1]}.hide(),${l[1]}.hideDot(),document.getElementById("healthContainer").style.display="none",document.getElementById("hardBoiledContainer").style.display="none"}`],
                    [m4[0], `const ${c[1]}=${k[1]}[(${a}===${b}.firstPerson)?${d}.playerIdx:${u[1]}];if(!${c[1]}?.weapon)return;${m4[0]}`],
                    [m5[0], `const ${c[1]}=${k[1]}[(${a}===${b}.firstPerson)?${d}.playerIdx:${u[1]}];if(!${c[1]}?.weapon)return;${m5[0]}`],
                    [m6[0], m6[0] + `||${a}===${b}.firstPerson&&${m6[1]}===${d}.playerIdx`],
                    [m7[0], `wieldGun(),(this.id===${m7[1]}||(${a}===${b}.firstPerson&&${m6[1]}===${d}.playerIdx))`],
                    [m8[0], m8[0] + `||(${a}===${b}.firstPerson&&this.id===${d}.playerIdx)`],
                    [m9[0], m9[0] + `${a}===${b}.firstPerson&&this.id===${d}.playerIdx&&(${l[1]}.hide(),${l[1]}.hideDot(),document.getElementById("healthContainer").style.display="none",document.getElementById("hardBoiledContainer").style.display="none"),`],
                    [m10[0], `this.weapon.equip(),(this.id==${m10[1]}||${a}===${b}.firstPerson&&this.id===${d}.playerIdx)`],
                    [m11[0], m11[0] + `,${d}.restorePreviousPlayerActor(),${d}.unlock(),${a}=${b}.freeCamera`],
                    [m12[0], `(this.id==${m12[1]}||(this.id==${m10[1]}||${a}===${b}.firstPerson&&${m12[1]}===${d}.playerIdx))&&${m12[2]}.hide(),this.actor.wieldingMelee`],
                    [m13[0], m13[0] + `.sort((a,b)=>${m13[1]}[b].playing-${m13[1]}[a].playing)`],
                    [m14[0], `this.actor?(this.id==${m14[1]}||${a}===${b}.firstPerson&&this.id===${d}.playerIdx)`],
                    [m15[0], `${m15[1]}.shootingAccuracy=Math.min(${m15[1]}.shootingAccuracy+${m15[1]}.accuracyLoss,${m15[1]}.accuracyMin),${m15[1]}.accuracyRecover=-(8*${m15[1]}.constructor.accuracyRecover),` + m15[0]],
                    [m16[0], `${p}.subtract(this.player).length()`],
                    [m17[0], m17[0] + `${a}===${b}.firstPerson&&${m17[1]}.id===${d}.playerIdx&&(document.getElementById("healthContainer").style.display="block",document.getElementById("hardBoiledContainer").style.display="block"),`],
                ];

                for (let r of rr) {
                    let replaced = res.replace(...r);
                    if (replaced == res) {
                        console.log("Failed to replace", r);
                    } else {
                        res = replaced;
                    }
                }
                return res;
            }
            return super.response;

        }
    };
}());
