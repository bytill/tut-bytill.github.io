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