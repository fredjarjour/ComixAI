<script>
	import StoryCover from "../components/StoryCover.svelte";
	import {generateComix} from "$lib/script.js";
	import {goto} from "$app/navigation";
	let prompt = "";

	const generate = () => {
		generateComix(prompt);
		goto(`/read/${prompt.split(' ').join('_')}/1`);
	}
</script>

<h1>ComixAI</h1>

<div class="prompt-container">
	<input type="text" name="prompt" id="prompt" placeholder="Enter a prompt for your story" bind:value={prompt}/>
	<button class="submit" on:click="{generate}" disabled={!prompt}>Generate</button>
</div>

<p class="text">
	Or read existing stories...
</p>
<div class="stories">
	<StoryCover/>
	<StoryCover/>
	<StoryCover/>
</div>

<p class="all"><a href="/read">All stories</a></p>

<style>
	.prompt-container {
		width: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 0.5rem;
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
	}

	.text {
		text-align: center;
	}

	.all {
		margin-left: auto;
	}
</style>