<script>
  import placeholder from '$lib/images/imgplaceholder.png'
  import {page} from '$app/stores'
  // {$page.params.section} to get the value of the url query

  let loadSection = async () => {
    //let response = await fetch(`/api/read/${$page.params.comic}/${$page.params.section}`)
    //let data = await response.json()
    return;
  }
</script>

<div>
  {#await loadSection()}
  <div aria-busy="true"></div>
  {:then section}
    <div class="image_and_text">
      <img src="{placeholder}" alt=""/>
      <p>Shrek: It's time to end this! </p>
    </div>

    <div class="image_and_text flipped">
      <img src="{placeholder}" alt=""/>
      <p>Mario: Here I come!</p>
    </div>

    <div class="image_and_text">
      <img src="{placeholder}" alt=""/>
      <p>Shrek: You won't get away that easily!</p>
    </div>
  {/await}
</div>




<style>
  .image_and_text {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
  }

  .flipped {
    flex-direction: row-reverse;  
  }

  img {
    width: 10rem;
    height: auto;
  }
</style>