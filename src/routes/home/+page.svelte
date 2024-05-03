<script>
  import { onMount } from "svelte";
  import { goto } from '$app/navigation';
  import { writable } from "svelte/store";
  import {browser as browserSvelte} from'$app/environment';


  let selectionText = "";
  let selectionString = "";
  let splitString = [];

  // Function to retrieve the selectionText from Chrome storage
  function getSelectionText() {
    chrome.storage.local.get("selectionText", function (result) {
      // Check if selectionText exists in the storage result

      selectionText = result.selectionText;
      splitString = splitWords(selectionText);

      selectionString = result.selectionText.join(" ");
      // selectionText = selectionText.filter(word => word.trim() !== ''); // Remove empty strings
    });
  }

  // change wpm according to value selected in dropdown menu
  const defaultWPM = 350
  const wpmStore = writable(defaultWPM);
  let initialWPMRetrieved = false;

  function getWPMSetting() {
    chrome.storage.local.get("wpm", function(result) {
      const chosenWPM = result.wpm;
      if (chosenWPM !== undefined) {
        wpmStore.set(chosenWPM);
        initialWPMRetrieved = true;
      }
    });
  }

  onMount(getWPMSetting)
  
  wpmStore.subscribe((val) => {
    if (browserSvelte && initialWPMRetrieved) {
      chrome.storage.local.set({"wpm": val});
    } 
  });

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
  let playBtnText = "\u23F5";
  function startAutomaticChange() {
    let currentWord = selectionText[currentIndex];
    let wordsPerSecond = Number($wpmStore) / 60; // Calculate words per second
    let delay = (currentWord.length / wordsPerSecond) * 200; // Calculate delay
    intervalId = setTimeout(showNextWord, delay);

    paused = false;
    playBtnText = "\u23F8";
  }

  function togglePlayback() {
    if (paused) {
      startAutomaticChange();
    } else {
      pauseAutomaticChange();
    }
  }
  function moveLeft() {
    if (currentIndex > 0) {
      currentIndex -= 1;
    } else {
      currentIndex = 0;
    }
  }
  function moveRight() {
    if (currentIndex < selectionText.length - 1) {
      currentIndex += 1;
    } else {
      currentIndex = selectionText.length - 1;
    }
  }
  function pauseAutomaticChange() {
    clearInterval(intervalId);
    paused = true;
    playBtnText = "\u23F5";
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
    <nav class="w-full flex items-center justify-between">
      <!-- WPM and Font Size Dropdowns -->
      <div class="text-4xl">
        <label for="wpm" title="Words Per Minute">WPM</label>
        <input
          class="w-3em bg-transparent border-0 text-gray-800 text-center focus:ring-0 dark:text-white"
          bind:value={$wpmStore}
          type="number"
          id="wpm"
          max="1500"
          min="25"
          step="25"
        />
        </div>
    
        <!-- SpeedReeds Text -->
        <h1 class="text-4xl justify-center translate-x-[-50%]">SpeedReeds</h1>
    
        <div class="flex gap-x-8">
          <button on:click={() => {goto('/feedback')}}>SUBMIT FEEDBACK</button>
          <!-- Logo -->
          <img class="w-12 h-12" src="\panda_48.png" alt="" />
        </div>
    </nav>
    <main class="max-w-3xl break-words flex flex-col justify-center gap-8">
      <!-- Display the selectionText -->
      <div class="word-container">
        {#if splitString.length > 1}
          <div class="left-half">
            {splitString[currentIndex][0]}
          </div>

          <div class="highlighted-letter">
            {splitString[currentIndex][1].charAt(0)}
          </div>

          <div class="right-half">
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
      <div class="flex flex-row gap-x-3 justify-center items-center">
        <button
          on:click={moveLeft}
          class="text-4xl hover:scale-105 transition-transform text-zinc-400"
        >
          &#x23ea;&#xfe0e;
        </button>

        <button
          id="playBtn"
          class="bg-[#4aff46] text-4xl hover:bg-green-500 text-white font-bold pb-2 px-4 rounded-2xl"
          on:click={togglePlayback}
        >
          {playBtnText}
        </button>

        <button
          on:click={moveRight}
          class="text-4xl hover:scale-105 transition-transform text-zinc-400"
        >
          &#x23e9;&#xfe0e;
        </button>
      </div>
    </main>
    <footer class="mb-6">
      <!-- Bamboo Reeds at Bottom of Page -->
      <div class="flex flex-row-reverse justify-center items-center gap-x-4">
        {#each Array.from({ length: 5 }, (_, i) => i) as index}
          {#if currentIndex < ((selectionText.length - 1) * (index + 1)) / 5}
            <img class="w-12 h-12" src="\bamboo_reed.png" alt="" />
          {:else}
            <img class="w-12 h-12" src="\BlackDot.svg" alt="" />
          {/if}
        {/each}
      </div>
    </footer>
  </section>
</body>
