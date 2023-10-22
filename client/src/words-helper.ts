import { allWords } from './all-words';
import { config } from './config';

export class WordsHelper {
	private allWords: string[] = [];
	private words: string[] = [];

	init() {
		this.allWords = allWords;
		this.words = allWords.filter(w => w.length === config.WORD_LENGTH);
		this.words.length = config.USE_MOST_FREQUENT_WORDS;
		this.words.forEach((w, ind) => {
			console.log(`${ind + 1} ${w}`);
		});
	}

	getRandomWord(): string {
		return this.words[Math.trunc(Math.random() * this.words.length)];
	}

	doesWordExist(word: string): boolean {
		return this.allWords.indexOf(word.toLowerCase()) !== -1;
	}

	getColors(word, guess): string[] {
		const colors = new Array(guess.length).fill('');
		for (let g = 0; g < guess.length; g++) {
			if (!word.includes(guess[g])) {
				colors[g] = 'gray';
			}
		}
		for (let w = 0; w < word.length; w++) {
			for (let g = 0; g < guess.length; g++) {
				if (guess[g] === word[w] && !colors[g]) {
					colors[g] = 'yellow';
					break;
				}
			}
		}
		for (let i = 0; i < word.length; i++) {
			if (guess[i] === word[i]) {
				colors[i] = 'green';
			}
		}
		return colors;
	}
}
