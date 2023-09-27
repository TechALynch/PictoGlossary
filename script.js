console.log("working")

// Global variables
const result = document.getElementById("result");

// const sound = document.getElementById("sound");
const apiMp3 = document.getElementById("apiAudio");

const btn = document.getElementById("search-btn");

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
        ////Iteration
        // for (let i = 0; i < response.data.definitions.length; i++) {
        // let def = response.data[i].meanings[0]
        // let defUpdate = document.getElementsByClassName("word-meaning")
        // defUpdate.textContent = def
        // defUpdate.appendChild(defUpdate)
        // }      

        let sound = response.data[0].phonetics[0].audio;
        apiMp3.setAttribute("src", `${sound}`)
        console.log(sound)
        console.log(apiMp3)
        
        // Error message
    } catch (error) {
        // Show an error message in a popup
        alert(`Error: Word was not found in API/database! Please re-enter a valid term`);
    }
});

const wordPronunciation = document.getElementById("wordPronunciationBtn");
wordPronunciation.addEventListener('click', function () {
    apiMp3.play();
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