<script>
	import StoryCover from "../components/StoryCover.svelte";
	import {generateComix, getAllComix} from "$lib/script.js";
	import {goto} from "$app/navigation";
	let prompt = "";

	const generate = () => {
		generateComix(prompt);
		goto(`/read/${prompt.split(' ').join('_')}/1`);
	}

	const loadSampleStories = async () => {
		let comics = await getAllComix();
		return comics.slice(0, 3);
	}
</script>

<h1 class="title">ComixAI</h1>

<div class="prompt-container">
	<input type="text" name="prompt" id="prompt" placeholder="Enter a prompt for your story" bind:value={prompt}/>
	<button class="submit" on:click="{generate}" disabled={!prompt}>Generate</button>
</div>

<div class="text-container">
	<p class="text">
		Or read existing stories...
	</p>
	<p class="all text"><a href="/read">All stories</a></p>
</div>
<div class="stories">
	{#await loadSampleStories()}
		<div aria-busy="true"></div>
	{:then stories}
		{#each stories as story}
			<StoryCover storyId={story._id} storyTitle={story.title} storyAuthor={story.author.username} imageSrc="data:image/jpg;base64,${story.panels[0].image}" />
		{/each} 
	{/await}

</div>



<style>

	@keyframes slide-up {
		0% {
			transform: translateY(100%);
			opacity: 0;
		}
		100% {
			transform: translateY(0%);
			opacity: 100;
		}
	}

	@keyframes pop-into-existence {
		0% {
			transform: scale(0);
		}
		100% {
			transform: scale(1);
		}
	}

	.text-container {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 0.5rem;
		width: 100%;
		animation: pop-into-existence 1s;
	}

	.text {
		margin-bottom:0px
	}

	.title {
		font-size: 5rem;
		margin-bottom: 0rem;
	}

	.prompt-container {
		width: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 0.5rem;
		animation: slide-up 1s;
	}

	#prompt {
		width: 80%
	}

	.submit {
		width: 20%;
	}

	.stories {
		display: flex;
		gap: 5rem;
		animation: pop-into-existence 1s;
	}

	.all {
		margin-left: auto;
	}
</style>