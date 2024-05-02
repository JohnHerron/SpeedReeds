<script>
    let feedback = {
      rating: '',
      description: '',
    };
  
    function handleSubmit() {
      console.log(feedback);
      // Send feedback data to your backend or perform any other action
    }
</script>


<section class="flex h-screen flex-col items-center justify-between p-6 bg-zinc-800 text-zinc-400">
    <h1>Feedback Form</h1>

    <form on:submit|preventDefault={handleSubmit} class="max-w-md mt-16 p-4 bg-zinc-700 shadow rounded flex flex-col">
        <div class="rate">
            <input type="radio" id="star5" name="rate" value="5" />
            <label for="star5" title="text">5 stars</label>
            <input type="radio" id="star4" name="rate" value="4" />
            <label for="star4" title="text">4 stars</label>
            <input type="radio" id="star3" name="rate" value="3" />
            <label for="star3" title="text">3 stars</label>
            <input type="radio" id="star2" name="rate" value="2" />
            <label for="star2" title="text">2 stars</label>
            <input type="radio" id="star1" name="rate" value="1" />
            <label for="star1" title="text">1 star</label>
        </div>

        <label for="message">Additional Details:</label>
        <textarea id="message" bind:value={feedback.description}></textarea>

        <button type="submit">Submit</button>
    </form>
</section>