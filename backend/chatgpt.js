const { Configuration, OpenAIApi } = require('openai');
const dotenv = require('dotenv');

const configuration = new Configuration({
  organization: 'org-DrkO8FCiScMVM7ofmp3FvXvf',
  apiKey: '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'
});

const openai = new OpenAIApi(configuration);

async function generateComicPrompt() {
    try {
        const prompt = 
        `
        Write a comic about Shrek fighting Mario. Include a separate description of what the corresponding panel would look like. Follow this format: Panel: [Visual description of panel]; [Name of character]: [Dialogue spoken by character]; Generate three panels at a time
        `

        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `${prompt}`,
            temperature: 0.7, // Higher values means the model will take more risks.
            max_tokens: 3000, // The maximum number of tokens to generate in the completion. Most models have a context length of 2048 tokens (except for the newest models, which support 4096).
            top_p: 1, // alternative to sampling with temperature, called nucleus sampling
            frequency_penalty: 0.5, // Number between -2.0 and 2.0. Positive values penalize new tokens based on their existing frequency in the text so far, decreasing the model's likelihood to repeat the same line verbatim.
            presence_penalty: 0, // Number between -2.0 and 2.0. Positive values penalize new tokens based on whether they appear in the text so far, increasing the model's likelihood to talk about new topics.
        });

        const test = response.data.choices[0].text;
        console.log(test);

    } catch (error) {
        console.error(error)
    }
}
generateComicPrompt();