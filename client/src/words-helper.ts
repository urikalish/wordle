import { words } from './words';

export class WordsHelper {
	private words: string[] = [];

	init() {
		this.words = [...words];
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
		return this.words[Math.trunc(Math.random() * this.words.length)];
	}

	isValidWord(word: string): boolean {
		return this.words.indexOf(word.toLowerCase()) !== -1;
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
