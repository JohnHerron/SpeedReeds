<script>
    import { goto } from "$app/navigation";
    import { initializeApp } from "firebase/app";
    import { getDatabase, ref, push } from "firebase/database";

    // Initialize Firebase app with your Firebase config
    const firebaseConfig = {
        apiKey: "AIzaSyDSqWU-lirh2pkPL7ErnGhw2xGZkE0ncwI",
        authDomain: "speedreeds-2ae64.firebaseapp.com",
        databaseURL: "https://speedreeds-2ae64-default-rtdb.firebaseio.com",
        projectId: "speedreeds-2ae64",
        storageBucket: "speedreeds-2ae64.appspot.com",
        messagingSenderId: "439262857354",
        appId: "1:439262857354:web:047509ed2e45a4a66e0573",
        measurementId: "G-ZFPJM6K6RE"
    };
    const firebaseApp = initializeApp(firebaseConfig);
    const db = getDatabase(firebaseApp);

    let feedback = {
      rating: null,
      description: null,
    };

    async function handleSubmit() {
      try {
        // Push feedback data to Firebase Realtime Database
        const feedbackRef = ref(db, 'feedback');
        await push(feedbackRef, feedback);
        // Optionally, you can navigate to a success page or show a success message
        goto('/home');
      } catch (e) {
        console.error("Error adding feedback: ", e);
        // Handle error, show error message, etc.
      }
    }
</script>


<section class="w-full flex h-screen flex-col items-center p-6 bg-zinc-800 text-zinc-400">
    <nav class="flex w-full flex-row items-center content-start">
        <button class=""
        on:click={() => {goto('/home')}}
        >
            &larr; Back
        </button>
    </nav>
    <h1 class="text-4xl mt-16">Feedback</h1>

    <form on:submit|preventDefault={handleSubmit} class="w-1/3 mt-16 p-4 bg-zinc-700 shadow rounded flex flex-col">
        <p>Rate your experience:</p>
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

        <label for="description">Additional Details:</label>
        <textarea id="description" bind:value={feedback.description}></textarea>
        <br />

        <button 
        type="submit"
        class="bg-[#4aff46] w-fit hover:bg-green-500 font-bold rounded-xl text-white text-center self-center px-3"
        >
            Submit
        </button>
    </form>
</section>