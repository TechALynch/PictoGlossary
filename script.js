// console.log("working")

// // Global variables
// const result = document.getElementById("result");

const apiMp3 = document.getElementById("apiAudio");
const btn = document.getElementById("search-btn");
const dicDefaultImage = document.querySelector("#searchImage");
const wordName = document.getElementById("wordName");
const pos = document.getElementById("pos");
const phonetic = document.getElementById("phonetic");
const def = document.getElementById("def");
const ex = document.getElementById("wordExample");
// const pronounce = document.getElementById("i");
const wordPronunciation = document.getElementById("wordPronunciationBtn");

btn.addEventListener("click", async () => {
    const dicUrlApi = "https://api.dictionaryapi.dev/api/v2/entries/en/";
    
    // Gets the value (char) of the input
    const inpWord = document.getElementById("inp-word").value.toLowerCase();
    console.log(inpWord);

    try {
        // Make the API request
        let response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${inpWord}`);
        const wordData = response.data[0];
        console.log(wordData)
        console.log(response)

        // Drilling our data response and setting DOM
        // Return Word
        let WordNameReturn = response.data[0].word;
        wordName.innerHTML = `${WordNameReturn}`;

        // Get Part of speech(s)
        let posReturn = response.data[0].meanings[0].partOfSpeech;
        pos.innerHTML = `${posReturn}`;

        // Get phonetic(s)
        let phoneticReturn = response.data[0].phonetic;
        if (phoneticReturn)
        phonetic.innerHTML = `${phoneticReturn}` || 'N/A'

        // Get Definition(s)
        let defReturn = response.data[0].meanings[0].definitions[0].definition;
        def.innerHTML = `${defReturn}`;

        // //Get Word Example(s)
        // let wordExReturn = response.data[0].meanings[0].definitions[0].example;
        // ex.innerHTML = `Ex. ${wordExReturn}`;  
        
         // Loop through meanings to find an example
         let exampleFound = false;
         // Loop through the meanings of the wordData
         for (const meaning of wordData.meanings) {
            // Check if the meaning has definitions and at least one definition exists
             if (meaning.definitions && meaning.definitions.length > 0) {
                 let defReturn = meaning.definitions[0].definition || 'N/A';
                 def.innerHTML = `${defReturn}`;
                 if (meaning.definitions[0].example) {
                     let wordExReturn = meaning.definitions[0].example;
                     ex.innerHTML = `Ex. ${wordExReturn}`;
                     exampleFound = true;
                     break; // Exit the loop once an example is found
                 }
             }
         }

         // If no example was found, display N/A
         if (!exampleFound) {
             ex.innerHTML = 'Ex. N/A';
         }

        // Get the audio sources from phonetics
        let phonetics = response.data[0].phonetics;
        let audioSource = null;

        //Loop though array and find Audio file (.mp3)
        for (let i = 0; i < phonetics.length; i++) {
            if (phonetics[i].audio) {
                audioSource = phonetics[i].audio;
                break; // Exit the loop as soon as an audio source is found
            }
        }
        if (audioSource) {
            wordPronunciation.style.display = "block";
            apiMp3.setAttribute("src", audioSource);
        } else {
            
            // If no audio source is found, display an error message
            apiMp3.setAttribute("src", null);
            alert(`Error: Pronunciation audio not available for this word in dictionary API/database!.`);
            wordPronunciation.style.display = "none"; // Make image invisable if none exist
            }
            
        //Pexels Image generation based on inputText
        try {
            let headersList = {
            "Authorization": "4Rw0XFcv6C27LQjtS8fc7KqoH4ZlqKPlgGczMbv5kR1Uhx8UWExlICIZ" 
            }

            let reqOptions = {
            url: `https://api.pexels.com/v1/search?query=${inpWord}&per_page=1`,
            method: "GET",
            headers: headersList,
            }

            let response2 = await axios.request(reqOptions);
            console.log(response2.data);

            let imageSrc = response2.data.photos[0].src.landscape
            dicDefaultImage.innerHTML = `<img src=${imageSrc}>`
            console.log(imageSrc)

        // Error message
        } catch (error) {
        // Show an error message in a popup
        alert(`Error: Word image was not found in pexels API/database! Please re-enter a valid term to view an image!`);
        dicDefaultImage.innerHTML = ''
    }

    // Error message
    } catch (error) {
        // Show an error message in a popup
        alert(`Error: Word was not found in dictionary API/database! Please re-enter a valid term!`);
        wordName.innerHTML = ``
        pos.innerHTML = ``
        phonetic.innerHTML = ``
        ex.innerHTML = ``
        def.innerHTML = ``
        dicDefaultImage.innerHTML = ``
        toggleButton.style.display = "none";
        wordPronunciation.style.display = "none"; // Make image invisable if none exist
    }
});

let audioSource =! null;
wordPronunciation.style.display = "none";

wordPronunciation.addEventListener('click', function () {
    if (audioSource) {
        apiMp3.play();
    } else {
        wordPronunciation.style.display = "none";
        // If no audio source is found, display an error message
        alert(`Error: Pronunciation audio not available for this word in dictionary API/database!.`);
    }
});

const image = document.getElementById("searchImage")
const wordExamples = document.getElementById("wordExample")
const toggleButton = document.getElementById("toggleButton")
let isImageVisible = true;

// View More/less info toggle switch 
toggleButton.addEventListener("click", function () {
    switch (isImageVisible) {
        case true:
            wordExamples.style.display = "none"; // hide
            image.style.display = "none";
            toggleButton.textContent = "View More...";
            break;
        default:
            wordExamples.style.display = "block"; // display
            image.style.display = "block";
            toggleButton.textContent = "View Less...";
    }
    isImageVisible = !isImageVisible
});