function parseAnswer(answer) {
    let parsedAnswer = [];
    try {
        let lines = answer.split("\n");
        lines.forEach(line => {
            if (line.startsWith("Panel ")) {
                let panelDescription = line.split(": ")[1];
                parsedAnswer.push([generateImage(panelDescription)]);
            } else if (line.includes(": ")) {
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
    filename = "";
    return prompt;
}

function generateDialogue(text) {
    // Not sure if we need anything for the text
    return text;
}

function generateComix(prompt) {
    // Send request to GPT
    // Get response from GPT
    let answer = "";
    let parsed = parseAnswer(answer);
    if (!parsed) {
        console.error("Error parsing answer");
        return false;
    }
    return parsed;
}