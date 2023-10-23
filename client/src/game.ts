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
	}

	handleKeyboardButtonClick(event) {
		const key = event.target.getAttribute('data-key');
		if (key === '<') {
			if (this.guess.length > 0) {
				this.uiHelper.updateCellText(this.rowIndex, this.colIndex - 1, '');
				this.guess = this.guess.substring(0, this.guess.length - 1);
				this.colIndex--;
			}
			this.setPhase(Phase.USER_GUESS);
		} else if (this.guess.length < config.WORD_LENGTH) {
			this.uiHelper.updateCellText(this.rowIndex, this.colIndex, key);
			this.guess += key;
			this.colIndex++;
			if (this.colIndex < config.WORD_LENGTH) {
				this.setPhase(Phase.USER_GUESS);
			} else {
				this.setPhase(this.wordsHelper.doesWordExist(this.guess) ? Phase.WAIT_SUBMIT : Phase.USER_GUESS);
			}
		}
	}

	handleSubmitButtonClick() {
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

	handleReloadButtonClick() {
		window.location.reload();
	}

	init() {
		this.setPhase(Phase.GAME_INIT);
		this.guess = '';
		this.rowIndex = 0;
		this.colIndex = 0;
		this.wordsHelper.init();
		this.answer = this.wordsHelper.getRandomWord().toUpperCase();
		this.uiHelper.init(this.answer, this.handleKeyboardButtonClick.bind(this), this.handleSubmitButtonClick.bind(this), this.handleReloadButtonClick.bind(this));
		this.uiHelper.markGamePhase(this.phase);
		console.log(this.answer);
	}

	start() {
		this.setPhase(Phase.USER_GUESS);
	}
}
