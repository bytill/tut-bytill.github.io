// Aktiviert :active bei Touch – iOS & Android
document.addEventListener("touchstart", function(){}, true);
// Höhe richtig setzen (mehrfach)
function setAppHeight() {
const vh = (
window.visualViewport?.height ||
document.documentElement.clientHeight ||
 window.innerHeight
);
document.documentElement.style.setProperty('--app-height', `${vh}px`);
}

function updateHeightWithDelays() {
setAppHeight();
setTimeout(setAppHeight, 100);
setTimeout(setAppHeight, 300);
setTimeout(setAppHeight, 1000);
}

window.addEventListener('resize', updateHeightWithDelays);
window.addEventListener('orientationchange', updateHeightWithDelays);
document.addEventListener('visibilitychange', () => {
if (document.visibilityState === 'visible') {
updateHeightWithDelays();
}
});

window.addEventListener('load', () => {
updateHeightWithDelays(); // ← Höhe setzen
});

if ('serviceWorker' in navigator) {
window.addEventListener('load', () => {
    navigator.serviceWorker.register('/scripts/sw.js')
});
}

const miniGames = [
{ id: 'tut-bombe', img_src: "/img/tut-bombe.png", name: 'Bombe', description: 'Die Bombe tickt! Wer das Handy in der Hand hält, wenn sie explodiert, hat Pech – und muss trinken! ⏳💣', count: 0 },
{ id: 'tut-milli', img_src: "/img/tut-milli.png", name: 'Millisekunden', description: 'Hier zählt jede Millisekunde! Wer am schnellsten reagiert, bleibt verschont – die Langsamsten müssen trinken! ⚡🥤', count: 0 },
{ id: 'tut-schnellster', img_src: "/img/tut-schnellster.png", name: 'chnellster', description: 'Stopp die Zeit und finde heraus, wie lange du für ein ganzes Glas brauchst. Wer trinkt am schnellsten? ⏱🍺', count: 0 },
{ id: 'tut-timing', img_src: "/img/tut-timing.png", name: 'Timing', description: 'Exakt 7 Sekunden – nicht mehr, nicht weniger! Wer am genauesten trifft, bleibt trocken. Alle anderen müssen ran! 🎯🥂', count: 0 },
{ id: 'tut-nhie', img_src: "/img/tut-nhie.png", name: 'Ich hab noch nie..', description: 'Wer es erlebt hat, trinkt. 🍻', count: 0 },
{ id: 'tut-truefalse', img_src: "/img/tut-truefalse.png", name: 'True-False', description: 'Richtig oder Falsch? Glaubst du, die richtige Antwort zu kennen? Wenn nicht – Prost! ✅❌', count: 0 },
{ id: 'tut-rundlauf', img_src: "/img/tut-rundlauf.png", name: 'Rundlauf', description: 'Jeder nennt etwas aus einer Kategorie. Dir fällt nichts mehr ein? Pech gehabt – trinken! 🔄🍹', count: 0 },
{ id: 'tut-schätzmal', img_src: "/img/tut-schätzmal.png", name: 'Schätz doch mal..', description: 'Schätzen statt Raten! Wer nah dran ist, kommt glimpflich davon. Wer danebenliegt, leert das Glas! 🎲🥤', count: 0 },
// weitere Spiele...
];

function renderMiniGameScroll() {
    const scrollContainer = document.getElementById('dynamicMiniGames');
    scrollContainer.innerHTML = '';
  
    miniGames.forEach(game => {
      const gameDiv = document.createElement('div');
      gameDiv.className = 'minispiel-item';
      gameDiv.innerHTML = `
        <img src="${game.img_src}" alt="${game.name}">
        <div class="minispiel-name">${game.name}</div>
      `;
  
      // Optional: Spiel starten / aufrufen
      gameDiv.addEventListener('click', () => {
        console.log(`Spiel gewählt: ${game.name}`);
        // window.location.href = `/spiele/${game.id}.html`; // Beispiel
      });
  
      scrollContainer.appendChild(gameDiv);
    });
  }
  
  document.addEventListener('DOMContentLoaded', renderMiniGameScroll);