<script>
  import StoryCover from "../../components/StoryCover.svelte";
  let stories = [1,2,3,4,5,6,7,8,9,10,11]
</script>

<div class="container">
  {#each stories as story}
    <StoryCover story={story}/>
  {/each}
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