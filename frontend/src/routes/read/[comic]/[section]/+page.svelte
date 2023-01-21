<script>
  import placeholder from '$lib/images/imgplaceholder.png'
  import {page} from '$app/stores'
</script>

<div>
  <div class="image_and_text">
    <img src="{placeholder}" alt=""/>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam congue vulputate consequat. Quisque nibh libero, varius efficitur malesuada at, tincidunt nec ipsum. Aliquam finibus quis diam eget tristique. Integer sodales dui at sollicitudin pulvinar. Mauris ut metus tempor est pellentesque consequat. Aliquam in purus a urna congue auctor. Fusce at neque a nisi laoreet porttitor nec et diam. </p>
  </div>
</div>

<!-- {$page.params.section} -->

<style>
  .image_and_text {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
  }
</style>