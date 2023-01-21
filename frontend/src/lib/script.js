function parseAnswer(answer) {
	let parsedAnswer = [];
	try {
		let lines = answer.split('\n');
		lines.forEach((line) => {
			if (line.startsWith('Panel ')) {
				let panelDescription = line.split(': ')[1];
				parsedAnswer.push([generateImage(panelDescription)]);
			} else if (line.includes(': ')) {
				parsedAnswer[parsedAnswer.length - 1].push(generateDialogue(line));
			}
		});
		return parsedAnswer;
	} catch (err) {
		return false;
	}
}

function generateImage(prompt) {
	// stable diffusion
	// return filename
	let filename = '';
	return prompt;
}

function generateDialogue(text) {
	// Not sure if we need anything for the text
	return text;
}

function generateComix(prompt) {
	// Send request to GPT
	// Get response from GPT
	let answer = `Panel 1: Shrek and Mario are in the middle of an open field, both ready to fight.
  Shrek: It's time to end this! 
  
  Panel 2: Mario is leaping towards Shrek, while Shrek is getting ready to strike. 
  Mario: Here I come!
  
  Panel 3: Shrek is swinging his fist at Mario, who is doing a jump-dodge.
  Shrek: You won't get away that easily!`;
	let parsed = parseAnswer(answer);
	if (!parsed) {
		console.error('Error parsing answer');
		return false;
	}
	return parsed;
}

export { generateComix };
