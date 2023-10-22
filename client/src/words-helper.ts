import { allWords } from './all-words';
import { config } from './config';

export class WordsHelper {
	private words: string[] = [];

	init() {
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
		return this.words.indexOf(word.toLowerCase()) !== -1;
	}
}
