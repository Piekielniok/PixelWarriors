const cardsData = `
{
  "cards": [
    {
      "name": "Biedna Pierdolona Piechota",
      "power": 15,
      "description": "",
      "pictureFilename": "nor_poor_infantry.webp",
      "faction": 1,
      "range": 1,
      "function": "hero",
      "ability": "spy"
    },
    {
      "name": "Biedna Pierdolona Piechota",
      "power": 15,
      "description": "",
      "pictureFilename": "nor_poor_infantry.webp",
      "faction": 1,
      "range": 1,
      "function": "hero",
      "ability": "spy"
    }
  ]
}
`;

const parsedCardsData = JSON.parse(cardsData);

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
        <div id="cards_select_cards">

        </div>

        <div class="cards-select__btn">
            <button id="cards_select_ready_btn" class="pixel-corners">GOTOWY</button>
        </div>
    </div>
`;

const cardsSelectFunctions = (loadPage, currentPlayer) => {
    const playerContainer = document.getElementById('cards_select_player');
    const cardsContainer = document.getElementById('cards_select_cards');

    playerContainer.innerHTML = currentPlayer;
    playerContainer.style.color = currentPlayer == 1 ? 'red' : 'blue';

    cardsContainer.innerHTML = parsedCardsData.cards[0].name;



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