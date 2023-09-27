console.log("working")

// Global variables
const result = document.getElementById("result");

// const sound = document.getElementById("sound");
const apiMp3 = document.getElementById("apiAudio");

const btn = document.getElementById("search-btn");

const dicDefaultImage = document.querySelector("#searchImage");

btn.addEventListener("click", async () => {
    let dicUrlApi = "https://api.dictionaryapi.dev/api/v2/entries/en/";
    let inpWord = document.getElementById("inp-word").value.toLowerCase(); // Gets the value (char) of the input
    console.log(inpWord);

    try {
        // Make the API request
        let response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${inpWord}`);
        console.log(response)

        // Drilling our data response and setting DOM
        //Return Word
        let WordNameReturn = response.data[0].word;
        let wordName = document.getElementById("wordName");
        wordName.innerHTML = `${WordNameReturn}`;

        // Get Part of speech(s)
        let posReturn = response.data[0].meanings[0].partOfSpeech;
        let pos = document.getElementById("pos");
        pos.innerHTML = `${posReturn}`;

        // Get phonetic(s)
       let phoneticReturn = response.data[0].phonetic;
       let phonetic = document.getElementById("phonetic");
        phonetic.innerHTML = `${phoneticReturn}`;

        // Get Definition(s)
       let defReturn = response.data[0].meanings[0].definitions[0].definition;
       let def = document.getElementById("def");
       def.innerHTML = `${defReturn}`;

       //Get Word Example(s)
       let wordExReturn = response.data[0].meanings[0].definitions[0].example;
       let ex = document.getElementById("word-example");
       ex.innerHTML = `Ex. ${wordExReturn}`;     
        
        // Get the audio sources from phonetics
        let phonetics = response.data[0].phonetics;
        let audioSource = null;

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
            alert(`Error: Pronunciation audio not available for this word in API/database!.`);
            wordPronunciation.style.display = "none";
            }
            
        //Pexels Image gen
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
        alert(`Error: Word was not found in API/database! Please re-enter a valid term!`);
    }

});

const wordPronunciation = document.getElementById("wordPronunciationBtn");
let audioSource =! null;
wordPronunciation.style.display = "block";
wordPronunciation.addEventListener('click', function () {
    if (audioSource) {
        apiMp3.play();
    } else {
        wordPronunciation.style.display = "none";
        // If no audio source is found, display an error message
        alert(`Error: Pronunciation audio not available for this word in API/database!.`);
    }
});

const image = document.getElementById("searchImage")
const wordExamples = document.getElementById("word-example")
const toggleButton = document.getElementById("toggleButton")
let isImageVisible = true;

toggleButton.addEventListener("click", function () {
    switch (isImageVisible) {
        case true:
            wordExamples.style.display = "none"; // hide
            image.style.display = "none";
            toggleButton.textContent = "View More";
            break;
        default:
            wordExamples.style.display = "block"; // display
            image.style.display = "block";
            toggleButton.textContent = "View Less";
    }
    isImageVisible = !isImageVisible
});