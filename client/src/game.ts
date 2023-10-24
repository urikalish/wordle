import { config } from './config';
import { Phase } from './phase';
import { WordsHelper } from './words-helper';
import { UiHelper } from './ui-helper';

export class Game {
	private wordsHelper: WordsHelper = new WordsHelper();
	private uiHelper: UiHelper = new UiHelper();
	private answer = '';
	private phase: Phase = Phase.GAME_INIT;
	private guess = '';
	private rowIndex = 0;
	private colIndex = 0;

	setPhase(phase: Phase) {
		this.phase = phase;
		this.uiHelper.markGamePhase(phase);
		this.uiHelper.disallowAllCellClicks();
		if ([Phase.USER_GUESS, Phase.WAIT_SUBMIT].includes(this.phase) && this.guess !== '') {
			this.uiHelper.allowCellClicks(this.rowIndex, this.guess.length - 1);
		}
	}

	handleLetter(letter) {
		if (this.guess.length < config.WORD_LENGTH) {
			this.uiHelper.updateCellText(this.rowIndex, this.colIndex, letter);
			this.guess += letter;
			this.colIndex++;
			if (this.colIndex < config.WORD_LENGTH) {
				this.setPhase(Phase.USER_GUESS);
			} else {
				this.setPhase(this.wordsHelper.doesWordExist(this.guess) ? Phase.WAIT_SUBMIT : Phase.USER_GUESS);
			}
		}
	}

	handleBackspace() {
		if (this.guess.length === 0) {
			return;
		}
		this.uiHelper.updateCellText(this.rowIndex, this.colIndex - 1, '');
		this.guess = this.guess.substring(0, this.guess.length - 1);
		this.colIndex--;
		this.setPhase(Phase.USER_GUESS);
	}

	handleDeleteLine() {
		if (this.guess.length === 0) {
			return;
		}
		this.uiHelper.clearLine(this.rowIndex);
		this.guess = '';
		this.colIndex = 0;
		this.setPhase(Phase.USER_GUESS);
	}

	handleClickCell(row, col) {
		if (row !== this.rowIndex || col > this.colIndex) {
			return;
		}
		this.uiHelper.clearLineEnd(row, col);
		this.guess = this.guess.substring(0, col);
		this.colIndex = col;
	}

	handleSubmit() {
		this.setPhase(Phase.MARK_GUESS);
		const colors = this.wordsHelper.getColors(this.answer, this.guess);
		this.uiHelper.updateColors(this.rowIndex, this.guess, colors);
		if (colors.every(c => c === 'green')) {
			this.setPhase(Phase.SUCCESS);
		} else if (this.rowIndex === config.NUMBER_OF_GUESSES - 1) {
			this.setPhase(Phase.FAILURE);
		} else {
			this.guess = '';
			this.rowIndex++;
			this.colIndex = 0;
			this.setPhase(Phase.USER_GUESS);
		}
	}

	handleReload() {
		window.location.reload();
	}

	handleAction(action: string) {
		const upperCaseAction = action.toUpperCase();
		if (upperCaseAction.length === 1 && upperCaseAction !== '<') {
			const charCode = upperCaseAction.charCodeAt(0);
			if (charCode >= 65 && charCode <= 90) {
				this.handleLetter(upperCaseAction);
			}
		} else if (['BACKSPACE', '<'].includes(upperCaseAction)) {
			this.handleBackspace();
		} else if (upperCaseAction === 'ESCAPE') {
			this.handleDeleteLine();
		} else if (upperCaseAction.startsWith('CELL-')) {
			this.handleClickCell(parseInt(upperCaseAction.charAt(5)), parseInt(upperCaseAction.charAt(6)));
		} else if (upperCaseAction === 'SUBMIT' || (upperCaseAction === 'ENTER' && this.phase === Phase.WAIT_SUBMIT)) {
			this.handleSubmit();
		} else if (upperCaseAction === 'RELOAD' || (upperCaseAction === 'ENTER' && [Phase.SUCCESS, Phase.FAILURE].includes(this.phase))) {
			this.handleReload();
		}
	}

	init() {
		this.setPhase(Phase.GAME_INIT);
		this.guess = '';
		this.rowIndex = 0;
		this.colIndex = 0;
		this.wordsHelper.init();
		this.answer = this.wordsHelper.getRandomWord().toUpperCase();
		this.uiHelper.init(this.answer, this.handleAction.bind(this));
		this.uiHelper.markGamePhase(this.phase);
		console.log(this.answer);
	}

	start() {
		this.setPhase(Phase.USER_GUESS);
	}
}
