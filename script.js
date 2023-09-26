// const apiKey = '4Rw0XFcv6C27LQjtS8fc7KqoH4ZlqKPlgGczMbv5kR1Uhx8UWExlICIZ';


console.log("working")

//Global variables
const dicUrlApi = "https://api.dictionaryapi.dev/api/v2/entries/en/"
const result = document.getElementById("result")
const sound = document.getElementById("sound")
const btn = document.getElementById("search-btn")

btn.addEventListener("click", () => {
    let inpWord = document.getElementById("inp-word").value; //Gets the value (char) of the input
    console.log(inpWord)

//     //Needs Annotation
//     fetch(`${dicUrlApi}${inpWord}`)
//         .then((response) => response.json)
//         .then((data) => console.log(data));
});

const image = document.getElementById("searchImage");
const wordExamples = document.getElementById("word-example");
const toggleButton = document.getElementById("toggleButton");
let isImageVisible = true;

toggleButton.addEventListener("click", function () {
    if (isImageVisible) {
        wordExamples.style.display = "block"; // display
        image.style.display = "block";
        toggleButton.textContent = "View Less";
    } else {
        wordExamples.style.display = "none"; // hide
        image.style.display = "none";
        toggleButton.textContent = "View More";
    }
    isImageVisible = !isImageVisible;
});

