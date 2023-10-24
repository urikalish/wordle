import { config } from './config';

export class UiHelper {
	private onHandleAction;

	setWidthAndHeight() {
		const h = window.innerHeight;
		document.documentElement.style.setProperty('--main-height', `${h}px`);
		const w = Math.min(window.innerWidth, h / 2);
		document.documentElement.style.setProperty('--main-width', `${w}px`);
		document.documentElement.style.setProperty('--keyboard-button-width', `${w / 11}px`);
	}

	createUI(answer) {
		const mainGridElm = document.getElementById('grid');
		for (let r = 0; r < config.NUMBER_OF_GUESSES; r++) {
			for (let c = 0; c < config.WORD_LENGTH; c++) {
				const cellElm = document.createElement('div');
				cellElm.setAttribute('id', `cell-${r}${c}`);
				cellElm.setAttribute('data-row', r.toString());
				cellElm.setAttribute('data-col', c.toString());
				cellElm.classList.add('grid-item');
				cellElm.addEventListener('click', (event: MouseEvent) => {
					this.onHandleAction((event.target as HTMLElement).getAttribute('id'));
				});
				mainGridElm?.appendChild(cellElm);
			}
		}

		const answerElm = document.getElementById('answer');
		if (answerElm) {
			answerElm.textContent = answer;
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
				keyElm.setAttribute('data-action', keys[r][k]);
				keyElm.setAttribute('tabindex', '-1');
				keyElm.classList.add('keyboard-button');
				keyElm.textContent = keys[r][k];
				keyElm.addEventListener('click', (event: MouseEvent) => {
					this.onHandleAction((event.target as HTMLElement).getAttribute('data-action'));
				});
				rowElm.appendChild(keyElm);
			}
			keyboardElm?.appendChild(rowElm);
		}

		const submitButtonElm = document.getElementById('submit-button');
		submitButtonElm?.addEventListener('click', (event: MouseEvent) => {
			this.onHandleAction((event.target as HTMLElement).getAttribute('data-action'));
		});

		const reloadButtonElm = document.getElementById('reload-button');
		reloadButtonElm?.addEventListener('click', (event: MouseEvent) => {
			this.onHandleAction((event.target as HTMLElement).getAttribute('data-action'));
		});

		document.body.addEventListener('keydown', (event: KeyboardEvent) => {
			this.onHandleAction(event.key);
		});
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

	clearLine(row) {
		for (let c = 0; c < config.WORD_LENGTH; c++) {
			this.updateCellText(row, c, '');
		}
	}

	clearLineEnd(row, col) {
		for (let c = col; c < config.WORD_LENGTH; c++) {
			this.updateCellText(row, c, '');
		}
	}

	updateCellClass(row, col, className, enable) {
		const cellElm = document.getElementById(`cell-${row}${col}`);
		if (cellElm) {
			cellElm.classList.toggle(className, enable);
		}
	}

	disallowAllCellClicks() {
		for (let r = 0; r < config.NUMBER_OF_GUESSES; r++) {
			for (let c = 0; c < config.WORD_LENGTH; c++) {
				this.updateCellClass(r, c, 'allow-click', false);
			}
		}
	}

	allowCellClicks(row, col) {
		this.disallowAllCellClicks();
		for (let c = 0; c <= col; c++) {
			this.updateCellClass(row, c, 'allow-click', true);
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

	init(answer, onHandleAction) {
		window.addEventListener('resize', this.setWidthAndHeight);
		this.setWidthAndHeight();
		this.onHandleAction = onHandleAction;
		this.createUI(answer);
	}
}
