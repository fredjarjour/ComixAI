function parseCreateAnswer(answer, request) {
	let title = '';
    let author = "Anonymous";
	let descriptions = [];
	let panels = [];
	try {
		let lines = answer.split('\n');
		lines.forEach((line) => {
			if (line.startsWith('Panel ')) {
				let panelDescription = line.split(': ').slice(1).join(': ');
				panels.push([generateImage(panelDescription), []]);
			} else if (line.startsWith('DESCRIPTION: ')) {
				descriptions.push(line.substring(13));
			} else if (line.startsWith('TITLE: ')) {
				title = line.substring(7);
			} else if (line.includes(': ')) {
				panels[panels.length - 1][1].push(line);
			}
		});
		let id = postToDatabase(title, author, descriptions, panels, request + "\n" + answer);
		return id;
	} catch (err) {
		console.log(err);
		return false;
	}
}

function parseExistingAnswer(response, page_number) {
    let panels = [];
    let panel_number = 1;
    try {
        let lines = response.split('\n');
        lines.forEach((line) => {
            if (line.startsWith('Panel ')) {
                let panelDescription = line.split(': ').slice(1).join(': ');
                panels.push({
                    page_number: page_number,
                    panel_number: panel_number,
                    image: generateImage(panelDescription),
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

function promptGPT(prompt) {
    let callResponse = '';
    fetch('http://localhost:3000/prompt', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(request+tempRequest+end)
	})
    .then((res) => res.json())
    .then((response) => {
        callResponse = response.bot;
        console.log(response.bot);
    })
    .catch((error) => {
        console.error(error);
    });

    return callResponse;
}

function postToDatabase(comicTitle, comicAuthor, character_descriptions, panels, prompt) {
	let comicID = '';
	fetch('http://localhost:3000/comics', {
		method: 'POST',
		body: JSON.stringify({
			title: comicTitle,
            author: comicAuthor,
			panels: [
				{
					page_number: 1,
					panel_number: 1,
					image: panels[0][0],
					dialogue: panels[0][1]
				},
				{
					page_number: 1,
					panel_number: 2,
					image: panels[1][0],
					dialogue: panels[1][1]
				},
				{
					page_number: 1,
					panel_number: 3,
					image: panels[2][0],
					dialogue: panels[2][1]
				}
			],
			character_description: character_descriptions,
            prompt: prompt
		}),
		headers: { 'Content-Type': 'application/json' }
	})
		.then((res) => res.json())
		.then((comic) => {
			comicID = comic._id.str;
			console.log(comic);
		})
		.catch((err) => console.error(err));
	return comicID;
}

function generateImage(promptString) {
    let imgBuffer = '';

	fetch('.../predict', {
		method: 'POST',
		body: JSON.stringify({
			prompt: promptString
		})
	})
    .then((predictions) => predictions.json())
    .then((predictionsDict) => {
        imgBuffer = predictionsDict.predictions[0];
    })
    .catch((error) => {
        console.error(error);
    });

	return imgBuffer;
}

function generateComix(prompt) {
	let request = `Write a comic about ${prompt}. Include a separate description of what the corresponding panel would look like. Follow this format:
    Panel: [Visual description of panel]
    [Name of character]: [Dialogue spoken by character]
    `
    let tempRequest = `
    Add a title before the first panel with the following format:
    TITLE: [title]
    
    Describe every possible character that can appear in the story before the first panel with the following format:
    DESCRIPTION: [Name of character], [physical description]
    `
    let end = "Generate three panels at a time.";
	let callResponse = promptGPT(request+tempRequest+end);

	let id = parseCreateAnswer(callResponse, request+end);
	if (!parsed) {
		console.error('Error parsing answer');
		return false;
	}
	return id;
}

function getComix(id, page) {
	let comic = '';
	let title = '';
	let author = '';
	let panels = [0, 0, 0];
	let maxPage = 0;

	fetch('http://localhost:3000/comics')
		.then((res) => res.json())
		.then((comics) => {
			comic = comics.find(comic => comic._id.str === id);
		})
		.catch((error) => {
			console.error(error);
		});

	title = comic.title;
	author = comic.author;

	comic.panels.forEach((panel) => {
		if (panel.page_number > maxPage) {
			maxPage = panel.page_number;
		}
		if (panel.page_number === page) {
			panels[panel.panel_number - 1] = { image: Buffer.from(panel.image).toString("base64"), dialogue: panel.dialogue.join('\n') };
		}
	});

	return { title, author, panels, isLastPage: maxPage == page };
}

function getAllComix() {
    let comics = [];
    fetch('http://localhost:3000/comics')
        .then((res) => res.json())
        .then((comics) => {
            comics = comics;
        })
        .catch((error) => {
            console.error(error);
        });

    return comics;
}

function getPreviousPrompt(id) {
    let comic = '';
    let prompt = '';

    fetch('http://localhost:3000/comics')
    .then((res) => res.json())
    .then((comics) => {
        comic = comics.find(comic => comic._id.str === id);
    })
    .catch((error) => {
        console.error(error);
    });

    prompt = comic.prompt;

    return prompt;
}

function createPage(id, page_number) {
    let prompt = getPreviousPrompt(id);
    let callResponse = promptGPT(prompt + "\nContinue this story with three more panels.");
    // TODO: Update prompt

    let panels = parseExistingAnswer(callResponse, page_number+1);

    fetch(`http://localhost:3000/comics/${id}/panels`, {
        method: 'POST',
        body: JSON.stringify({
            panels
        })
    })
    .catch((error) => {
        console.error(error);
    });
}



export { generateComix, getComix, createPage, getAllComix };