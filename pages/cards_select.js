let cards_number = 0;
var currentPlayer = 0;
const cardsSelectContent = `
    <div class="cards-select">
        <div class="cards-select__text">
            <span>Gracz <b id="cards_select_player"></b></span>
            <span>Ilość kart: ${cards_number}/22</span>
        </div>
        <div class="cards-select__filter--range">
            <p>Zasięg</p>
            <span id="">Bliski</span>
            <span id="">Daleki</span>
        </div>
        <div class="cards-select__filter--function">
            <p>Funkcje</p>
            <span id="">Pogodowe</span>
            <span id="">Specjalne</span>
            <span id="">Bohaterowie</span>
        </div>
        <div class="cards-select__cards">

        </div>

        <div class="cards-select__btn">
            <button id="cards_select_ready_btn" class="pixel-corners">GOTOWY</button>
        </div>
    </div>
`;

const cardsSelectFunctions = (loadPage, currentPlayer) => {
    document.getElementById('cards_select_player').innerHTML = currentPlayer;
    document.getElementById('cards_select_player').style.color = currentPlayer == 1 ? 'red' : 'blue';
    document.getElementById('cards_select_ready_btn').addEventListener('click', e => {
        if (currentPlayer == 1) {
            loadPage('factionSelect', 2);
        }
        else {
            loadPage('pickPlayer');
        }
    });
};

export { cardsSelectContent, cardsSelectFunctions };