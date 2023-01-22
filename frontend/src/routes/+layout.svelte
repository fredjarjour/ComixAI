<script lang="ts">
  import './app.css'
  import '@picocss/pico'
	import Header from '../components/Header.svelte';
</script>

<svelte:head>
  <!-- <link href="https://fonts.googleapis.com/css?family=Bangers" rel="stylesheet"> -->
</svelte:head>

<div style="display: flex; flex-direction: row-reverse; margin-right: 0; margin-left: auto; margin-top: 15px;">
	<a href="signup" role="button" class="secondary" style="margin-right: 15px;">Sign Up</a>
	<a href="login" role="button" class="contrast" style="margin-right: 15px;">Log In</a>
</div>

<div class="container">
  <slot />
</div>

<style>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
  }

  @keyframes slide-in {
    from {
      transform: translateX(300%);
    }
    to {
      transform: translateX(0);
    }
  }

</style>