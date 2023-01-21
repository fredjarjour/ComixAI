<script>
  import placeholder from '$lib/images/imgplaceholder.png'
  import {page} from '$app/stores'
  // {$page.params.section} to get the value of the url query
</script>

<div>
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