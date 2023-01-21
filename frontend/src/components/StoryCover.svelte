<script>
  import placeholder from '../lib/images/imgplaceholder.png'
  import {goto} from '$app/navigation';
  export let story;
</script>

<article class="container" on:click={() => goto(`/read/${story}/1`)}>
  <img src="{placeholder}" alt="">
  <div class="title">
    <p>Story Title</p>
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
