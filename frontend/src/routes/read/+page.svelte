<script>
  import StoryCover from "../../components/StoryCover.svelte";
  let stories = [1,2,3,4,5]
</script>

<div class="container">
  {#each stories as story}
    <StoryCover story={story}/>
  {/each}
</div>