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
        <div class="row" id="game_player2_long_range_row"></div>
        <div class="row" id="game_player2_close_range_row"></div>
      </div>
      <div class="game__player1--rows">
        <div class="row" id="game_player1_close_range_row"></div>
        <div class="row" id="game_player1_long_range_row"></div>
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
  const player2LongRangeScore = document.getElementById('game_player2_long_range_score');
  const player2CloseRangeScore = document.getElementById('game_player2_close_range_score');
  const player1CloseRangeScore = document.getElementById('game_player1_close_range_score');
  const player1LongRangeScore = document.getElementById('game_player1_long_range_score');
  const player1Rows = document.querySelector('.game__player1--rows');
  const player2Rows = document.querySelector('.game__player2--rows');
  let player2LongRangeCards = [];
  let player2CloseRangeCards = [];
  let player1CloseRangeCards = [];
  let player1LongRangeCards = [];
  let player1DeckCards = [];
  let player2DeckCards = [];
  let player1LeftCards = [];
  let player2LeftCards = [];
  let player1RejectedCards = [];
  let player2RejectedCards = [];
  let player1SelectedCard = '';
  let player2SelectedCard = '';
  let player1BlockInput = true;
  let player2BlockInput = true;
  let player1DecoyActive = false;
  let player2DecoyActive = false;
  let player1DecoySelectedCard, player2DecoySelectedCard;
  let activePlayer = 0;

  const selectRandomCards = ([...arr], n = 1) => {
    let m = arr.length;
    while (m) {
      const i = Math.floor(Math.random() * m--);
      [arr[m], arr[i]] = [arr[i], arr[m]];
    }
    return arr.slice(0, n);
  };

  let player1RandomCardsIndex = selectRandomCards([...Array(player1Cards.length).keys()], 10);
  let player2RandomCardsIndex = selectRandomCards([...Array(player2Cards.length).keys()], 10);

  for (let i = 0; i < player1RandomCardsIndex.length; i++) {
    player1DeckCards.push(player1Cards[player1RandomCardsIndex[i]]);
  }

  for (let i = 0; i < player2RandomCardsIndex.length; i++) {
    player2DeckCards.push(player2Cards[player2RandomCardsIndex[i]]);
  }

  function removeElements(a, i) {
    return a.reduce((acc, current, index) => {
        if (!i.includes(index)) {
            acc.push(current);
        }
        return acc;
    }, []);
  }

  player1LeftCards = removeElements(player1Cards, player1RandomCardsIndex);
  player2LeftCards = removeElements(player2Cards, player2RandomCardsIndex);

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
  };

  changePlayer();

  const calculateScore = () => {
    let player2LongRangeScoreNumber = 0;
    let player2CloseRangeScoreNumber = 0;
    let player1CloseRangeScoreNumber = 0;
    let player1LongRangeScoreNumber = 0;

    let player2LongRangeBonds = player2LongRangeCards.filter(card => card.ability == 'bond').reduce((acc, val) => { acc[val.name] = acc[val.name] === undefined ? 1 : acc[val.name] += 1; return acc; }, {});
    let player2CloseRangeBonds = player2CloseRangeCards.filter(card => card.ability == 'bond').reduce((acc, val) => { acc[val.name] = acc[val.name] === undefined ? 1 : acc[val.name] += 1; return acc; }, {});
    let player1CloseRangeBonds = player1CloseRangeCards.filter(card => card.ability == 'bond').reduce((acc, val) => { acc[val.name] = acc[val.name] === undefined ? 1 : acc[val.name] += 1; return acc; }, {});
    let player1LongRangeBonds = player1LongRangeCards.filter(card => card.ability == 'bond').reduce((acc, val) => { acc[val.name] = acc[val.name] === undefined ? 1 : acc[val.name] += 1; return acc; }, {});

    let player2LongRangeMorale = player2LongRangeCards.filter(card => card.ability == 'morale');
    let player2CloseRangeMorale = player2CloseRangeCards.filter(card => card.ability == 'morale');
    let player1CloseRangeMorale = player1CloseRangeCards.filter(card => card.ability == 'morale');
    let player1LongRangeMorale = player1LongRangeCards.filter(card => card.ability == 'morale');

    let player2LongRangeHorn = player2LongRangeCards.filter(card => card.function == 'horn').length == 1 ? 2 : 1;
    let player2CloseRangeHorn = player2CloseRangeCards.filter(card => card.function == 'horn').length == 1 ? 2 : 1;
    let player1CloseRangeHorn = player1CloseRangeCards.filter(card => card.function == 'horn').length == 1 ? 2 : 1;
    let player1LongRangeHorn = player1LongRangeCards.filter(card => card.function == 'horn').length == 1 ? 2 : 1;

    let player2Fog = player2LongRangeCards.filter(card => card.function == 'fog').length == 1 ? 1 : 0;
    let player2Frost = player2CloseRangeCards.filter(card => card.function == 'frost').length == 1 ? 1 : 0;
    let player1Frost = player1CloseRangeCards.filter(card => card.function == 'frost').length == 1 ? 1 : 0;
    let player1Fog = player1LongRangeCards.filter(card => card.function == 'fog').length == 1 ? 1 : 0;

    player2LongRangeCards.forEach(card => {
      if (card.ability == 'bond') {
        player2LongRangeScoreNumber += (((player1Fog == 1 || player2Fog == 1 ? 1 : card.power) * parseInt(player2LongRangeBonds[card.name])) + player2LongRangeMorale.length) * player2LongRangeHorn;
        player2LongRangeRow.querySelector(`#player2_played_card-${card.id} .game__card-power`).innerText = (((player1Fog == 1 || player2Fog == 1 ? 1 : card.power) * parseInt(player2LongRangeBonds[card.name])) + player2LongRangeMorale.length) * player2LongRangeHorn;
      }
      else if (card.ability == 'morale') {
        player2LongRangeScoreNumber += ((player1Fog == 1 || player2Fog == 1 ? 0 : (card.power - 1)) + player2LongRangeMorale.length) * player2LongRangeHorn;
        player2LongRangeRow.querySelector(`#player2_played_card-${card.id} .game__card-power`).innerText = ((player1Fog == 1 || player2Fog == 1 ? 0 : (card.power - 1)) + player2LongRangeMorale.length) * player2LongRangeHorn;
      }
      else if (card.function == 'hero') {
        player2LongRangeScoreNumber += card.power;
        player2LongRangeRow.querySelector(`#player2_played_card-${card.id} .game__card-power`).innerText = card.power;
      }
      else if (card.function == 'horn' || card.function == 'fog' || card.function == 'decoy' || card.function == 'scorch') {
        player2LongRangeRow.querySelector(`#player2_played_card-${card.id} .game__card-power`).innerText = '';
      }
      else {
        player2LongRangeScoreNumber += ((player1Fog == 1 || player2Fog == 1 ? 1 : card.power) + player2LongRangeMorale.length) * player2LongRangeHorn;
        player2LongRangeRow.querySelector(`#player2_played_card-${card.id} .game__card-power`).innerText = ((player1Fog == 1 || player2Fog == 1 ? 1 : card.power) + player2LongRangeMorale.length) * player2LongRangeHorn;
      }
    });

    player2CloseRangeCards.forEach(card => {
      if (card.ability == 'bond') {
        player2CloseRangeScoreNumber += (((player1Frost == 1 || player2Frost == 1 ? 1 : card.power) * parseInt(player2CloseRangeBonds[card.name])) + player2CloseRangeMorale.length) * player2CloseRangeHorn;
        player2CloseRangeRow.querySelector(`#player2_played_card-${card.id} .game__card-power`).innerText = (((player1Frost == 1 || player2Frost == 1 ? 1 : card.power) * parseInt(player2CloseRangeBonds[card.name])) + player2CloseRangeMorale.length) * player2CloseRangeHorn;
      }
      else if (card.ability == 'morale') {
        player2CloseRangeScoreNumber += ((player1Frost == 1 || player2Frost == 1 ? 0 : (card.power - 1)) + player2CloseRangeMorale.length) * player2CloseRangeHorn;
        player2CloseRangeRow.querySelector(`#player2_played_card-${card.id} .game__card-power`).innerText = ((player1Frost == 1 || player2Frost == 1 ? 0 : (card.power - 1)) + player2CloseRangeMorale.length) * player2CloseRangeHorn;
      }
      else if (card.function == 'hero') {
        player2CloseRangeScoreNumber += card.power;
        player2CloseRangeRow.querySelector(`#player2_played_card-${card.id} .game__card-power`).innerText = card.power;
      }
      else if (card.function == 'horn' || card.function == 'frost' || card.function == 'decoy' || card.function == 'scorch') {
        player2CloseRangeRow.querySelector(`#player2_played_card-${card.id} .game__card-power`).innerText = '';
      }
      else {
        player2CloseRangeScoreNumber += ((player1Frost == 1 || player2Frost == 1 ? 1 : card.power) + player2CloseRangeMorale.length) * player2CloseRangeHorn;
        player2CloseRangeRow.querySelector(`#player2_played_card-${card.id} .game__card-power`).innerText = ((player1Frost == 1 || player2Frost == 1 ? 1 : card.power) + player2CloseRangeMorale.length) * player2CloseRangeHorn;
      }
    });

    player1CloseRangeCards.forEach(card => {
      if (card.ability == 'bond') {
        player1CloseRangeScoreNumber += (((player1Frost == 1 || player2Frost == 1 ? 1 : card.power) * parseInt(player1CloseRangeBonds[card.name])) + player1CloseRangeMorale.length) * player1CloseRangeHorn;
        player1CloseRangeRow.querySelector(`#player1_played_card-${card.id} .game__card-power`).innerText = (((player1Frost == 1 || player2Frost == 1 ? 1 : card.power) * parseInt(player1CloseRangeBonds[card.name])) + player1CloseRangeMorale.length) * player1CloseRangeHorn;
      }
      else if (card.ability == 'morale') {
        player1CloseRangeScoreNumber += ((player1Frost == 1 || player2Frost == 1 ? 0 : (card.power - 1)) + player1CloseRangeMorale.length) * player1CloseRangeHorn;
        player1CloseRangeRow.querySelector(`#player1_played_card-${card.id} .game__card-power`).innerText = ((player1Frost == 1 || player2Frost == 1 ? 0 : (card.power - 1)) + player1CloseRangeMorale.length) * player1CloseRangeHorn;
      }
      else if (card.function == 'hero') {
        player1CloseRangeScoreNumber += card.power;
        player1CloseRangeRow.querySelector(`#player1_played_card-${card.id} .game__card-power`).innerText = card.power;
      }
      else if (card.function == 'horn' || card.function == 'frost' || card.function == 'decoy' || card.function == 'scorch') {
        player1CloseRangeRow.querySelector(`#player1_played_card-${card.id} .game__card-power`).innerText = '';
      }
      else {
        player1CloseRangeScoreNumber += ((player1Frost == 1 || player2Frost == 1 ? 1 : card.power) + player1CloseRangeMorale.length) * player1CloseRangeHorn;
        player1CloseRangeRow.querySelector(`#player1_played_card-${card.id} .game__card-power`).innerText = ((player1Frost == 1 || player2Frost == 1 ? 1 : card.power) + player1CloseRangeMorale.length) * player1CloseRangeHorn;
      }
    });

    player1LongRangeCards.forEach(card => {
      if (card.ability == 'bond') {
        player1LongRangeScoreNumber += (((player1Fog == 1 || player2Fog == 1 ? 1 : card.power) * parseInt(player1LongRangeBonds[card.name])) + player1LongRangeMorale.length) * player1LongRangeHorn;
        player1LongRangeRow.querySelector(`#player1_played_card-${card.id} .game__card-power`).innerText = (((player1Fog == 1 || player2Fog == 1 ? 1 : card.power) * parseInt(player1LongRangeBonds[card.name])) + player1LongRangeMorale.length) * player1LongRangeHorn;
      }
      else if (card.ability == 'morale') {
        player1LongRangeScoreNumber += ((player1Fog == 1 || player2Fog == 1 ? 0 : (card.power - 1)) + player1LongRangeMorale.length) * player1LongRangeHorn;
        player1LongRangeRow.querySelector(`#player1_played_card-${card.id} .game__card-power`).innerText = ((player1Fog == 1 || player2Fog == 1 ? 0 : (card.power - 1)) + player1LongRangeMorale.length) * player1LongRangeHorn;
      }
      else if (card.function == 'hero') {
        player1LongRangeScoreNumber += card.power;
        player1LongRangeRow.querySelector(`#player1_played_card-${card.id} .game__card-power`).innerText = card.power;
      }
      else if (card.function == 'horn' || card.function == 'fog' || card.function == 'decoy' || card.function == 'scorch') {
        player1LongRangeRow.querySelector(`#player1_played_card-${card.id} .game__card-power`).innerText = '';
      }
      else {
        player1LongRangeScoreNumber += ((player1Fog == 1 || player2Fog == 1 ? 1 : card.power) + player1LongRangeMorale.length) * player1LongRangeHorn;
        player1LongRangeRow.querySelector(`#player1_played_card-${card.id} .game__card-power`).innerText = ((player1Fog == 1 || player2Fog == 1 ? 1 : card.power) + player1LongRangeMorale.length) * player1LongRangeHorn;
      }
    });

    player2LongRangeScore.innerText = player2LongRangeScoreNumber;
    player2CloseRangeScore.innerText = player2CloseRangeScoreNumber;
    player1CloseRangeScore.innerText = player1CloseRangeScoreNumber;
    player1LongRangeScore.innerText = player1LongRangeScoreNumber;
    player2TotalScore.innerText = player2LongRangeScoreNumber + player2CloseRangeScoreNumber;
    player1TotalScore.innerText = player1LongRangeScoreNumber + player1CloseRangeScoreNumber;

    setTimeout(() => {
      if (player1DeckCards.length == 0 && player2DeckCards.length == 0) {
        if ((player1LongRangeScoreNumber + player1CloseRangeScoreNumber) > (player2LongRangeScoreNumber + player2CloseRangeScoreNumber)) {
          alert("Wygrał Gracz 1 z " + (player1LongRangeScoreNumber + player1CloseRangeScoreNumber) + "pkt");
        }
        else if ((player1LongRangeScoreNumber + player1CloseRangeScoreNumber) < (player2LongRangeScoreNumber + player2CloseRangeScoreNumber)) {
          alert("Wygrał Gracz 2 z " + (player2LongRangeScoreNumber + player2CloseRangeScoreNumber) + "pkt");
        }
        else {
          alert("Remis");
        }
      }
    }, 500);    
  };

  const scorchFunction = (player, range) => {
    if (player == 1) {
      if (range == 1) {
        let highestPower = 0;
        player2CloseRangeCards.forEach(card => {
          if (parseInt(player2CloseRangeRow.querySelector(`#player2_played_card-${card.id} .game__card-power`).innerText) > highestPower && card.function != 'hero') {
            highestPower = parseInt(player2CloseRangeRow.querySelector(`#player2_played_card-${card.id} .game__card-power`).innerText);
          }
        });
        for (let i = player2CloseRangeCards.length - 1; i >= 0; i--) {
          if (parseInt(player2CloseRangeRow.querySelector(`#player2_played_card-${player2CloseRangeCards[i].id} .game__card-power`).innerText) == highestPower && player2CloseRangeCards[i].function != 'hero') {
            player2RejectedCards.push(player2CloseRangeCards[i]);
            player2CloseRangeRow.querySelector(`#player2_played_card-${player2CloseRangeCards[i].id}`).remove();
            player2CloseRangeCards.splice(i, 1);
          }
        }
      }
      else if (range == 2) {
        let highestPower = 0;
        player2LongRangeCards.forEach(card => {
          if (parseInt(player2LongRangeRow.querySelector(`#player2_played_card-${card.id} .game__card-power`).innerText) > highestPower && card.function != 'hero') {
            highestPower = parseInt(player2LongRangeRow.querySelector(`#player2_played_card-${card.id} .game__card-power`).innerText);
          }
        });
        for (let i = player2LongRangeCards.length - 1; i >= 0; i--) {
          if (parseInt(player2LongRangeRow.querySelector(`#player2_played_card-${player2LongRangeCards[i].id} .game__card-power`).innerText) == highestPower && player2LongRangeCards[i].function != 'hero') {
            player2RejectedCards.push(player2LongRangeCards[i]);
            player2LongRangeRow.querySelector(`#player2_played_card-${player2LongRangeCards[i].id}`).remove();
            player2LongRangeCards.splice(i, 1);
          }
        }
      }
    }
    else if (player == 2) {
      if (range == 1) {
        let highestPower = 0;
        player1CloseRangeCards.forEach(card => {
          if (parseInt(player1CloseRangeRow.querySelector(`#player1_played_card-${card.id} .game__card-power`).innerText) > highestPower && card.function != 'hero') {
            highestPower = parseInt(player1CloseRangeRow.querySelector(`#player1_played_card-${card.id} .game__card-power`).innerText);
          }
        });
        for (let i = player1CloseRangeCards.length - 1; i >= 0; i--) {
          if (parseInt(player1CloseRangeRow.querySelector(`#player1_played_card-${player1CloseRangeCards[i].id} .game__card-power`).innerText) == highestPower && player1CloseRangeCards[i].function != 'hero') {
            player1RejectedCards.push(player1CloseRangeCards[i]);
            player1CloseRangeRow.querySelector(`#player1_played_card-${player1CloseRangeCards[i].id}`).remove();
            player1CloseRangeCards.splice(i, 1);
          }
        }
      }
      else if (range == 2) {
        let highestPower = 0;
        player1LongRangeCards.forEach(card => {
          if (parseInt(player1LongRangeRow.querySelector(`#player1_played_card-${card.id} .game__card-power`).innerText) > highestPower && card.function != 'hero') {
            highestPower = parseInt(player1LongRangeRow.querySelector(`#player1_played_card-${card.id} .game__card-power`).innerText);
          }
        });
        for (let i = player1LongRangeCards.length - 1; i >= 0; i--) {
          if (parseInt(player1LongRangeRow.querySelector(`#player1_played_card-${player1LongRangeCards[i].id} .game__card-power`).innerText) == highestPower && player1LongRangeCards[i].function != 'hero') {
            player1RejectedCards.push(player1LongRangeCards[i]);
            player1LongRangeRow.querySelector(`#player1_played_card-${player1LongRangeCards[i].id}`).remove();
            player1LongRangeCards.splice(i, 1);
          }
        }
      }
    }
  };

  const globalScorchFunction = () => {
    let highestPower = 0;

    player2CloseRangeCards.forEach(card => {
      if (parseInt(player2CloseRangeRow.querySelector(`#player2_played_card-${card.id} .game__card-power`).innerText) > highestPower && card.function != 'hero') {
        highestPower = parseInt(player2CloseRangeRow.querySelector(`#player2_played_card-${card.id} .game__card-power`).innerText);
      }
    });
    player2LongRangeCards.forEach(card => {
      if (parseInt(player2LongRangeRow.querySelector(`#player2_played_card-${card.id} .game__card-power`).innerText) > highestPower && card.function != 'hero') {
        highestPower = parseInt(player2LongRangeRow.querySelector(`#player2_played_card-${card.id} .game__card-power`).innerText);
      }
    });
    player1CloseRangeCards.forEach(card => {
      if (parseInt(player1CloseRangeRow.querySelector(`#player1_played_card-${card.id} .game__card-power`).innerText) > highestPower && card.function != 'hero') {
        highestPower = parseInt(player1CloseRangeRow.querySelector(`#player1_played_card-${card.id} .game__card-power`).innerText);
      }
    });
    player1LongRangeCards.forEach(card => {
      if (parseInt(player1LongRangeRow.querySelector(`#player1_played_card-${card.id} .game__card-power`).innerText) > highestPower && card.function != 'hero') {
        highestPower = parseInt(player1LongRangeRow.querySelector(`#player1_played_card-${card.id} .game__card-power`).innerText);
      }
    });

    for (let i = player2CloseRangeCards.length - 1; i >= 0; i--) {
      if (parseInt(player2CloseRangeRow.querySelector(`#player2_played_card-${player2CloseRangeCards[i].id} .game__card-power`).innerText) == highestPower && player2CloseRangeCards[i].function != 'hero') {
        player2RejectedCards.push(player2CloseRangeCards[i]);
        player2CloseRangeRow.querySelector(`#player2_played_card-${player2CloseRangeCards[i].id}`).remove();
        player2CloseRangeCards.splice(i, 1);
      }
    }
    for (let i = player2LongRangeCards.length - 1; i >= 0; i--) {
      if (parseInt(player2LongRangeRow.querySelector(`#player2_played_card-${player2LongRangeCards[i].id} .game__card-power`).innerText) == highestPower && player2LongRangeCards[i].function != 'hero') {
        player2RejectedCards.push(player2LongRangeCards[i]);
        player2LongRangeRow.querySelector(`#player2_played_card-${player2LongRangeCards[i].id}`).remove();
        player2LongRangeCards.splice(i, 1);
      }
    }
    for (let i = player1CloseRangeCards.length - 1; i >= 0; i--) {
      if (parseInt(player1CloseRangeRow.querySelector(`#player1_played_card-${player1CloseRangeCards[i].id} .game__card-power`).innerText) == highestPower && player1CloseRangeCards[i].function != 'hero') {
        player1RejectedCards.push(player1CloseRangeCards[i]);
        player1CloseRangeRow.querySelector(`#player1_played_card-${player1CloseRangeCards[i].id}`).remove();
        player1CloseRangeCards.splice(i, 1);
      }
    }
    for (let i = player1LongRangeCards.length - 1; i >= 0; i--) {
      if (parseInt(player1LongRangeRow.querySelector(`#player1_played_card-${player1LongRangeCards[i].id} .game__card-power`).innerText) == highestPower && player1LongRangeCards[i].function != 'hero') {
        player1RejectedCards.push(player1LongRangeCards[i]);
        player1LongRangeRow.querySelector(`#player1_played_card-${player1LongRangeCards[i].id}`).remove();
        player1LongRangeCards.splice(i, 1);
      }
    }
  };

  const musterFunction = (player, cardObj) => {
    let availableCards = [];
    if (player == 1) {
      for (let i = 0; i < cardObj.summons.length; i++) {
        const deckCard = player1DeckCards.find(({ id }) => id == cardObj.summons[i]);
        if (deckCard != undefined) {
          const deckCardIndex = player1DeckCards.findIndex(({ id }) => id == cardObj.summons[i]);
          availableCards.push(deckCard);
          player1DeckCards.splice(deckCardIndex, 1);
        }
        else {
          const leftCard = player1LeftCards.find(({ id }) => id == cardObj.summons[i]);
          if (leftCard != undefined) {
            const leftCardIndex = player1LeftCards.findIndex(({ id }) => id == cardObj.summons[i]);
            availableCards.push(leftCard);
            player1LeftCards.splice(leftCardIndex, 1);
          }
        }
      }
      refreshPlayer1Cards();
    }
    else if (player == 2) {
      for (let i = 0; i < cardObj.summons.length; i++) {
        const deckCard = player2DeckCards.find(({ id }) => id == cardObj.summons[i]);
        if (deckCard != undefined) {
          const deckCardIndex = player2DeckCards.findIndex(({ id }) => id == cardObj.summons[i]);
          availableCards.push(deckCard);
          player2DeckCards.splice(deckCardIndex, 1);
        }
        else {
          const leftCard = player2LeftCards.find(({ id }) => id == cardObj.summons[i]);
          if (leftCard != undefined) {
            const leftCardIndex = player2LeftCards.findIndex(({ id }) => id == cardObj.summons[i]);
            availableCards.push(leftCard);
            player2LeftCards.splice(leftCardIndex, 1);
          }
        }
      }
      refreshPlayer2Cards();
    }

    for (let i = 0; i < availableCards.length; i++) {
      let selectedRow;
      
      if (player == 1) {
        if (availableCards[i].range == 1) {
          selectedRow = player1CloseRangeRow;
          player1CloseRangeCards.push(availableCards[i]);
        }
        else {
          selectedRow = player1LongRangeRow;
          player1LongRangeCards.push(availableCards[i]);
        }
      }
      else if (player == 2) {
        if (availableCards[i].range == 1) {
          selectedRow = player2CloseRangeRow;
          player2CloseRangeCards.push(availableCards[i]);
        }
        else {
          selectedRow = player2LongRangeRow;
          player2LongRangeCards.push(availableCards[i]);
        }
      }

      selectedRow.innerHTML += `
        <div id="player${player}_played_card-${availableCards[i].id}" class="game__played-card-container" style="position: absolute; height: ${Math.round(selectedRow.getBoundingClientRect().height * 100) / 100}px; left: calc(50% - ${(Math.round(selectedRow.getBoundingClientRect().height * 100) / 100) / 3}px${player == 1 ? '+ 1rem' : ''})">
          <div class="game__played-card-inner ${selectedRow.id == 'game_player' + player + '_close_range_row' ? 'close-card-pick-animation' : 'long-card-pick-animation'}">
            <div class="game__played-card-front pixel-corners3" style="background-image: url('../img/cards/${availableCards[i].pictureFilename}')">
              <div class="game__card-function" style="background-image: url('../img/function/${availableCards[i].function}.png')">
                <span class="game__card-power" style="color: ${availableCards[i].function == 'hero' ? '#ffffff' : '#2b2b2b'}">${availableCards[i].function == 'std' || availableCards[i].function == 'hero' ? availableCards[i].power : ""}</span>
              </div>
              ${availableCards[i].range != 0 ? `<div class="game__card-range" style="background-image: url('../img/range/`+ availableCards[i].range + `.png')"><span class="game__card-range-value" hidden>` + availableCards[i].range + `</span></div>` : ""}
              ${availableCards[i].ability != "none" ? `<div class="game__card-ability" style="background-image: url('../img/ability/`+ availableCards[i].ability + `.png')"></div>` : ""}
            </div>
            <div class="game__played-card-back pixel-corners3"></div>
          </div>
        </div>
      `;

      selectedRow.style.zIndex = 2;

      setTimeout(() => {
        document.querySelector(`#player${player}_played_card-${availableCards[i].id} .game__played-card-inner`).classList.remove(selectedRow.id == `game_player${player}_close_range_row` ? 'close-card-pick-animation' : 'long-card-pick-animation');
        document.querySelector(`#player${player}_played_card-${availableCards[i].id}`).style.position = 'static';
        if (document.querySelectorAll(`#${selectedRow.id} .game__played-card-container`).length > 1) {
          document.querySelector(`#${selectedRow.id} .game__played-card-container:nth-last-child(2)`).style.marginRight = 0;
          document.querySelector(`#${selectedRow.id} .game__played-card-container:nth-last-child(${document.querySelectorAll(`#${selectedRow.id} .game__played-card-container`).length})`).style.marginRight = 0;
        }
        selectedRow.style.removeProperty('z-index');
        if (selectedRow.id == 'game_player2_close_range_row' || selectedRow.id == 'game_player2_long_range_row') {
          if (document.querySelectorAll(`#${selectedRow.id} .game__played-card-container`).length > 3) {
            selectedRow.style.overflowX = 'auto';
          }
        }
        
        calculateScore();
      }, 1700);
    }
  };

  const clearSkyFunction = () => {
    for (let i = player2CloseRangeCards.length - 1; i >= 0; i--) {
      if (player2CloseRangeCards[i].function == 'frost') {
        player2CloseRangeRow.querySelector(`#player2_played_card-${player2CloseRangeCards[i].id}`).remove();
        player2CloseRangeCards.splice(i, 1);
      }
    }
    for (let i = player2LongRangeCards.length - 1; i >= 0; i--) {
      if (player2LongRangeCards[i].function == 'fog') {
        player2LongRangeRow.querySelector(`#player2_played_card-${player2LongRangeCards[i].id}`).remove();
        player2LongRangeCards.splice(i, 1);
      }
    }
    for (let i = player1CloseRangeCards.length - 1; i >= 0; i--) {
      if (player1CloseRangeCards[i].function == 'frost') {
        player1CloseRangeRow.querySelector(`#player1_played_card-${player1CloseRangeCards[i].id}`).remove();
        player1CloseRangeCards.splice(i, 1);
      }
    }
    for (let i = player1LongRangeCards.length - 1; i >= 0; i--) {
      if (player1LongRangeCards[i].function == 'fog') {
        player1LongRangeRow.querySelector(`#player1_played_card-${player1LongRangeCards[i].id}`).remove();
        player1LongRangeCards.splice(i, 1);
      }
    }
  };

  const decoyFunction = (player) => {
    let decoyCardObj;
    if (player == 1) {
      if (parseInt(player1DecoySelectedCard.querySelector('.game__card-range-value').innerText) == 1) {
        decoyCardObj = player1CloseRangeCards.find(({ id }) => id == player1DecoySelectedCard.id.replace('player1_played_card-', ''));
        document.querySelector(`#player1_played_card-${decoyCardObj.id}`).remove();
        player1CloseRangeCards.splice(player1CloseRangeCards.findIndex(card => card.id === decoyCardObj.id), 1);
      }
      else {
        decoyCardObj = player1LongRangeCards.find(({ id }) => id == player1DecoySelectedCard.id.replace('player1_played_card-', ''));
        document.querySelector(`#player1_played_card-${decoyCardObj.id}`).remove();
        player1LongRangeCards.splice(player1LongRangeCards.findIndex(card => card.id === decoyCardObj.id), 1);
      }

      player1DeckCards.push(decoyCardObj);
      refreshPlayer1Cards();
    }
    else if (player == 2) {
      if (parseInt(player2DecoySelectedCard.querySelector('.game__card-range-value').innerText) == 1) {
        decoyCardObj = player2CloseRangeCards.find(({ id }) => id == player2DecoySelectedCard.id.replace('player2_played_card-', ''));
        document.querySelector(`#player2_played_card-${decoyCardObj.id}`).remove();
        player2CloseRangeCards.splice(player2CloseRangeCards.findIndex(card => card.id === decoyCardObj.id), 1);
      }
      else {
        decoyCardObj = player2LongRangeCards.find(({ id }) => id == player2DecoySelectedCard.id.replace('player2_played_card-', ''));
        document.querySelector(`#player2_played_card-${decoyCardObj.id}`).remove();
        player2LongRangeCards.splice(player2LongRangeCards.findIndex(card => card.id === decoyCardObj.id), 1);
      }

      player2DeckCards.push(decoyCardObj);
      refreshPlayer2Cards();
    }
  };

  player1EndRoundButton.addEventListener('click', e => {
    if (!player1BlockInput) {
      player1BlockInput = true;
      player2BlockInput = true;
      player1DecoyActive = false;
      player1DecoyActive = false;

      if (activePlayer == 1) {
        if (player1SelectedCard != '') {
          const selectedCardObj = player1DeckCards.find(({ id }) => id == player1SelectedCard.replace('player1_card-', ''));
          let selectedRow, medicCardSelectedRow, medicCardIndex;
          let medicCardObj = {};

          if (selectedCardObj.ability == 'spy') {
            if (selectedCardObj.range == 1) {
              selectedRow = player2CloseRangeRow;
              player2CloseRangeCards.push(selectedCardObj);
            }
            else {
              selectedRow = player2LongRangeRow;
              player2LongRangeCards.push(selectedCardObj);
            }

            let spyCardsIndex = selectRandomCards([...Array(player1LeftCards.length).keys()], 2);
            for (let i = 0; i < spyCardsIndex.length; i++) {
              player1DeckCards.push(player1LeftCards[spyCardsIndex[i]]);
            }
            player1LeftCards = removeElements(player1LeftCards, spyCardsIndex);
          }
          else {
            if (selectedCardObj.ability == 'medic' && player1RejectedCards.length >= 1) {
              medicCardIndex = selectRandomCards([...Array(player1RejectedCards.length).keys()], 1)[0];
              medicCardObj = player1RejectedCards[medicCardIndex];
  
              if (medicCardObj.range == 1) {
                medicCardSelectedRow = player1CloseRangeRow;
                player1CloseRangeCards.push(medicCardObj);
              }
              else {
                medicCardSelectedRow = player1LongRangeRow;
                player1LongRangeCards.push(medicCardObj);
              }
  
              medicCardSelectedRow.innerHTML += `
                <div id="player1_played_card-${medicCardObj.id}" class="game__played-card-container" style="position: absolute; height: ${Math.round(medicCardSelectedRow.getBoundingClientRect().height * 100) / 100}px; left: calc(50% - ${(Math.round(medicCardSelectedRow.getBoundingClientRect().height * 100) / 100) / 3}px + 1rem)">
                  <div class="game__played-card-inner ${medicCardSelectedRow.id == 'game_player1_close_range_row' ? 'close-card-pick-animation' : 'long-card-pick-animation'}">
                    <div class="game__played-card-front pixel-corners3" style="background-image: url('../img/cards/${medicCardObj.pictureFilename}')">
                      <div class="game__card-function" style="background-image: url('../img/function/${medicCardObj.function}.png')">
                        <span class="game__card-power" style="color: ${medicCardObj.function == 'hero' ? '#ffffff' : '#2b2b2b'}">${medicCardObj.function == 'std' || medicCardObj.function == 'hero' ? medicCardObj.power : ""}</span>
                      </div>
                      ${medicCardObj.range != 0 ? `<div class="game__card-range" style="background-image: url('../img/range/`+ medicCardObj.range + `.png')"><span class="game__card-range-value" hidden>` + medicCardObj.range + `</span></div>` : ""}
                      ${medicCardObj.ability != "none" ? `<div class="game__card-ability" style="background-image: url('../img/ability/`+ medicCardObj.ability + `.png')"></div>` : ""}
                    </div>
                    <div class="game__played-card-back pixel-corners3"></div>
                  </div>
                </div>
              `;
            }

            if (selectedCardObj.range == 1) {
              selectedRow = player1CloseRangeRow;
              player1CloseRangeCards.push(selectedCardObj);
            }
            else if (selectedCardObj.range == 2) {
              selectedRow = player1LongRangeRow;
              player1LongRangeCards.push(selectedCardObj);
            }
            else if (selectedCardObj.range == 0) {
              if (selectedCardObj.function == 'horn') {
                if (document.getElementById(player1SelectedCard).querySelector('.selected-button').value == 1) {
                  selectedRow = player1CloseRangeRow;
                  player1CloseRangeCards.push(selectedCardObj);
                }
                else {
                  selectedRow = player1LongRangeRow;
                  player1LongRangeCards.push(selectedCardObj);
                }
              }
              else if (selectedCardObj.function == 'decoy') {
                if (player1DecoySelectedCard == null || parseInt(player1DecoySelectedCard.querySelector('.game__card-range-value').innerText) == 1) {
                  selectedRow = player1CloseRangeRow;
                  player1CloseRangeCards.push(selectedCardObj);
                }
                else {
                  selectedRow = player1LongRangeRow;
                  player1LongRangeCards.push(selectedCardObj);
                }
              }
              else {
                selectedRow = player1CloseRangeRow;
                player1CloseRangeCards.push(selectedCardObj);
              }
            }
          }
    
          selectedRow.innerHTML += `
              <div id="player${selectedCardObj.ability == 'spy' ? 2 : 1}_played_card-${selectedCardObj.id}" class="game__played-card-container" style="position: absolute; height: ${Math.round(selectedRow.getBoundingClientRect().height * 100) / 100}px; left: calc(50% - ${(Math.round(selectedRow.getBoundingClientRect().height * 100) / 100) / 3}px + 1rem)">
                <div class="game__played-card-inner ${selectedRow.id == 'game_player1_close_range_row' ? 'close-card-pick-animation' : 'long-card-pick-animation'}">
                  <div class="game__played-card-front pixel-corners3" style="background-image: url('../img/cards/${selectedCardObj.pictureFilename}')">
                    <div class="game__card-function" style="background-image: url('../img/function/${selectedCardObj.function}.png')">
                      <span class="game__card-power" style="color: ${selectedCardObj.function == 'hero' ? '#ffffff' : '#2b2b2b'}">${selectedCardObj.function == 'std' || selectedCardObj.function == 'hero' ? selectedCardObj.power : ""}</span>
                    </div>
                    ${selectedCardObj.range != 0 ? `<div class="game__card-range" style="background-image: url('../img/range/`+ selectedCardObj.range + `.png')"><span class="game__card-range-value" hidden>` + selectedCardObj.range + `</span></div>` : ""}
                    ${selectedCardObj.ability != "none" ? `<div class="game__card-ability" style="background-image: url('../img/ability/`+ selectedCardObj.ability + `.png')"></div>` : ""}
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
              document.querySelector(`#player${selectedCardObj.ability == 'spy' ? 2 : 1}_played_card-${selectedCardObj.id} .game__played-card-inner`).classList.remove(selectedRow.id == 'game_player1_close_range_row' ? 'close-card-pick-animation' : 'long-card-pick-animation');
              document.querySelector(`#player${selectedCardObj.ability == 'spy' ? 2 : 1}_played_card-${selectedCardObj.id}`).style.position = 'static';
              if (document.querySelectorAll(`#${selectedRow.id} .game__played-card-container`).length > 1) {
                document.querySelector(`#${selectedRow.id} .game__played-card-container:nth-last-child(2)`).style.marginRight = 0;
              }
              selectedRow.style.removeProperty('z-index');

              if (selectedCardObj.ability == 'scorch') {
                scorchFunction(1, selectedCardObj.range);
              }
              else if (selectedCardObj.ability == 'muster') {
                musterFunction(1, selectedCardObj);
              }
              else if (selectedCardObj.ability == 'medic' && player1RejectedCards.length >= 1) {
                document.querySelector(`#player1_played_card-${medicCardObj.id} .game__played-card-inner`).classList.remove(medicCardSelectedRow.id == 'game_player1_close_range_row' ? 'close-card-pick-animation' : 'long-card-pick-animation');
                document.querySelector(`#player1_played_card-${medicCardObj.id}`).style.position = 'static';
                if (document.querySelectorAll(`#${medicCardSelectedRow.id} .game__played-card-container`).length > 1) {
                  document.querySelector(`#${medicCardSelectedRow.id} .game__played-card-container:nth-last-child(2)`).style.marginRight = 0;
                }
                player1RejectedCards.splice(medicCardIndex, 1);
              }
              else if (selectedCardObj.function == 'scorch') {
                document.querySelector(`#player1_played_card-${selectedCardObj.id}`).remove();
                player1CloseRangeCards.splice(player1CloseRangeCards.findIndex(card => card.id === selectedCardObj.id), 1);
                globalScorchFunction();
              }
              else if (selectedCardObj.function == 'clear') {
                document.querySelector(`#player1_played_card-${selectedCardObj.id}`).remove();
                player1CloseRangeCards.splice(player1CloseRangeCards.findIndex(card => card.id === selectedCardObj.id), 1);
                clearSkyFunction();
              }
              else if (selectedCardObj.function == 'decoy') {
                decoyFunction(1);
              }

              calculateScore();
              changePlayer();
            }, 1700);
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
          const selectedCardObj = player2DeckCards.find(({ id }) => id == player2SelectedCard.replace('player2_card-', ''));
          let selectedRow, medicCardSelectedRow, medicCardIndex;
          let medicCardObj = {};

          if (selectedCardObj.ability == 'spy') {
            if (selectedCardObj.range == 1) {
              selectedRow = player1CloseRangeRow;
              player1CloseRangeCards.push(selectedCardObj);
            }
            else {
              selectedRow = player1LongRangeRow;
              player1LongRangeCards.push(selectedCardObj);
            }

            let spyCardsIndex = selectRandomCards([...Array(player2LeftCards.length).keys()], 2);
            for (let i = 0; i < spyCardsIndex.length; i++) {
              player2DeckCards.push(player2LeftCards[spyCardsIndex[i]]);
            }
            player2LeftCards = removeElements(player2LeftCards, spyCardsIndex);
          }
          else {
            if (selectedCardObj.ability == 'medic' && player2RejectedCards.length >= 1) {
              medicCardIndex = selectRandomCards([...Array(player2RejectedCards.length).keys()], 1)[0];
              medicCardObj = player2RejectedCards[medicCardIndex];
  
              if (medicCardObj.range == 1) {
                medicCardSelectedRow = player2CloseRangeRow;
                player2CloseRangeCards.push(medicCardObj);
              }
              else {
                medicCardSelectedRow = player2LongRangeRow;
                player2LongRangeCards.push(medicCardObj);
              }
  
              medicCardSelectedRow.innerHTML += `
                <div id="player2_played_card-${medicCardObj.id}" class="game__played-card-container" style="position: absolute; height: ${Math.round(medicCardSelectedRow.getBoundingClientRect().height * 100) / 100}px; left: calc(50% - ${(Math.round(medicCardSelectedRow.getBoundingClientRect().height * 100) / 100) / 3}px)">
                  <div class="game__played-card-inner ${medicCardSelectedRow.id == 'game_player2_close_range_row' ? 'close-card-pick-animation' : 'long-card-pick-animation'}">
                    <div class="game__played-card-front pixel-corners3" style="background-image: url('../img/cards/${medicCardObj.pictureFilename}')">
                      <div class="game__card-function" style="background-image: url('../img/function/${medicCardObj.function}.png')">
                        <span class="game__card-power" style="color: ${medicCardObj.function == 'hero' ? '#ffffff' : '#2b2b2b'}">${medicCardObj.function == 'std' || medicCardObj.function == 'hero' ? medicCardObj.power : ""}</span>
                      </div>
                      ${medicCardObj.range != 0 ? `<div class="game__card-range" style="background-image: url('../img/range/`+ medicCardObj.range + `.png')"><span class="game__card-range-value" hidden>` + medicCardObj.range + `</span></div>` : ""}
                      ${medicCardObj.ability != "none" ? `<div class="game__card-ability" style="background-image: url('../img/ability/`+ medicCardObj.ability + `.png')"></div>` : ""}
                    </div>
                    <div class="game__played-card-back pixel-corners3"></div>
                  </div>
                </div>
              `;
            }

            if (selectedCardObj.range == 1) {
              selectedRow = player2CloseRangeRow;
              player2CloseRangeCards.push(selectedCardObj);
            }
            else if (selectedCardObj.range == 2) {
              selectedRow = player2LongRangeRow;
              player2LongRangeCards.push(selectedCardObj);
            }
            else if (selectedCardObj.range == 0) {
              if (selectedCardObj.function == 'horn') {
                if (document.getElementById(player2SelectedCard).querySelector('.selected-button').value == 1) {
                  selectedRow = player2CloseRangeRow;
                  player2CloseRangeCards.push(selectedCardObj);
                }
                else {
                  selectedRow = player2LongRangeRow;
                  player2LongRangeCards.push(selectedCardObj);
                }
              }
              else if (selectedCardObj.function == 'decoy') {
                if (player2DecoySelectedCard == null || parseInt(player2DecoySelectedCard.querySelector('.game__card-range-value').innerText) == 1) {
                  selectedRow = player2CloseRangeRow;
                  player2CloseRangeCards.push(selectedCardObj);
                }
                else {
                  selectedRow = player2LongRangeRow;
                  player2LongRangeCards.push(selectedCardObj);
                }
              }
              else {
                selectedRow = player2CloseRangeRow;
                player2CloseRangeCards.push(selectedCardObj);
              }
            }
          }
    
          selectedRow.innerHTML += `
              <div id="player${selectedCardObj.ability == 'spy' ? 1 : 2}_played_card-${selectedCardObj.id}" class="game__played-card-container" style="position: absolute; height: ${Math.round(selectedRow.getBoundingClientRect().height * 100) / 100}px; left: calc(50% - ${(Math.round(selectedRow.getBoundingClientRect().height * 100) / 100) / 3}px)">
                <div class="game__played-card-inner ${selectedRow.id == 'game_player2_close_range_row' ? 'close-card-pick-animation' : 'long-card-pick-animation'}">
                  <div class="game__played-card-front pixel-corners3" style="background-image: url('../img/cards/${selectedCardObj.pictureFilename}')">
                    <div class="game__card-function" style="background-image: url('../img/function/${selectedCardObj.function}.png')">
                      <span class="game__card-power" style="color: ${selectedCardObj.function == 'hero' ? '#ffffff' : '#2b2b2b'}">${selectedCardObj.function == 'std' || selectedCardObj.function == 'hero' ? selectedCardObj.power : ""}</span>
                    </div>
                    ${selectedCardObj.range != 0 ? `<div class="game__card-range" style="background-image: url('../img/range/`+ selectedCardObj.range + `.png')"><span class="game__card-range-value" hidden>` + selectedCardObj.range + `</span></div>` : ""}
                    ${selectedCardObj.ability != "none" ? `<div class="game__card-ability" style="background-image: url('../img/ability/`+ selectedCardObj.ability + `.png')"></div>` : ""}
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
              document.querySelector(`#player${selectedCardObj.ability == 'spy' ? 1 : 2}_played_card-${selectedCardObj.id} .game__played-card-inner`).classList.remove(selectedRow.id == 'game_player2_close_range_row' ? 'close-card-pick-animation' : 'long-card-pick-animation');
              document.querySelector(`#player${selectedCardObj.ability == 'spy' ? 1 : 2}_played_card-${selectedCardObj.id}`).style.position = 'static';
              if (document.querySelectorAll(`#${selectedRow.id} .game__played-card-container`).length > 1) {
                document.querySelector(`#${selectedRow.id} .game__played-card-container:nth-last-child(2)`).style.marginRight = 0;
              }
              selectedRow.style.removeProperty('z-index');
              if (document.querySelectorAll(`#${selectedRow.id} .game__played-card-container`).length > 3) {
                selectedRow.style.overflowX = 'auto';
              }

              if (selectedCardObj.ability == 'scorch') {
                scorchFunction(2, selectedCardObj.range);
              }
              else if (selectedCardObj.ability == 'muster') {
                musterFunction(2, selectedCardObj);
              }
              else if (selectedCardObj.ability == 'medic' && player2RejectedCards.length >= 1) {
                document.querySelector(`#player2_played_card-${medicCardObj.id} .game__played-card-inner`).classList.remove(medicCardSelectedRow.id == 'game_player2_close_range_row' ? 'close-card-pick-animation' : 'long-card-pick-animation');
                document.querySelector(`#player2_played_card-${medicCardObj.id}`).style.position = 'static';
                if (document.querySelectorAll(`#${medicCardSelectedRow.id} .game__played-card-container`).length > 1) {
                  document.querySelector(`#${medicCardSelectedRow.id} .game__played-card-container:nth-last-child(2)`).style.marginRight = 0;
                }
                if (document.querySelectorAll(`#${medicCardSelectedRow.id} .game__played-card-container`).length > 3) {
                  medicCardSelectedRow.style.overflowX = 'auto';
                }
                player2RejectedCards.splice(medicCardIndex, 1);
              }
              else if (selectedCardObj.function == 'scorch') {
                document.querySelector(`#player2_played_card-${selectedCardObj.id}`).remove();
                player2CloseRangeCards.splice(player2CloseRangeCards.findIndex(card => card.id === selectedCardObj.id), 1);
                globalScorchFunction();
              }
              else if (selectedCardObj.function == 'clear') {
                document.querySelector(`#player2_played_card-${selectedCardObj.id}`).remove();
                player2CloseRangeCards.splice(player2CloseRangeCards.findIndex(card => card.id === selectedCardObj.id), 1);
                clearSkyFunction();
              }
              else if (selectedCardObj.function == 'decoy') {
                decoyFunction(2);
              }

              calculateScore();
              changePlayer();
            }, 1700);
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
        <div id="player1_card-${player1DeckCards[i].id}" class="game__card-container pixel-corners3 ${player1SelectedCard == 'player1_card-' + player1DeckCards[i].id ? 'selected-card' : ''}" style="background-image: url('../img/cards/${player1DeckCards[i].pictureFilename}')">
          <div class="game__card-function" style="background-image: url('../img/function/${player1DeckCards[i].function}.png')">
            <span class="game__card-power" style="color: ${player1DeckCards[i].function == 'hero' ? '#ffffff' : '#2b2b2b'}">${player1DeckCards[i].function == 'std' || player1DeckCards[i].function == 'hero' ? player1DeckCards[i].power : ""}</span>
          </div>
          ${player1DeckCards[i].range != 0 ? `<div class="game__card-range" style="background-image: url('../img/range/`+ player1DeckCards[i].range + `.png')"><span class="game__card-range-value" hidden>` + player1DeckCards[i].range + `</span></div>` : ""}
          ${player1DeckCards[i].ability != "none" ? `<div class="game__card-ability" style="background-image: url('../img/ability/`+ player1DeckCards[i].ability + `.png')"></div>` : ""}
          ${player1DeckCards[i].function == 'horn' ? "<div class='game__card-button-horn-container'><button class='selected-button' value='1'>Bliski</button><button value='2'>Daleki</button></div>" : ""}
          ${player1DeckCards[i].function == 'decoy' ? "<div class='game__card-button-decoy-container'><button class='decoy-button'>Wybierz kartę</button></div>" : ""}
        </div>
      `;
    }
  }

  const refreshPlayer2Cards = () => {
    player2DrawerCards.innerHTML = '';

    for (let i = 0; i < player2DeckCards.length; i++) {
      player2DrawerCards.innerHTML += `
        <div id="player2_card-${player2DeckCards[i].id}" class="game__card-container pixel-corners3 ${player2SelectedCard == 'player2_card-' + player2DeckCards[i].id ? 'selected-card' : ''}" style="background-image: url('../img/cards/${player2DeckCards[i].pictureFilename}')">
          <div class="game__card-function" style="background-image: url('../img/function/${player2DeckCards[i].function}.png')">
            <span class="game__card-power" style="color: ${player2DeckCards[i].function == 'hero' ? '#ffffff' : '#2b2b2b'}">${player2DeckCards[i].function == 'std' || player2DeckCards[i].function == 'hero' ? player2DeckCards[i].power : ""}</span>
          </div>
          ${player2DeckCards[i].range != 0 ? `<div class="game__card-range" style="background-image: url('../img/range/`+ player2DeckCards[i].range + `.png')"><span class="game__card-range-value" hidden>` + player2DeckCards[i].range + `</span></div>` : ""}
          ${player2DeckCards[i].ability != "none" ? `<div class="game__card-ability" style="background-image: url('../img/ability/`+ player2DeckCards[i].ability + `.png')"></div>` : ""}
          ${player2DeckCards[i].function == 'horn' ? "<div class='game__card-button-horn-container'><button class='selected-button' value='1'>Bliski</button><button value='2'>Daleki</button></div>" : ""}
          ${player2DeckCards[i].function == 'decoy' ? "<div class='game__card-button-decoy-container'><button class='decoy-button'>Wybierz kartę</button></div>" : ""}
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
    let cardID;
    if (e.target.closest('.game__card-container') != null) {
      cardID = e.target.closest('.game__card-container').id;

      if (player1SelectedCard == cardID) {
        if (e.target.nodeName == 'BUTTON') {
          if (Array.from(e.target.classList)[0] == 'decoy-button') {
            player1DecoyActive = true;
          }
          else if (Array.from(e.target.classList)[0] != 'selected-button') {
            e.target.closest('.game__card-button-horn-container').querySelector('.selected-button').classList.remove('selected-button');
            e.target.classList.add('selected-button');
          }
        }
      }
      else {
        player1SelectedCard = cardID;
        refreshPlayer1Cards();
      }
    }
  });

  player2DrawerCards.addEventListener('click', e => {
    let cardID;
    if (e.target.closest('.game__card-container') != null) {
      cardID = e.target.closest('.game__card-container').id;

      if (player2SelectedCard == cardID) {
        if (e.target.nodeName == 'BUTTON') {
          if (Array.from(e.target.classList)[0] == 'decoy-button') {
            player2DecoyActive = true;
          }
          else if (Array.from(e.target.classList)[0] != 'selected-button') {
            e.target.closest('.game__card-button-horn-container').querySelector('.selected-button').classList.remove('selected-button');
            e.target.classList.add('selected-button');
          }
        }
      }
      else {
        player2SelectedCard = cardID;
        refreshPlayer2Cards();
      }
    }
  });

  player1Rows.addEventListener('click', e => {
    let card;
    if (e.target.closest('.game__played-card-container') != null) {
      card = e.target.closest('.game__played-card-container');

      if (player1DecoyActive) {
        player1DecoySelectedCard = card;
  
        if (e.target.closest('.game__player1--rows').querySelector('.selected-card') == null) {
          e.target.closest('.game__played-card-container').querySelector('.game__played-card-front').classList.add('selected-card');
        }
        else if (Array.from(e.target.closest('.game__played-card-container').querySelector('.game__played-card-front').classList)[2] != 'selected-card') {
          e.target.closest('.game__player1--rows').querySelector('.selected-card').classList.remove('selected-card');
          e.target.closest('.game__played-card-container').querySelector('.game__played-card-front').classList.add('selected-card');
        }
      }
    }
  });

  player2Rows.addEventListener('click', e => {
    let card;
    if (e.target.closest('.game__played-card-container') != null) {
      card = e.target.closest('.game__played-card-container');

      if (player2DecoyActive) {
        player2DecoySelectedCard = card;
  
        if (e.target.closest('.game__player2--rows').querySelector('.selected-card') == null) {
          e.target.closest('.game__played-card-container').querySelector('.game__played-card-front').classList.add('selected-card');
        }
        else if (Array.from(e.target.closest('.game__played-card-container').querySelector('.game__played-card-front').classList)[2] != 'selected-card') {
          e.target.closest('.game__player2--rows').querySelector('.selected-card').classList.remove('selected-card');
          e.target.closest('.game__played-card-container').querySelector('.game__played-card-front').classList.add('selected-card');
        }
      }
    }
  });
}

export { gameContent, gameFunctions };