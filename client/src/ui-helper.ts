import { config } from './config';

export class UiHelper {
	private onKeyboardButtonClick;
	private onSubmitButtonClick;
	private onReloadButtonClick;

	setWidthAndHeight() {
		const h = window.innerHeight;
		document.documentElement.style.setProperty('--main-height', `${h}px`);
		const w = Math.min(window.innerWidth, h / 2);
		document.documentElement.style.setProperty('--main-width', `${w}px`);
		document.documentElement.style.setProperty('--keyboard-button-width', `${w / 11}px`);
	}

	createUI() {
		const mainGridElm = document.getElementById('grid');
		for (let r = 0; r < config.NUMBER_OF_GUESSES; r++) {
			for (let c = 0; c < config.WORD_LENGTH; c++) {
				const cellElm = document.createElement('div');
				cellElm.setAttribute('id', `cell-${r}${c}`);
				cellElm.setAttribute('data-row', r.toString());
				cellElm.setAttribute('data-col', c.toString());
				cellElm.classList.add('grid-item');
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
				keyElm.setAttribute('data-key', keys[r][k]);
				keyElm.classList.add('keyboard-button');
				keyElm.textContent = keys[r][k];
				keyElm.addEventListener('click', this.onKeyboardButtonClick);
				rowElm.appendChild(keyElm);
			}
			keyboardElm?.appendChild(rowElm);
		}
		const submitButtonElm = document.getElementById('submit-button');
		submitButtonElm?.addEventListener('click', this.onSubmitButtonClick);

		const reloadButtonElm = document.getElementById('reload-button');
		reloadButtonElm?.addEventListener('click', this.onReloadButtonClick);
	}

	markGamePhase(phase) {
		document.body.setAttribute('data-phase', phase);
	}

	updateCellText(row, col, text) {
		const cellElm = document.getElementById(`cell-${row}${col}`);
		if (cellElm) {
			cellElm.textContent = text;
		}
	}

	updateColors(row, guess, colors) {
		for (let i = 0; i < colors.length; i++) {
			const cellElm = document.getElementById(`cell-${row}${i}`);
			if (cellElm && colors[i]) {
				cellElm.classList.add(colors[i]);
			}
			const keyElm = document.getElementById(`key-${guess[i]}`);
			if (!keyElm) {
				continue;
			}
			if (colors[i] === 'gray') {
				keyElm.classList.toggle('gray', true);
			} else if (colors[i] === 'yellow') {
				if (!keyElm.classList.contains('green')) {
					keyElm.classList.toggle('yellow', true);
				}
			} else if (colors[i] === 'green') {
				keyElm.classList.toggle('yellow', false);
				keyElm.classList.toggle('green', true);
			}
		}
	}

	init(onKeyboardButtonClick, onSubmitButtonClick, onReloadButtonClick) {
		window.addEventListener('resize', this.setWidthAndHeight);
		this.setWidthAndHeight();
		this.onKeyboardButtonClick = onKeyboardButtonClick;
		this.onSubmitButtonClick = onSubmitButtonClick;
		this.onReloadButtonClick = onReloadButtonClick;
		this.createUI();
	}
}
