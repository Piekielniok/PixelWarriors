const gameContent = `
  <div id="game">
    <span>Giwncior ultra fajna gierka</span>
  </div>
`;

const gameFunctions = (loadPage, startingPlayer, player1Faction, player2Faction, player1Cards, player2Cards) => {
  const gameContainer = document.getElementById('game');
  let player1SelectedCards = player1Cards.map(a => ({...a}));
  let player2SelectedCards = player2Cards.map(a => ({...a}));

  gameContainer.innerHTML += `<span>Zaczyna gracz - ${startingPlayer}</span>`;
  gameContainer.innerHTML += `<span>Frakcja gracz 1 - ${player1Faction}</span>`;
  gameContainer.innerHTML += `<span>Frakcja gracz 2 - ${player2Faction}</span>`;
  gameContainer.innerHTML += `<span>Talia gracz 1 - ${player1Cards}</span>`;
  gameContainer.innerHTML += `<span>Talia gracz 2 - ${player2Cards}</span>`;
};

export { gameContent, gameFunctions };