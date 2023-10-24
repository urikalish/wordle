import { allWords } from './all-words';
import { config } from './config';

export class WordsHelper {
	private allWords: string[] = [];
	private words: string[] = [];

	init() {
		this.allWords = allWords;
		this.words = allWords.filter(w => w.length === config.WORD_LENGTH);
		this.words.forEach((w, ind) => {
			if (ind < 1500) {
				console.log(`${ind + 1} ${w}`);
			}
		});
		this.words.length = config.USE_MOST_FREQUENT_WORDS;
	}

	getRandomWord(): string {
		return this.words[Math.trunc(Math.random() * this.words.length)];
	}

	doesWordExist(word: string): boolean {
		return this.allWords.indexOf(word.toLowerCase()) !== -1;
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
