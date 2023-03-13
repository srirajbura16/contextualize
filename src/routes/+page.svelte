

<script>
  let url = ''
  let articleTitle = ''
  let articleText = ''
  let articleContext = ''
  
  async function handleSubmit(event){
    const data = await fetch("/api/extract-text", {
      method: 'POST',
      body: JSON.stringify({url: event.target.url.value}),
      headers: {
        'content-type': 'application/json'
      }
    })
    
    const {context, title, text} = await data.json()
    console.log(context, title, text, "BROWSER")
    url = event.target.url.value
    articleTitle = title
    articleText = text
    articleContext = context

    return;
    
  }     
</script>

<div class="mt-8 lg:w-3/5 md:w-4/5 p-4 w-full mx-auto">
  <!-- <h1 class="text-3xl font-semibold">
    Contextilize
  </h1> -->

  <form on:submit|preventDefault={handleSubmit} class="">
      <input name="url" placeholder="Enter URL" type="url" required>  
      <button type="submit" value="generate">generate</button>
  </form>
  
  
  
  
  <p>{url}</p>
  
  <h3 class="text-1xl font-semibold">
    {articleTitle}
  </h3>
  
  <div class="flex flex-col w-full border-opacity-50">
    <div class="grid h-20 card bg-base-300 rounded-box place-items-center">{articleContext}</div>
    <hr>
    <div class="grid h-20 card bg-base-300 rounded-box place-items-center">{articleText}</div>
  </div>
</div>