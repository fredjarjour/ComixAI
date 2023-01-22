<script>
  import placeholder from '$lib/images/imgplaceholder.png'
  import {page} from '$app/stores'
  import {goto} from '$app/navigation'
  import {getComix, createPage} from '$lib/script.js'
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
    await createPage($page.params.comic, $page.params.section);
    goto(`/read/${$page.params.comic}/${parseInt($page.params.section) + 1}`);
  }
</script>

<div>
  {#await loadSection()}
  <div aria-busy="true"></div>
  {:then section}
    <h1>{section.title}</h1>
    <h2>by {section.author}</h2>
    {#each section.panels as panel}
      
      <div class="image_and_text">
        <img src="data:image/jpg;base64,${panel.image}" alt=""/>
        <p>{panel.dialogue}</p>
      </div>
    {/each}

    <div class="pager">
      <button class="pager-button" disabled={$page.params.section <= 1} on:click={() => goto(`/read/${$page.params.comic}/${parseInt($page.params.section) - 1}`)}>&lt</button>
      {$page.params.section}
      <button class="pager-button" disabled={section.isLastPage} on:click={() => goto(`/read/${$page.params.comic}/${parseInt($page.params.section) + 1}`)}>&gt</button>
      <button class="pager-button" on:click={generateNewPage} class:hidden="{!section.isLastPage}">Generate Next Page</button>
    </div>
  {:catch error}
    {console.log(error)}
    <p>{error.message}</p>
  {/await}
</div>


<style>
  .hidden {
    display: none;
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

  img {
    width: 10rem;
    height: auto;
  }
</style>