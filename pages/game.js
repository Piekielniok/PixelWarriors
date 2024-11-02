const gameContent = `
  <div class="game">
    <div class="game__player2--drawer">
      <img src="../img/ui/caret-down-solid.svg" id="game_player2_show_drawer">
      <div id="game_player2_drawer_container">
        <div class="game__player2--drawer">
          <img src="../img/ui/caret-up-solid.svg" id="game_player2_hide_drawer">
        </div>
        <div id="player2_drawer_cards"></div>
      </div>
    </div>
    <div class="game__sidebar">
      <div class="sidebar__score-container">
        <span id="game_player2_long_range_score">0</span>
        <span id="game_player2_close_range_score">0</span>
        <span id="game_player1_close_range_score">0</span>
        <span id="game_player1_long_range_score">0</span>
      </div>
    </div>
    <div class="game__main-container">
      <div class="game__player2--info">
        <span id="game_player2_total_score">0</span>
        <button id="game_player2_end_round" class="pixel-corners2 next-round-button-gray">Zagraj kartę</button>
      </div>
      <div class="game__player2--rows">
        <div id="game_player2_long_range_row"></div>
        <div id="game_player2_close_range_row"></div>
      </div>
      <div class="game__player1--rows">
        <div id="game_player1_close_range_row"></div>
        <div id="game_player1_long_range_row"></div>
      </div>
      <div class="game__player1--info">
        <span id="game_player1_total_score">0</span>
        <button id="game_player1_end_round" class="pixel-corners2 next-round-button-gray">Zagraj kartę</button>
      </div>
    </div>
    <div class="game__player1--drawer">
      <img src="../img/ui/caret-up-solid.svg" id="game_player1_show_drawer">
      <div id="game_player1_drawer_container">
        <div class="game__player1--drawer">
          <img src="../img/ui/caret-down-solid.svg" id="game_player1_hide_drawer">
        </div>
        <div id="player1_drawer_cards"></div>
      </div>
    </div>
  </div>
`;

