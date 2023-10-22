import { words } from './words';

function setWidthAndHeight() {
	const h = window.innerHeight;
	document.documentElement.style.setProperty('--main-height', `${h}px`);
	const w = Math.min(window.innerWidth, h / 2);
	document.documentElement.style.setProperty('--main-width', `${w}px`);
	document.documentElement.style.setProperty('--keyboard-button-width', `${w / 11}px`);
}

function createUI() {
	const mainGridElm = document.getElementById('grid');
	for (let r = 0; r < 6; r++) {
		for (let c = 0; c < 5; c++) {
			const cellElm = document.createElement('div');
			cellElm.setAttribute('id', `cell-${r}${c}`);
			cellElm.classList.add('grid-item');
			cellElm.textContent = '';
			mainGridElm?.appendChild(cellElm);
		}
	}
	const keys = [
		['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
		['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
		['Z', 'X', 'C', 'V', 'B', 'N', 'M', '<'],
	];
	const keyboardElm = document.getElementById('keyboard');
	for (let r = 0; r < 3; r++) {
		const rowElm = document.createElement('div');
		rowElm.classList.add('keyboard-row');
		for (let k = 0; k < keys[r].length; k++) {
			const keyElm = document.createElement('button');
			keyElm.setAttribute('id', `key-${keys[r][k]}`);
			keyElm.classList.add('keyboard-button');
			keyElm.textContent = keys[r][k];
			rowElm.appendChild(keyElm);
		}
		keyboardElm?.appendChild(rowElm);
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
