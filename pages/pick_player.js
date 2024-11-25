const pickPlayerContent = `
  <div class="pick-player">
    <span>Grę rozpoczyna</span>
    <h3>GRACZ <b id="pick_player_selected"></b></h3>
  </div>
`;

const pickPlayerFunctions = (loadPage) => {
  const selected_player = Math.floor(Math.random() * 2) + 1;
  document.getElementById('pick_player_selected').innerHTML = selected_player;
  document.getElementById('pick_player_selected').style.color = selected_player == 1 ? '#e8aa0e' : '#348ceb';
  setTimeout(() => {
    loadPage('game', selected_player);
  }, 2000);
};

export { pickPlayerContent, pickPlayerFunctions };