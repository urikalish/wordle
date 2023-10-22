import { WordsHelper } from './words-helper';
import { UiHelper } from './ui-helper';

export class Game {
	private wordsHelper: WordsHelper = new WordsHelper();
	private word = '';
	// private guesses = [];

	init() {
		this.wordsHelper.init();
		this.word = this.wordsHelper.getRandomWord();
		UiHelper.init();
	}
}
