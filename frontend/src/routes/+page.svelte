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
	<StoryCover story=1/>
	<StoryCover story=1/>
	<StoryCover story=1/>
</div>



<style>
	.text-container {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 0.5rem;
		width: 100%
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

	.all {
		margin-left: auto;
	}
</style>