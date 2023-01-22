<script>
  import placeholder from '../lib/images/imgplaceholder.png'
  import {goto} from '$app/navigation';
  export let storyId;
  export let storyTitle;
  export let storyAuthor;
  export let imageSrc;
</script>

<article class="container" on:click={() => goto(`/read/${storyId}/1`)}>
  <img src="{image}" alt="">
  <div class="title">
    <p>{storyTitle}</p>
    <p>{storyAuthor}</p>
  </div>
</article>

<style>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    cursor: pointer;
    margin-top:0rem;
    width: 25%
  }

</style>
