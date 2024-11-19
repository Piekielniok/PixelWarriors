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
      <p>Funkcja</p>
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
    const readyBtn = document.getElementById('cards_select_ready_btn');
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
              filteredCards = filteredCards.filter(card => card.function == 'frost' || card.function == 'fog' || card.function == 'clear');
              break;
            case 'filter_special':
              filteredCards = filteredCards.filter(card => card.function == 'horn' || card.function == 'decoy' || card.function == 'scorch');
              break;
            case 'filter_hero':
              filteredCards = filteredCards.filter(card => card.function == 'hero');
              break;
          }
        }
      }
      
      cardsNumber.innerHTML = `Ilość kart: <b style="color: ${selectedCards.length < 22 ? '#f00' : '#34eb43'}">${selectedCards.length}</b>/22`;
      cardsContainer.innerHTML = '';

      for (let i = 0; i < filteredCards.length; i++) {
        const cardContainer = `
          <div id="card-${filteredCards[i].id}" class="cards-select__card-container pixel-corners3 ${selectedCards.indexOf('card-' + filteredCards[i].id) != -1 ? 'selected-card' : ''}" style="background-image: url('../img/cards/${filteredCards[i].pictureFilename}')">
            <div class="cards-select__card-function" style="background-image: url('../img/function/${filteredCards[i].function}.png')">
              <span class="cards-select__card-power" style="color: ${filteredCards[i].function == 'hero' ? '#ffffff' : '#2b2b2b'}">${filteredCards[i].function == 'std' || filteredCards[i].function == 'hero' ? filteredCards[i].power : ""}</span>
            </div>
            ${filteredCards[i].range != 0 ? `<div class="cards-select__card-range" style="background-image: url('../img/range/`+ filteredCards[i].range + `.png')"></div>` : ""}
            ${filteredCards[i].ability != "none" ? `<div class="cards-select__card-ability" style="background-image: url('../img/ability/`+ filteredCards[i].ability + `.png')"></div>` : ""}
          </div>
        `;
        cardsContainer.innerHTML += cardContainer;
      }

      if (selectedCards.length < 22) {
        readyBtn.style.background = 'linear-gradient(30deg, #303336, #494c50)';
        readyBtn.classList.add('disabled-btn');
      }
      else {
        readyBtn.style.background = 'linear-gradient(30deg, #326197, #3386E8)';
        readyBtn.classList.remove('disabled-btn');
      }
    };

    playerContainer.innerHTML = currentPlayer;
    playerContainer.style.color = currentPlayer == 1 ? '#e8aa0e' : '#348ceb';

    rangeFiltersContainer.addEventListener('click', e => {
      refreshCards();
    });

    functionFiltersContainer.addEventListener('click', e => {
      refreshCards();
    });

    cardsContainer.addEventListener('click', e => {
      let cardID, arrayIndex;
      if (e.target.closest('.cards-select__card-container') != null) {
        cardID = e.target.closest('.cards-select__card-container').id;
        arrayIndex = selectedCards.indexOf(cardID);

        if (arrayIndex == -1) {
          selectedCards.push(cardID);
        }
        else {
          selectedCards.splice(arrayIndex, 1);
        }
      }
      refreshCards();
    });

    refreshCards();

    readyBtn.addEventListener('click', e => {
      if (selectedCards.length >= 22) {
        if (currentPlayer == 1) {
          loadPage('factionSelect', 2, selectedCards);
        }
        else {
            loadPage('pickPlayer', selectedCards);
        }
      }
    });
};

export { cardsSelectContent, cardsSelectFunctions };