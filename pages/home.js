//import { loadPage } from "../scripts/main.js";

const homeContent = `
    <section class="home">
        <h1>Forged<br>Realms</h1>
        <button class="pixel-corners" id="home_play_btn">GRAJ TERAZ</button>
    </section>
`;

const homeFunctions = (loadPage) => {
    document.getElementById('home_play_btn').addEventListener('click', e => {
        loadPage('factionSelect', 1);
    });
};

export { homeContent, homeFunctions };