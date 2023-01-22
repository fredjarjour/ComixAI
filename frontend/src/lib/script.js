async function parseCreateAnswer(answer, request) {
	let title = '';
	let descriptions = [];
	let panels = [];
	let panel_number = 1;
	try {
		let lines = answer.split('\n');
		lines.forEach(async (line) => {
			if (line.startsWith('Panel ')) {
				let panelDescription = line.split(': ').slice(1).join(': ');
                panels.push({
					page_number: page_number,
					panel_number: panel_number,
					image: await generateImage(panelDescription),
					dialogue: []
				});
				panel_number++;
			} else if (line.startsWith('DESCRIPTION: ')) {
				descriptions.push(line.substring(13));
			} else if (line.startsWith('TITLE: ')) {
				title = line.substring(7);
			} else if (line.includes(': ')) {
				panels[panels.length - 1].dialogue.push(line);
			}
		});
		let id = await postToDatabase(title, descriptions, panels, request + '\n' + answer);
		return id;
	} catch (err) {
		console.log(err);
		return false;
	}
}

async function parseExistingAnswer(response, page_number) {
	let panels = [];
	let panel_number = 1;
	try {
		let lines = response.split('\n');
		lines.forEach(async (line) => {
			if (line.startsWith('Panel ')) {
				let panelDescription = line.split(': ').slice(1).join(': ');
				panels.push({
					page_number: page_number,
					panel_number: panel_number,
					image: await generateImage(panelDescription),
					dialogue: []
				});
				panel_number++;
			} else if (line.includes(': ')) {
				panels[panels.length - 1].dialogue.push(line);
			}
		});
		return panels;
	} catch (err) {
		console.log(err);
		return false;
	}
}

async function promptGPT(prompt) {
	let callResponse = '';
	try {
		const response = await fetch('http://localhost:3000/prompt', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				prompt
			})
		});
		const jsonResponse = await response.json();
		callResponse = jsonResponse.bot;
	} catch (error) {
		console.error(error);
	}
	return callResponse;
}

async function postToDatabase(comicTitle, character_descriptions, comicPanels, prompt) {
	let comicID = '';
	try {
		const res = await fetch('http://localhost:3000/comics', {
			method: 'POST',
			body: JSON.stringify({
				title: comicTitle,
				panels: [
					{
						page_number: 1,
						panel_number: 1,
						image: comicPanels[0][0],
						dialogue: comicPanels[0][1]
					},
					{
						page_number: 1,
						panel_number: 2,
						image: comicPanels[1][0],
						dialogue: comicPanels[1][1]
					},
					{
						page_number: 1,
						panel_number: 3,
						image: comicPanels[2][0],
						dialogue: comicPanels[2][1]
					}
				],
				character_description: character_descriptions,
				prompt: prompt
			}),
			headers: { 'Content-Type': 'application/json' }
		});
		const comic = await res.json();
		console.log(comic);
		comicID = comic._id.str;
	} catch (err) {
		console.error(err);
	}
	return comicID;
}

async function generateImage(prompt) {
	let imgB64 = '';

    try {
        const response = await fetch('http://localhost:3000/stable-diffusion', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				prompt
			})
		});
		imgB64 = response.text();
    } catch (error) {
        console.error(error);
    }

	return imgB64;
}

async function generateComix(prompt) {
	let request = `Write a comic about ${prompt}. Include a separate description of what the corresponding panel would look like. Follow this format:
    Panel: [Visual description of panel]
    [Name of character]: [Dialogue spoken by character]
    `;
	let tempRequest = `
    Add a title before the first panel with the following format:
    TITLE: [title]
    
    Describe every possible character that can appear in the story before the first panel with the following format:
    DESCRIPTION: [Name of character], [physical description]
    `;
	let end = 'Generate three panels at a time.';
	let callResponse = await promptGPT(request + tempRequest + end);

	let id = await parseCreateAnswer(callResponse, request + end);
	if (!id) {
		console.error('Error parsing answer');
		return false;
	}
	return id;
}

async function getComix(id, page) {
	let comic = '';
	let title = '';
	let author = '';
	let panels = [0, 0, 0];
	let maxPage = 0;

	try {
		const res = await fetch('http://localhost:3000/comics');
		const comics = await res.json();
		comic = comics.find((comic) => comic._id === id);
	} catch (error) {
		console.error(error);
		return false;
	}

	title = comic.title;
	author = comic.author;

	comic.panels.forEach(async (panel) => {
		if (panel.page_number > maxPage) {
			maxPage = panel.page_number;
		}
		if (panel.page_number == page) {
			panels[panel.panel_number - 1] = {
				image: panel.image,
				dialogue: panel.dialogue.join('\n')
			};
		}
	});

	return { title, author, panels, isLastPage: maxPage == page };
}

async function getAllComix() {
	let comics = [];
	try {
		const res = await fetch('http://localhost:3000/comics');
		comics = await res.json();
	} catch (error) {
		console.error(error);
	}

	return comics;
}

async function getPreviousPrompt(id) {
	let comic = '';
	let prompt = '';

	try {
		const res = await fetch('http://localhost:3000/comics');
		const comics = await res.json();
		comic = comics.find((comic) => comic._id.str === id);
	} catch (error) {
		console.error(error);
	}

	prompt = comic.prompt;

	return prompt;
}

async function createPage(id, page_number) {
	let prompt = await getPreviousPrompt(id);
	let callResponse = promptGPT(prompt + '\nContinue this story with three more panels.');
	try {
		await fetch(`http://localhost:3000/comics/${id}/prompt`, {
			method: 'POST',
			body: JSON.stringify({
				prompt: prompt + callResponse
			})
		});
	} catch (error) {
		console.error(error);
	}

	let panels = parseExistingAnswer(callResponse, page_number + 1);

	try {
		await fetch(`http://localhost:3000/comics/${id}/panels`, {
			method: 'POST',
			body: JSON.stringify({
				panels
			})
		});
	} catch (error) {
		console.error(error);
	}
}

export { generateComix, getComix, createPage, getAllComix };


console.log(await generateImage("a dog"));