var player = 0;
const factionSelectContent = `
    <div class="faction-select">    
        <div class="faction-select__text">
            <h3>GRACZ <b id="faction_select_player"></b></h3>
            <span>Wybierz frakcję, z której będziesz następnie dobierać karty.</span>
        </div>
        <div class="faction-select__menu">
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
    document.getElementById('faction_select_player').style.color = currentPlayer == 1 ? 'red' : 'blue';
    document.getElementById('faction_select_ready_btn').addEventListener('click', e => {
        loadPage('cardsSelect', currentPlayer);
    });
};

export { factionSelectContent, factionSelectFunctions };