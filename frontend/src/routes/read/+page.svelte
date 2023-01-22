<script>
  import StoryCover from "../../components/StoryCover.svelte";
  import {getAllComix} from "$lib/script.js";

  const loadAllStories = async () => await getAllComix();
</script>

{#await loadAllStories()}
<div aria-busy="true"></div>
{:then stories}

<div class="container">
    {#each stories as story}
      {#if story.panels[0].image}
      <StoryCover storyId={story._id} storyTitle={story.title} imageSrc="data:image/jpg;base64,{story.panels[0].image.substring(1, story.panels[0].image.length -1)}" />
      {:else}
      <StoryCover storyId={story._id} storyTitle={story.title} imageSrc="" />
      {/if}
    {/each}
</div>
{/await}

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

  .container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 1rem;
    max-width: 100%;
    animation: slide-up 1s;
  } 
</style>