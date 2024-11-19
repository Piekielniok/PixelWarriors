//import { loadPage } from "../scripts/main.js";

const homeContent = `
    <section class="home">
        <button class="pixel-corners2" id="open_fullscreen_btn">Tryb pełnoekranowy</button>
        <h1>Pixel<br>Warriors</h1>
        <button class="pixel-corners" id="home_play_btn">GRAJ TERAZ</button>
    </section>
`;

const homeFunctions = (loadPage) => {
    document.getElementById('home_play_btn').addEventListener('click', e => {
        loadPage('factionSelect', 1);
    });

    document.getElementById('open_fullscreen_btn').addEventListener('click', e => {
        let isInFullScreen = (document.fullscreenElement && document.fullscreenElement !== null) ||
        (document.webkitFullscreenElement && document.webkitFullscreenElement !== null) ||
        (document.mozFullScreenElement && document.mozFullScreenElement !== null) ||
        (document.msFullscreenElement && document.msFullscreenElement !== null);

        let docElm = document.documentElement;
        if (!isInFullScreen) {
            if (docElm.requestFullscreen) {
                docElm.requestFullscreen();
            } else if (docElm.mozRequestFullScreen) {
                docElm.mozRequestFullScreen();
            } else if (docElm.webkitRequestFullScreen) {
                docElm.webkitRequestFullScreen();
            } else if (docElm.msRequestFullscreen) {
                docElm.msRequestFullscreen();
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
        }
    });
};

export { homeContent, homeFunctions };