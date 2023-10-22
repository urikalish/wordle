import { words } from './words';

function setDocHeight() {
	document.documentElement.style.setProperty('--doc-height', `${window.innerHeight}px`);
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
	window.addEventListener('resize', setDocHeight);
	setDocHeight();
	createUI();
	const fiveLetterWords = words.filter(w => w.length === 5);
	//alert(fiveLetterWords.length);
	fiveLetterWords.forEach((w, ind) => {
		console.log(ind + ' ' + w);
	});
}

init();
