var player = 0;
const factionSelectContent = `
    <div class="faction-select">
        <div class="faction-select__player">
            <h3>GRACZ <b id="faction_select_player"></b></h3>
        </div>  
        <div class="faction-select__menu">
            <span>Wybierz frakcję,<br> z której będziesz następnie dobierać karty.</span>
            <select id="faction_select_dropdown" class="pixel-corners2">
                <option value="1">Zakon Żywego Żelaza</option>            
                <option value="2">Wygnańcy Mroku</option>            
                <option value="3">Bractwo Młota</option>            

            </select>
        </div>
        <button id="faction_select_ready_btn" class="pixel-corners">PRZEJDŹ DALEJ</button>
    </div>
`;

const factionSelectFunctions = (loadPage, currentPlayer) => {
    document.getElementById('faction_select_player').innerHTML = currentPlayer;
    document.getElementById('faction_select_player').style.color = currentPlayer == 1 ? '#e8aa0e' : '#348ceb';
    document.getElementById('faction_select_ready_btn').addEventListener('click', e => {
        const factionID = document.getElementById('faction_select_dropdown').value;
        loadPage('cardsSelect', currentPlayer, factionID);
    });
};

export { factionSelectContent, factionSelectFunctions };