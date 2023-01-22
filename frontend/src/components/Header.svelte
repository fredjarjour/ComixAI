<script>
  import { goto } from '$app/navigation';
</script>

<div class="header">
  <h1 class="title" on:click={() => {goto('/');}}>ComixAI</h1>
</div>

<style>
  .header {
    display: flex;
    flex-direction: row;
    width: 100%
  }

  .title {
    font-size: 2rem;
    margin-bottom: 0rem;
    cursor: pointer;
  }
</style>