<script>
    import { onMount } from "svelte";
    import { writable } from "svelte/store";

    /*
        States
    */
    let selectionText = "";

    // Function to retrieve the selectionText from Chrome storage
    function getSelectionText() {
        chrome.storage.local.get("selectionText", function (result) {
            console.log(selectionText);
            selectionText = result.selectionText;
        });
    }

    // change wpm according to value selected in dropdown menu
    var wpm = 100;

    var currentIndex = 0;
    var intervalId = null;

    function showNextWord() {
        currentIndex = (currentIndex + 1) % selectionText.length;
        console.log(currentIndex);
        if (currentIndex === selectionText.length - 1){
            stopAutomaticChange();
        } else {
            startAutomaticChange();
        }
    }

    function startAutomaticChange(){
        if (selectionText[currentIndex] == ""){
            currentIndex += 1;
        }
        let currentWord = selectionText[currentIndex];
        let delay = currentWord.length * (wpm / 2);
        intervalId = setTimeout(showNextWord, delay);
    }

    function stopAutomaticChange() {
        clearInterval(intervalId);
    }



    /*
        Function called as soon as the comoponent is mounted to the DOM.
    */
    onMount(getSelectionText);
</script>
<body>
    <section class="flex h-screen flex-col items-center justify-between p-6 bg-zinc-800 text-zinc-400">
        <nav class="flex w-full items-center justify-between">
        <!-- WPM and Font Size Dropdowns -->
        <div class="text-lg">WPM and Font Size Dropdowns</div>
    
        <!-- SpeedReeds Text -->
        <h1 class="justify-center text-4xl">SpeedReeds</h1>
    
        <!-- Logo -->
        <img class="w-12 h-12" src="\build\panda_48.png" alt="">
        </nav>
        <main class="max-w-3xl break-words">

            <!-- Display the selectionText -->
            <div id="type_text" class="text-2xl font-bold text-zinc-100">{selectionText[currentIndex]}</div>
            <!-- <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" on:click={showNextWord}>Show Next Word</button> -->
            <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full" on:click={startAutomaticChange}>Start Automatic Change</button>
            <h1 class="text-2xl font-bold">{selectionText}</h1>

        </main>
        <footer>
        <!-- Display the selectionText -->
    
        <h1 class="text-3xl font-bold underline">5 reeds to display how far you are in the selected text</h1>
    
        </footer>
    </section>
</body>
