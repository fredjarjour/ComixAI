<script>
  import placeholder from '$lib/images/imgplaceholder.png'
  import {page} from '$app/stores'
  import {goto} from '$app/navigation'
  import {getComix, createPage} from '$lib/script.js'
  let loading = false;
  // {$page.params.section} to get the value of the url query
  let loadSection = async () => {
    let response = await getComix($page.params.comic, $page.params.section);
    return response;
    // object {
    //  title: string,
    //  author: string,
    //  panels: [{
    //    image: base64 string, #check stackoverflow
    //    dialogue: string #separator is \n
    //  }],
    //  isLastPage: boolean
    // }
  }
  let generateNewPage = async () => {
    loading = true;
    await createPage($page.params.comic, $page.params.section);
    goto(`/read/${$page.params.comic}/${parseInt($page.params.section) + 1}`);
  }
  let flip = false;
</script>

<div class="loading" class:hidden="{!loading}">
	<span class="loader"></span>
</div>

{#await loadSection()}
<div aria-busy="true"></div>
{:then section}
<div class="container">
    <h1>{section.title}</h1>
    {#each section.panels as panel, i} 
      <div class="image_and_text {i===1? "flipped" : "normal"}">
        <img src="data:image/png;base64,{panel.image.substring(1,panel.image.length - 1)}" alt=""/>
        <p>{panel.dialogue}</p>
      </div>
    {/each}

    <div class="pager">
      <button class="pager-button" disabled={$page.params.section <= 1} on:click={() => goto(`/read/${$page.params.comic}/${parseInt($page.params.section) - 1}`)}>&lt</button>
      {$page.params.section}
      <button class="pager-button" disabled={section.isLastPage} on:click={() => goto(`/read/${$page.params.comic}/${parseInt($page.params.section) + 1}`)}>&gt</button>
      <button class="pager-button" on:click={generateNewPage} class:hidden="{!section.isLastPage}">Generate Next Page</button>
    </div>
</div>
  {:catch error}
    {console.log(error)}
    <p>{error.message}</p>
  {/await}

<style>
  .flipped  {
    flex-direction: row-reverse;
  }

  	.loader {
  width: 48px;
  height: 48px;
  border: 5px solid #FFF;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  position: relative;
  animation: pulse 1s linear infinite;
}
.loader:after {
  content: '';
  position: absolute;
  width: 48px;
  height: 48px;
  border: 5px solid #FFF;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  animation: scaleUp 1s linear infinite;
}
@keyframes scaleUp {
  0% { transform: translate(-50%, -50%) scale(0) }
  60% , 100% { transform: translate(-50%, -50%)  scale(1)}
}
@keyframes pulse {
  0% , 60% , 100%{ transform:  scale(1) }
  80% { transform:  scale(1.2)}
}
	.hidden {
		display: none !important;
	}
	.loading {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		font-size: 2rem;
		background-color: #777;
		opacity: 0.5;
		display: flex;
		justify-content: center;
		align-items: center;
	}
  @keyframes pop-into-existence {
		0% {
			transform: scale(0);
		}
		100% {
			transform: scale(1);
		}
	}
  .pager {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: baseline;
    gap: 1rem;
    padding: 1rem;
    text-align: center;
  }
  .pager-button {
    width:fit-content;
  }
  .image_and_text {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
  }
  .flipped {
    flex-direction: row-reverse;  
  }
  .container {
    animation: pop-into-existence 1s;
  }
  img {
    width: 10rem;
    height: auto;
  }
</style>