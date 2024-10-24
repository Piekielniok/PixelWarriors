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
    <div id="cards_select_cards"></div>
    <div class="cards-select__btn">
      <button id="cards_select_ready_btn" class="pixel-corners">GOTOWY</button>
    </div>
  </div>
`;

const cardsSelectFunctions = (loadPage, currentPlayer, factionID, cardsData) => {
    const playerContainer = document.getElementById('cards_select_player');
    const cardsContainer = document.getElementById('cards_select_cards');
    const factionCards = cardsData.cards.filter(card => card.faction == factionID);

    playerContainer.innerHTML = currentPlayer;
    playerContainer.style.color = currentPlayer == 1 ? 'red' : 'blue';

    for (let i = 0; i < factionCards.length; i++) {
        const cardContainer = `
            <div id="card-${factionCards[i].id}" class="cards-select__card-container pixel-corners3" style="background-image: url('../img/cards/${factionCards[i].pictureFilename}')">
              <div class="cards-select__card-function">
                <span class="cards-select__card-power">${factionCards[i].power}</span>
              </div>
              <div class="cards-select__card-range">
                ${factionCards[i].range === 1 ? "bliski" : "daleki"}
              </div>
              ${factionCards[i].ability != "none" ? "<div class='cards-select__card-ability'>" + factionCards[i].ability + "</div>" : ""}
            </div>
        `;
        cardsContainer.innerHTML += cardContainer;
    }

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