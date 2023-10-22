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

	handleKeyboardButtonClick(event) {
		const key = event.target.getAttribute('data-key');
		if (key === '<') {
			if (this.guess.length > 0) {
				this.uiHelper.updateCellText(this.rowIndex, this.colIndex - 1, '');
				this.guess = this.guess.substring(0, this.guess.length - 1);
				this.colIndex--;
			}
		} else if (this.guess.length < config.WORD_LENGTH) {
			this.uiHelper.updateCellText(this.rowIndex, this.colIndex, key);
			this.guess += key;
			this.colIndex++;
			//alert(this.guesses[this.guessIndex]);
		}
	}

	handleSubmitButtonClick() {
		alert('submit');
	}

	init() {
		this.phase = Phase.GAME_INIT;
		this.guess = '';
		this.rowIndex = 0;
		this.colIndex = 0;
		this.wordsHelper.init();
		this.word = this.wordsHelper.getRandomWord();
		this.uiHelper.init(this.handleKeyboardButtonClick.bind(this), this.handleSubmitButtonClick.bind(this));
	}

	start() {
		this.phase = Phase.USER_GUESS;
	}
}
