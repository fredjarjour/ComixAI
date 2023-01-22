<script lang="ts">
    import './../app.css'
    import '@picocss/pico'
      import Header from '../../components/Header.svelte';
  </script>
  
  <svelte:head>
    <!-- <link href="https://fonts.googleapis.com/css?family=Bangers" rel="stylesheet"> -->
  </svelte:head>
  
  
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
  </style>