const gameFunctions = (loadPage, startingPlayer, player1Faction, player2Faction, player1Cards, player2Cards) => {
  const player1DrawerShowButton = document.getElementById("game_player1_show_drawer");
  const player2DrawerShowButton = document.getElementById("game_player2_show_drawer");
  const player1DrawerHideButton = document.getElementById("game_player1_hide_drawer");
  const player2DrawerHideButton = document.getElementById("game_player2_hide_drawer");
  const player2DrawerContainer = document.getElementById("game_player2_drawer_container");
  const player1DrawerContainer = document.getElementById("game_player1_drawer_container");
  const player1DrawerCards = document.getElementById("player1_drawer_cards");
  const player2DrawerCards = document.getElementById("player2_drawer_cards");
  const player1EndRoundButton = document.getElementById('game_player1_end_round');
  const player2EndRoundButton = document.getElementById('game_player2_end_round');
  const player1TotalScore = document.getElementById('game_player1_total_score');
  const player2TotalScore = document.getElementById('game_player2_total_score');
  const player1CloseRangeRow = document.getElementById('game_player1_close_range_row');
  const player1LongRangeRow = document.getElementById('game_player1_long_range_row');
  const player2CloseRangeRow = document.getElementById('game_player2_close_range_row');
  const player2LongRangeRow = document.getElementById('game_player2_long_range_row');
  let player1DeckCards = player1Cards.map(a => ({...a}));
  let player2DeckCards = player2Cards.map(a => ({...a}));
  let player1SelectedCard = '';
  let player2SelectedCard = '';
  let player1BlockInput = true;
  let player2BlockInput = true;
  let activePlayer = 0;

  const changePlayer = () => {
    if (activePlayer == 0) {
      activePlayer = startingPlayer;
      if (activePlayer == 1) {
        player1EndRoundButton.classList.remove('next-round-button-gray');
        player1BlockInput = false;
      }
      else {
        player2EndRoundButton.classList.remove('next-round-button-gray');
        player1TotalScore.style.transform = 'rotate(180deg)';
        player2TotalScore.style.transform = 'rotate(180deg)';
        player2BlockInput = false;
      }
    }
    else {
      if (activePlayer == 1) {
        player1BlockInput = true;
        player2BlockInput = true;
        activePlayer = 2;
        player2EndRoundButton.classList.remove('next-round-button-gray');
        player1EndRoundButton.classList.add('next-round-button-gray');
        player1TotalScore.style.transform = 'rotate(180deg)';
        player2TotalScore.style.transform = 'rotate(180deg)';
        player2BlockInput = false;
      }
      else {
        player1BlockInput = true;
        player2BlockInput = true;
        activePlayer = 1;
        player1EndRoundButton.classList.remove('next-round-button-gray');
        player2EndRoundButton.classList.add('next-round-button-gray');
        player1TotalScore.style.transform = 'rotate(0deg)';
        player2TotalScore.style.transform = 'rotate(0deg)';
        player1BlockInput = false;
      }
    }
  }

  changePlayer();

  player1EndRoundButton.addEventListener('click', e => {
    if (!player1BlockInput) {
      player1BlockInput = true;
      player2BlockInput = true;

      if (activePlayer == 1) {
        if (player1SelectedCard != '') {
          const selectedCardObj = player1DeckCards.find(({ id }) => id == player1SelectedCard.replace('card-', ''));
          let selectedRow;
    
          if (selectedCardObj.range == 1) {
            selectedRow = player1CloseRangeRow;
          }
          else {
            selectedRow = player1LongRangeRow;
          }
    
          selectedRow.innerHTML += `
              <div id="played_card-${selectedCardObj.id}" class="game__played-card-container card-pick-animation">
                <div class="game__played-card-inner">
                  <div class="game__played-card-front pixel-corners3" style="background-image: url('../img/cards/${selectedCardObj.pictureFilename}')">
                    <div class="game__card-function">
                      <span class="game__card-power">${selectedCardObj.power}</span>
                    </div>
                    <div class="game__card-range">
                      ${selectedCardObj.range === 1 ? "bliski" : "daleki"}
                    </div>
                    ${selectedCardObj.ability != "none" ? "<div class='game__card-ability'>" + selectedCardObj.ability + "</div>" : ""}
                  </div>
                  <div class="game__played-card-back pixel-corners3"></div>
                </div>
              </div>
            `;
    
            selectedRow.style.zIndex = 2;
            player1SelectedCard = '';
            player1DeckCards.splice(player1DeckCards.findIndex(card => card.id === selectedCardObj.id), 1);
            player1EndRoundButton.classList.add('next-round-button-gray');
            player2TotalScore.style.transform = 'rotate(180deg)';
            refreshPlayer1Cards();
    
            setTimeout(() => {
              document.getElementById(`played_card-${selectedCardObj.id}`).classList.remove('card-pick-animation');
              selectedRow.style.removeProperty('z-index');
    
              changePlayer();
            }, 2000);
        }
        else {
          changePlayer();
        }
      }
    }
  });

  player2EndRoundButton.addEventListener('click', e => {
    if (!player2BlockInput) {
      player1BlockInput = true;
      player2BlockInput = true;

      if (activePlayer == 2) {
        if (player2SelectedCard != '') {
          const selectedCardObj = player2DeckCards.find(({ id }) => id == player2SelectedCard.replace('card-', ''));
          let selectedRow;
    
          if (selectedCardObj.range == 1) {
            selectedRow = player2CloseRangeRow;
          }
          else {
            selectedRow = player2LongRangeRow;
          }
    
          selectedRow.innerHTML += `
              <div id="played_card-${selectedCardObj.id}" class="game__played-card-container card-pick-animation">
                <div class="game__played-card-inner">
                  <div class="game__played-card-front pixel-corners3" style="background-image: url('../img/cards/${selectedCardObj.pictureFilename}')">
                    <div class="game__card-function">
                      <span class="game__card-power">${selectedCardObj.power}</span>
                    </div>
                    <div class="game__card-range">
                      ${selectedCardObj.range === 1 ? "bliski" : "daleki"}
                    </div>
                    ${selectedCardObj.ability != "none" ? "<div class='game__card-ability'>" + selectedCardObj.ability + "</div>" : ""}
                  </div>
                  <div class="game__played-card-back pixel-corners3"></div>
                </div>
              </div>
            `;
    
            selectedRow.style.zIndex = 2;
            player2SelectedCard = '';
            player2DeckCards.splice(player2DeckCards.findIndex(card => card.id === selectedCardObj.id), 1);
            player2EndRoundButton.classList.add('next-round-button-gray');
            player1TotalScore.style.transform = 'rotate(0deg)';
            refreshPlayer2Cards();
    
            setTimeout(() => {
              document.getElementById(`played_card-${selectedCardObj.id}`).classList.remove('card-pick-animation');
              selectedRow.style.removeProperty('z-index');
  
              changePlayer();
            }, 2000);
        }
        else {
          changePlayer();
        }
      }
    }
  });

  const refreshPlayer1Cards = () => {
    player1DrawerCards.innerHTML = '';
    
    for (let i = 0; i < player1DeckCards.length; i++) {
      player1DrawerCards.innerHTML += `
        <div id="card-${player1DeckCards[i].id}" class="game__card-container pixel-corners3 ${player1SelectedCard == 'card-' + player1DeckCards[i].id ? 'selected-card' : ''}" style="background-image: url('../img/cards/${player1DeckCards[i].pictureFilename}')">
          <div class="game__card-function">
            <span class="game__card-power">${player1DeckCards[i].power}</span>
          </div>
          <div class="game__card-range">
            ${player1DeckCards[i].range === 1 ? "bliski" : "daleki"}
          </div>
          ${player1DeckCards[i].ability != "none" ? "<div class='game__card-ability'>" + player1DeckCards[i].ability + "</div>" : ""}
        </div>
      `;
    }
  }

  const refreshPlayer2Cards = () => {
    player2DrawerCards.innerHTML = '';

    for (let i = 0; i < player2DeckCards.length; i++) {
      player2DrawerCards.innerHTML += `
        <div id="card-${player2DeckCards[i].id}" class="game__card-container pixel-corners3 ${player2SelectedCard == 'card-' + player2DeckCards[i].id ? 'selected-card' : ''}" style="background-image: url('../img/cards/${player2DeckCards[i].pictureFilename}')">
          <div class="game__card-function">
            <span class="game__card-power">${player2DeckCards[i].power}</span>
          </div>
          <div class="game__card-range">
            ${player2DeckCards[i].range === 1 ? "bliski" : "daleki"}
          </div>
          ${player2DeckCards[i].ability != "none" ? "<div class='game__card-ability'>" + player2DeckCards[i].ability + "</div>" : ""}
        </div>
      `;
    }
  }

  refreshPlayer1Cards();
  refreshPlayer2Cards();

  player1DrawerShowButton.addEventListener('click', e => {
    if (activePlayer == 1 & !player1BlockInput) {
      player1DrawerContainer.style.top = '-20rem';
    }
  });

  player2DrawerShowButton.addEventListener('click', e => {
    if (activePlayer == 2 & !player2BlockInput) {
      player2DrawerContainer.style.bottom = '-20rem';
    }
  });

  player1DrawerHideButton.addEventListener('click', e => {
    player1DrawerContainer.style.top = '2rem';
  });

  player2DrawerHideButton.addEventListener('click', e => {
    player2DrawerContainer.style.bottom = '2rem';
  });

  player1DrawerCards.addEventListener('click', e => {
    const cardID = e.target.closest('.game__card-container').id;
    player1SelectedCard = cardID;

    refreshPlayer1Cards();
  });

  player2DrawerCards.addEventListener('click', e => {
    const cardID = e.target.closest('.game__card-container').id;
    player2SelectedCard = cardID;

    refreshPlayer2Cards();
  });

  // gameContainer.innerHTML += `<span>Zaczyna gracz - ${startingPlayer}</span>`;
  // gameContainer.innerHTML += `<span>Frakcja gracz 1 - ${player1Faction}</span>`;
  // gameContainer.innerHTML += `<span>Frakcja gracz 2 - ${player2Faction}</span>`;
  // gameContainer.innerHTML += `<span>Talia gracz 1 - ${player1Cards}</span>`;
  // gameContainer.innerHTML += `<span>Talia gracz 2 - ${player2Cards}</span>`;
};

export { gameContent, gameFunctions };