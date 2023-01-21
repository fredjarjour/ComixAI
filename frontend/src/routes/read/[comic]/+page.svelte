<script>
	import { onMount } from "svelte";
  import {goto} from "$app/navigation";
  import {page} from "$app/stores";

  onMount(async () => {
    goto(`/read/${$page.params.comic}/1`)
  })
</script>