# ComixAI

## Inspiration
The idea for ComixAI came from a desire to explore the possibilities of combining natural language processing and computer vision in a creative way. We wanted to see if we could use machine learning to generate compelling stories and visually striking images to create unique and engaging comics.

## What it does
ComixAI is a web application that uses GPT-3 to generate the picture panels and dialogue for a comic, and Stable Diffusion to generate the accompanying illustrations. Users can input a prompt, such as a character or a theme, and the application will generate a complete comic based on that input.

## How we built it
The application was built using Python and JavaScript, with the GPT-3 API and the Stable Diffusion model we deployed. We also used Svelte to create the front-end user interface and ExpressJS with NodeJS for the backend. The database was made with MongoDB.

## Challenges we ran into
One of the challenges we ran into was discovering the prompts for GPT-3 that gave us the format and style that we wanted. We then had to manipulate strings to send the information to Stable Diffusion and our database. Regarding the database, saving the images in it was quite tedious, as it got pretty complicated to retrieve them and render them properly with HTML. We also had a lot of trouble using Stable Diffusion as there is no available API for NodeJS. We had to deploy our own model on the cloud and then call it from our server.

## Accomplishments that we're proud of
We are proud of the final product and its ability to generate unique and exciting comics. We also successfully integrated GPT-3 and Stable Diffusion into the application, which was challenging, considering they are fairly new technologies.

## What we learned
We learned a lot about the capabilities and limitations of GPT-3 and Stable Diffusion, as well as "prompt engineering" to get the models to generate the exact output required. We also learned a lot about ExpressJS and servers, and MongoDB and databases in general.

## What's next for ComixAI
We plan to continue improving the application and fine-tuning the models to generate even more compelling comics. Additionally, we hope to explore other machine-learning techniques that could be used to enhance the application further.

