var currentPlayer = 0;
const cardsSelectContent = `
  <div class="cards-select">
    <div class="cards-select__text">
      <span>Gracz <b id="cards_select_player"></b></span>
      <span id="cards_select_cards_number">Ilość kart: 0/22</span>
    </div>
    <div class="cards-select__filter--range">
      <p>Zasięg</p>
      <label for="filter_close">
        <input id="filter_close" type="checkbox" />
        <span>Bliski</span>
      </label>
      <label for="filter_long">
        <input id="filter_long" type="checkbox" />
        <span>Daleki</span>
      </label>
    </div>
    <div class="cards-select__filter--function">
      <p>Funkcje</p>
      <label for="filter_weather">
        <input id="filter_weather" type="checkbox" />
        <span>Pogodowe</span>
      </label>
      <label for="filter_special">
        <input id="filter_special" type="checkbox" />
        <span>Specjalne</span>
      </label>
      <label for="filter_hero">
        <input id="filter_hero" type="checkbox" />
        <span>Bohaterowie</span>
      </label>
    </div>
    <div id="cards_select_cards"></div>
    <div class="cards-select__btn">
      <button id="cards_select_ready_btn" class="pixel-corners">GOTOWY</button>
    </div>
  </div>
`;

const cardsSelectFunctions = (loadPage, currentPlayer, factionID, cardsData) => {
    const playerContainer = document.getElementById('cards_select_player');
    const cardsNumber = document.getElementById('cards_select_cards_number');
    const cardsContainer = document.getElementById('cards_select_cards');
    const factionCards = cardsData.cards.filter(card => card.faction == factionID);
    const rangeFiltersContainer = document.querySelector('.cards-select__filter--range');
    const rangeFilters = document.querySelectorAll('.cards-select__filter--range input');
    const functionFiltersContainer = document.querySelector('.cards-select__filter--function');
    const functionFilters = document.querySelectorAll('.cards-select__filter--function input');
    let filteredCards = [];
    let selectedCards = [];

    const refreshCards = () => {
      filteredCards = factionCards;

      for (let i = 0; i < rangeFilters.length; i++) {
        if (rangeFilters[i].checked)  {
          filteredCards = filteredCards.filter(card => card.range == i + 1);
        }
      }

      for (let i = 0; i < functionFilters.length; i++) {
        if (functionFilters[i].checked)  {
          switch (functionFilters[i].id) {
            case 'filter_weather':
              filteredCards = filteredCards.filter(card => card.function == 'weather');
              break;
            case 'filter_special':
              filteredCards = filteredCards.filter(card => card.function == 'special');
              break;
            case 'filter_hero':
              filteredCards = filteredCards.filter(card => card.function == 'hero');
              break;
          }
        }
      }
      
      cardsNumber.innerHTML = `Ilość kart: ${selectedCards.length}/22`;
      cardsContainer.innerHTML = '';

      for (let i = 0; i < filteredCards.length; i++) {
        const cardContainer = `
          <div id="card-${filteredCards[i].id}" class="cards-select__card-container pixel-corners3 ${selectedCards.indexOf('card-' + filteredCards[i].id) != -1 ? 'selected-card' : ''}" style="background-image: url('../img/cards/${filteredCards[i].pictureFilename}')">
            <div class="cards-select__card-function">
              <span class="cards-select__card-power">${filteredCards[i].power}</span>
            </div>
            <div class="cards-select__card-range">
              ${filteredCards[i].range === 1 ? "bliski" : "daleki"}
            </div>
            ${filteredCards[i].ability != "none" ? "<div class='cards-select__card-ability'>" + filteredCards[i].ability + "</div>" : ""}
          </div>
        `;
        cardsContainer.innerHTML += cardContainer;
      }
    };

    playerContainer.innerHTML = currentPlayer;
    playerContainer.style.color = currentPlayer == 1 ? 'red' : 'blue';

    rangeFiltersContainer.addEventListener('click', e => {
      refreshCards();
    });

    functionFiltersContainer.addEventListener('click', e => {
      refreshCards();
    });

    cardsContainer.addEventListener('click', e => {
      const cardID = e.target.closest('.cards-select__card-container').id;
      const arrayIndex = selectedCards.indexOf(cardID);

      if (arrayIndex == -1) {
        selectedCards.push(cardID);
      }
      else {
        selectedCards.splice(arrayIndex, 1);
      }

      refreshCards();
    });

    refreshCards();

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