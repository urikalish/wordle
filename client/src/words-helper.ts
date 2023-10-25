import { validWords } from './data/valid-words';
import { config } from './config';

export class WordsHelper {
	private validWords: string[] = [];
	private topWords: string[] = [];

	init() {
		this.validWords = validWords;
		this.topWords = [...validWords];
		this.topWords.length = config.USE_TOP_WORDS;
	}

	getRandomWord(): string {
		return this.topWords[Math.trunc(Math.random() * this.topWords.length)];
	}

	doesWordExist(word: string): boolean {
		return this.validWords.indexOf(word.toLowerCase()) !== -1;
	}

	getColors(answer, guess): string[] {
		const colors = new Array(guess.length).fill('');
		for (let i = 0; i < answer.length; i++) {
			if (guess[i] === answer[i]) {
				colors[i] = 'green';
			}
		}
		for (let i = 0; i < answer.length; i++) {
			if (colors[i] === 'green') {
				continue;
			}

			for (let j = 0; j < guess.length; j++) {
				if (guess[j] === answer[i] && !colors[j]) {
					colors[j] = 'yellow';
					break;
				}
			}
		}
		for (let i = 0; i < colors.length; i++) {
			if (!colors[i]) {
				colors[i] = 'gray';
			}
		}
		return colors;
	}
}
