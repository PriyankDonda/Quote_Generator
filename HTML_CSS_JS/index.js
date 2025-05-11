const quote = document.getElementById("Quote");
const author = document.getElementById("Author");
let language = true;  //true if english else serbian
const generateBtn = document.getElementById("generate");
const translater = document.getElementById("language");
const downloadBtn = document.getElementById("download");

let quoteText = "";
let authorName = "";

const email = "";

// generate random quote
const generateQuote = () => {
    fetch("https://programming-quotes-api.herokuapp.com/Quotes/random").then((res) => res.json()).then((data) => {
        console.log(data);
        quote.innerHTML = `"${data.en}"`;
        author.innerHTML = `- ${data.author}`;
        quoteText = data.en;
        authorName = data.author;
    }).catch((e) => {
        console.log(e);
    })
}

generateQuote();

generateBtn.addEventListener("click", generateQuote);

// change language
const changeLanguage = () => {
    const currentLang = language ? "en" : "sr";
    const translateLang = language ? "sr" : "en";
    fetch(`https://api.mymemory.translated.net/get?q=${quoteText}&langpair=${currentLang}|${translateLang}&de=${email}`)
        .then((res) =>
            res.json()
        ).then((data) => {
            // console.log(data)
            console.log(data.responseData.translatedText);
            quote.innerHTML = `"${data.responseData.translatedText}"`;
            quoteText = data.responseData.translatedText;

            language = !language;
        })
}

translater.addEventListener("click", changeLanguage);


// download img
// const downloadImg = ()=>{
    
//   }
// downloadBtn.addEventListener("click", downloadImg)