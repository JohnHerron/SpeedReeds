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

    /*
        Function called as soon as the comoponent is mounted to the DOM.
    */
    onMount(getSelectionText);
</script>

<main>
    <h1>Welcome to SpeedReeds!</h1>
    <p>Home</p>
    <!-- Display the selectionText -->
    <p>{selectionText}</p>
</main>
