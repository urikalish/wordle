import { words } from './words';

function setWidthAndHeight() {
	document.documentElement.style.setProperty('--main-width', `${Math.min(window.innerWidth, 1440)}px`);
	document.documentElement.style.setProperty('--main-height', `${window.innerHeight}px`);
}

function createUI() {
	const mainGridElm = document.getElementById('main-grid');
	for (let r = 0; r < 6; r++) {
		for (let c = 0; c < 5; c++) {
			const elm = document.createElement('div');
			elm.setAttribute('id', `cell-${r}${c}`);
			elm.classList.add('main-grid-item');
			elm.textContent = 'X';
			mainGridElm?.appendChild(elm);
		}
	}
}

function init() {
	window.addEventListener('resize', setWidthAndHeight);
	setWidthAndHeight();
	createUI();
	const fiveLetterWords = words.filter(w => w.length === 5);
	//alert(fiveLetterWords.length);
	fiveLetterWords.forEach((w, ind) => {
		console.log(ind + ' ' + w);
	});
}

init();
