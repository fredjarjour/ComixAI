<script>
	import StoryCover from "../components/StoryCover.svelte";
</script>

<form action="">
	<input type="text" name="prompt" id="prompt" placeholder="Enter a prompt for your story"/>
	<button type="submit" class="submit">Generate</button>
</form>

<p class="text">
	Or read existing stories
</p>
<div class="stories">
	<StoryCover/>
	<StoryCover/>
	<StoryCover/>
</div>

<p class="all"><a href="/read">All stories</a></p>

<style>
	form {
		display: flex;
		flex-direction: row;
		align-items: center;
		gap: 1rem;
	}

	#prompt {
		width: 80%
	}

	.submit {
		width: 20%;
	}

	.stories {
		display: flex;
		gap: 5rem;
	}

	.text {
		text-align: center;
	}

	.all {
		margin-left: auto;
	}
</style>