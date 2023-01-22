<script>
  import StoryCover from "../../components/StoryCover.svelte";
  import {getAllComix} from "$lib/script.js";

  const loadAllStories = async () => await getAllComix();
</script>

<div class="container">
  {#await loadAllStories()}
    <div aria-busy="true"></div>
  {:then stories}
    {#each stories as story}
      <StoryCover storyId={story._id} storyTitle={story.title} storyAuthor={story.author.username} imageSrc="data:image/jpg;base64,${story.panels[0].image}" />
    {/each}
  {/await}
</div>

<style>
  .container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 1rem;
    max-width: 100%;
  } 
</style>