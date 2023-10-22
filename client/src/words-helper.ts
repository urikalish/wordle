import { allWords } from './all-words';

export class WordsHelper {
	private words: string[] = [];

	init() {
		this.words = allWords.filter(w => w.length === 5);
		this.words.forEach((w, ind) => {
			console.log(ind + ' ' + w);
		});
	}

	getRandomWord(): string {
		return this.words[Math.trunc(Math.random() * this.words.length)];
	}

	doesWordExist(word: string): boolean {
		return this.words.indexOf(word) !== -1;
	}
}
