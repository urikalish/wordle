import { config } from './config';
import { Phase } from './phase';
import { WordsHelper } from './words-helper';
import { UiHelper } from './ui-helper';

export class Game {
	private wordsHelper: WordsHelper = new WordsHelper();
	private uiHelper: UiHelper = new UiHelper();
	private word = '';
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
		const colors = this.wordsHelper.getColors(this.word, this.guess);
		this.uiHelper.updateColors(this.rowIndex, this.guess, colors);
		this.guess = '';
		this.rowIndex++;
		this.colIndex = 0;
		this.setPhase(Phase.USER_GUESS);
	}

	init() {
		this.setPhase(Phase.GAME_INIT);
		this.guess = '';
		this.rowIndex = 0;
		this.colIndex = 0;
		this.wordsHelper.init();
		this.word = this.wordsHelper.getRandomWord().toUpperCase();
		this.uiHelper.init(this.handleKeyboardButtonClick.bind(this), this.handleSubmitButtonClick.bind(this));
		this.uiHelper.markGamePhase(this.phase);
		console.log(this.word);
		alert(this.word);
	}

	start() {
		this.setPhase(Phase.USER_GUESS);
	}
}
