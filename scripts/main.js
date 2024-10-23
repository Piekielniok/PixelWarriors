import { homeContent, homeFunctions } from "../pages/home.js";
import { factionSelectContent, factionSelectFunctions } from "../pages/faction_select.js";
import { cardsSelectContent, cardsSelectFunctions } from "../pages/cards_select.js";
import { pickPlayerContent, pickPlayerFunctions } from "../pages/pick_player.js";

const rootContainer = document.getElementById('root');

const loadPage = (page = 'home', ...args) => {
	switch (page) {
		case 'home':
			rootContainer.innerHTML = homeContent;
			homeFunctions(loadPage);
			break;
		case 'factionSelect': 
			rootContainer.innerHTML = factionSelectContent;
			factionSelectFunctions(loadPage, args[0]);
			break;
		case 'cardsSelect':
			rootContainer.innerHTML = cardsSelectContent;
			cardsSelectFunctions(loadPage, args[0]);
			break;
		case 'pickPlayer':
			rootContainer.innerHTML = pickPlayerContent;
			pickPlayerFunctions(loadPage, args[0]);
			break;
		default:
			rootContainer.innerHTML = '<h1>404 Page not Found</h1>'
			break;
	}
};

// document.querySelectorAll('nav a').forEach(link => {
// 	link.addEventListener('click', (event) => {
// 		event.preventDefault(); // Prevent default link behavior
// 		const page = link.getAttribute('data-page'); // Get the page from the data attribute
// 		loadPage(page); // Load the selected page
// 	});
// });

loadPage('home');

export { loadPage };