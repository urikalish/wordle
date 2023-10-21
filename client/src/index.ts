import { words } from './words';

const fiveLetterWords = words.filter(w => w.length === 5);
//alert(fiveLetterWords.length);

fiveLetterWords.forEach((w, ind) => {
	console.log(ind + ' ' + w);
});
