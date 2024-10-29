import { homeContent, homeFunctions } from "../pages/home.js";
import { factionSelectContent, factionSelectFunctions } from "../pages/faction_select.js";
import { cardsSelectContent, cardsSelectFunctions } from "../pages/cards_select.js";
import { pickPlayerContent, pickPlayerFunctions } from "../pages/pick_player.js";
import { gameContent, gameFunctions } from "../pages/game.js";

const rootContainer = document.getElementById('root');
let cardsData = {};
let player1Faction = 0;
let player2Faction = 0;
let player1Cards = [];
let player2Cards = [];

const loadPage = (page = 'home', ...args) => {
	switch (page) {
		case 'home':
			rootContainer.innerHTML = homeContent;
			homeFunctions(loadPage);
			break;
		case 'factionSelect': 
			if (args[1]) {
				player1Cards = args[1];
			}
			rootContainer.innerHTML = factionSelectContent;
			factionSelectFunctions(loadPage, args[0]);
			break;
		case 'cardsSelect':
			if (args[0] == 1) {
				player1Faction = args[1];
			}
			else {
				player2Faction = args[1];
			}
			rootContainer.innerHTML = cardsSelectContent;
			cardsSelectFunctions(loadPage, args[0], args[1], cardsData);
			break;
		case 'pickPlayer':
			if (args[1]) {
				player2Cards = args[1];
			}
			rootContainer.innerHTML = pickPlayerContent;
			pickPlayerFunctions(loadPage, args[0]);
			break;
		case 'game':
			rootContainer.innerHTML = gameContent;
			gameFunctions(loadPage, args[0], player1Faction, player2Faction, player1Cards, player2Cards);
			break;
		default:
			rootContainer.innerHTML = '<h1>404 Page not Found</h1>'
			break;
	}
};

const fetchCardsData = () => {
	fetch("../data/cards.json")
		.then((res) => {
			if (!res.ok) {
				throw new Error
					(`HTTP error! Status: ${res.status}`);
			}
			return res.json();
		})
		.then((data) => {
			cardsData = data;
		})
		.catch((error) =>
			console.error("Unable to fetch data:", error));
}

fetchCardsData();

// document.querySelectorAll('nav a').forEach(link => {
// 	link.addEventListener('click', (event) => {
// 		event.preventDefault(); // Prevent default link behavior
// 		const page = link.getAttribute('data-page'); // Get the page from the data attribute
// 		loadPage(page); // Load the selected page
// 	});
// });

loadPage('home');

export { loadPage };