<script>
    import { onMount } from "svelte";
    import { writable } from "svelte/store";

    /*
        States
    */
    let selectionText = "";
    let selectionString = "";
    let splitString = "";
    // Function to retrieve the selectionText from Chrome storage
    function getSelectionText() {
        chrome.storage.local.get("selectionText", function (result) {
            // Check if selectionText exists in the storage result
            selectionText = result.selectionText;
            splitString = splitWords(selectionText);

            selectionString = result.selectionText.join(" ");
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

    function startAutomaticChange() {
        let currentWord = selectionText[currentIndex];
        let wordsPerSecond = wpm / 60; // Calculate words per second
        let delay = (currentWord.length / wordsPerSecond) * 200; // Calculate delay
        intervalId = setTimeout(showNextWord, delay);
    }

    function stopAutomaticChange() {
        clearInterval(intervalId);
    }

    function splitWords(text) {
        // Split each word in the array into two parts based on the middle
        return text.map((word) => {
            const middleIndex = Math.floor(word.length / 2);
            const firstHalf = word.slice(0, middleIndex);
            const secondHalf = word.slice(middleIndex);
            return [firstHalf, secondHalf];
        });
    }
    /*
        Function called as soon as the comoponent is mounted to the DOM.
    */

    onMount(getSelectionText);
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
        <main class="max-w-3xl break-words">
            <!-- Display the selectionText -->
            <div id="type_text" class="text-2xl font-bold text-zinc-100">
                {selectionText[currentIndex]}
            </div>
            <!-- <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" on:click={showNextWord}>Show Next Word</button> -->
            <button
                class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full"
                on:click={startAutomaticChange}>Start Automatic Change</button
            >
            <h1 class="text-2xl font-bold">{selectionString}</h1>
        </main>
        <footer>
            <!-- Display the selectionText -->

            <h1 class="text-3xl font-bold underline">
                5 reeds to display how far you are in the selected text
            </h1>
        </footer>
    </section>
</body>
