import { words } from './words';
import { UiHelper } from './ui-helper';

function init() {
	UiHelper.init();
	const fiveLetterWords = words.filter(w => w.length === 5);
	//alert(fiveLetterWords.length);
	fiveLetterWords.forEach((w, ind) => {
		console.log(ind + ' ' + w);
	});
}

init();
