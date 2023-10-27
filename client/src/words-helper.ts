import { words } from './words';
import { config } from './config';

export class WordsHelper {
	private validWords: string[] = [];
	private topWords: string[] = [];

	init() {
		this.validWords = words;
		this.topWords = [...this.validWords];
		this.topWords.length = config.USE_TOP_WORDS;
	}

	// async checkWord(word) {
	// 	const dictionaryApi = `https://api.dictionaryapi.dev/api/v2/entries/en/`;
	// 	try {
	// 		const res = await fetch(dictionaryApi + word);
	// 		const json = await res.json();
	// 		if (!json[0]) {
	// 			console.log('### missing - ' + word);
	// 		} else if (json[0].meanings.length === 1 && json[0].meanings[0].partOfSpeech === 'noun') {
	// 			console.log('### noun - ' + word);
	// 		}
	// 	} catch (err) {
	// 		console.log('### ' + err);
	// 	}
	// }

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
