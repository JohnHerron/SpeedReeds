<script>
  import { onMount } from "svelte";
  import { writable } from "svelte/store";

  /*
        States
    */
  let selectionText = "";
  let selectionString = "";
  let splitString = [];
  // Function to retrieve the selectionText from Chrome storage
  function getSelectionText() {
    chrome.storage.local.get("selectionText", function (result) {
      // Check if selectionText exists in the storage result

      selectionText = result.selectionText;
      splitString = splitWords(selectionText);
      console.log(splitString);

      console.log(splitString[1][0]);

      selectionString = result.selectionText.join(" ");
      // selectionText = selectionText.filter(word => word.trim() !== ''); // Remove empty strings
    });
  }

  // change wpm according to value selected in dropdown menu
  var wpm = 375;

  var currentIndex = 0;
  var intervalId = null;

  function showNextWord() {
    currentIndex = (currentIndex + 1) % selectionText.length;
    if (currentIndex === selectionText.length - 1) {
      stopAutomaticChange(); // Automatically stop when end of words array is reached
    } else {
      startAutomaticChange(); // Start automatic change again with the new word
    }
  }

  let paused = true;
  let playBtnText = "Start";
  function startAutomaticChange() {
    let currentWord = selectionText[currentIndex];
    let wordsPerSecond = wpm / 60; // Calculate words per second
    let delay = (currentWord.length / wordsPerSecond) * 200; // Calculate delay
    intervalId = setTimeout(showNextWord, delay);

    paused = false;
    playBtnText = "Pause";
  }

  function togglePlayback() {
    if (paused) {
      startAutomaticChange();
    } else {
      pauseAutomaticChange();
    }
  }

  function pauseAutomaticChange() {
    clearInterval(intervalId);
    paused = true;
    playBtnText = "Start";
  }

  function stopAutomaticChange() {
    clearInterval(intervalId);
  }

  /*
        Function called as soon as the comoponent is mounted to the DOM.
    */
  onMount(getSelectionText);
  function splitWords(text) {
    // Split each word in the array into two parts based on the middle
    return text.map((word) => {
      const middleIndex = Math.floor(word.length / 2);
      const firstHalf = word.slice(0, middleIndex);
      const secondHalf = word.slice(middleIndex);
      return [firstHalf, secondHalf];
    });
  }
</script>

<body>
  <section
    class="flex h-screen flex-col items-center justify-between p-6 bg-zinc-800 text-zinc-400"
  >
    <nav class="flex w-full items-center justify-between">
      <!-- WPM and Font Size Dropdowns -->
      <div class="text-lg">WPM and Font Size Dropdowns</div>

      <!-- SpeedReeds Text -->
      <h1 class="justify-center text-4xl">SpeedReeds</h1>

      <!-- Logo -->
      <img class="w-12 h-12" src="\panda_48.png" alt="" />
    </nav>
    <main class="max-w-3xl break-words flex flex-col justify-center gap-8">
      <!-- Display the selectionText -->
      <div
        class="text-6xl font-bold text-zinc-100 flex flex-row justify-center items-center"
      >
        {#if splitString.length > 1}
          <div class="">
            {splitString[currentIndex][0]}
          </div>

          <div class="bg-red-700">
            {splitString[currentIndex][1].charAt(0)}
          </div>

          <div>
            {splitString[currentIndex][1].substring(1)}
          </div>
        {:else}
          <span>No split string available</span>
        {/if}
      </div>

      <!-- <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" on:click={showNextWord}>Show Next Word</button> -->
      <textarea
        class="text-2xl font-bold resize-none bg-zinc-800 min-h-[75%] max-h-[75%] min-w-[700px] max-w-[700px]"
        readonly>{selectionString}</textarea
      >
      <button
        id="playBtn"
        class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full content-center self-center"
        on:click={togglePlayback}>{playBtnText}</button
      >
    </main>
    <footer>
      <!-- Display the selectionText -->

      <h1 class="text-3xl font-bold underline">
        5 reeds to display how far you are in the selected text
      </h1>
    </footer>
  </section>
</body>
