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

    // Dictionary to assign time to each word based on its length in letters
    var dict = {
    1: 1 / (wpm / 2),
    2: 1 / (wpm / 2),
    3: 1 / (wpm / 2),
    4: 1 / (wpm / 2),
    5: 1 / (wpm / 3),
    6: 1 / (wpm / 3)
    };




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
        <img class="w-12 h-12" src="\static\panda_48.png" alt="">
        </nav>
        <main class="max-w-3xl break-words">
        <!-- Display the selectionText -->
        
        <h1 class="text-2xl font-bold text-zinc-100">First word: {selectionText[0]}</h1> 
        <h1 class="text-2xl font-bold">{selectionText}</h1>
    
        </main>
        <footer>
        <!-- Display the selectionText -->
    
        <h1 class="text-3xl font-bold underline">5 reeds to display how far you are in the selected text</h1>
    
        </footer>
    </section>
</body>


