<script>
	import StoryCover from "../components/StoryCover.svelte";
	import {generateComix, getAllComix} from "$lib/script.js";
	import {goto} from "$app/navigation";
	let prompt = "";
	let loading = false;

	const generate = async () => {
		loading = true;
		let id = await generateComix(prompt);
		goto(`/read/${id}/1`);
	}

	const loadSampleStories = async () => {
		let comics = await getAllComix();
		return comics.slice(0, 3);
	}
</script>

<svelte:head>
    <title>ComixAI</title> 
</svelte:head>


<div class="loading" class:hidden="{!loading}">
	<span class="loader"></span>
</div>

<h1 class="title anim-typewriter">ComixAI</h1>

<p class="description">
	ComixAI is a web app that uses machine learning to generate comic strips. 
	<br>
	Enter a prompt below to generate a comic strip, or read existing stories.
</p>

<div class="prompt-container">
	<input type="text" name="prompt" id="prompt" placeholder="Enter a prompt for your story" bind:value={prompt}/>
	<button class="submit" on:click="{generate}" disabled={!prompt}>Generate</button>
</div>

{#await loadSampleStories()}
	<div aria-busy="true"></div>
{:then stories}
	<div class="text-container">
		<p class="text">
			Or read existing stories...
		</p>
		<p class="all text"><a href="/read">All stories</a></p>
	</div>
	<div class="stories">
		{#each stories as story}
			<StoryCover storyId={story._id} storyTitle={story.title} storyAuthor="Anonymous" imageSrc="data:image/jpg;base64,${story.panels[0].image}" />
		{/each} 
	</div>
{/await}

<style>
	.loader {
  width: 48px;
  height: 48px;
  border: 5px solid #FFF;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  position: relative;
  animation: pulse 1s linear infinite;
}
.loader:after {
  content: '';
  position: absolute;
  width: 48px;
  height: 48px;
  border: 5px solid #FFF;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  animation: scaleUp 1s linear infinite;
}

@keyframes scaleUp {
  0% { transform: translate(-50%, -50%) scale(0) }
  60% , 100% { transform: translate(-50%, -50%)  scale(1)}
}
@keyframes pulse {
  0% , 60% , 100%{ transform:  scale(1) }
  80% { transform:  scale(1.2)}
}
	.hidden {
		display: none !important;
	}

	.loading {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		font-size: 2rem;
		background-color: #777;
		opacity: 0.5;
		display: flex;
		justify-content: center;
		align-items: center;
	}

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
		margin-top: 20px;
		width: 100%;
		animation: pop-into-existence 1s;
	}

	.description {
		display: flex;
		flex-direction: row;
		align-items: center;
		color: #777;
		margin-bottom: 20px;
		text-align: center;
	}

	.text {
		margin-bottom:0px
	}

	.title {
		font-size: 5rem;
		margin-bottom: 0.1rem;
		margin-top: 80px;
		position: relative;
		border-right: 2px solid rgba(255,255,255,.75);
		text-align: center;
		white-space: nowrap;
		overflow: hidden;
	}

	.prompt-container {
		width: 70%;
		display: flex;
		flex-direction: row;
		align-items: center;
		height: 80%;
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

	.anim-typewriter{
		animation: typewriter 500ms steps(7) 1s 1 normal both,
		blinkTextCursor 500ms steps(15) infinite normal;
	}
	@keyframes typewriter{
		from{width: 0;}
		to{width: 40%;}
	}
	@keyframes blinkTextCursor{
		from{border-right-color: rgba(255,255,255,.75);}
		to{border-right-color: transparent;}
	}
</style>