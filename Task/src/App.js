import { useEffect, useState } from 'react';
import './App.css';
import axios from "axios";
import * as htmlToImage from 'html-to-image';
// import { toJpeg } from 'html-to-image';

function App() {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [language, setLanguage] = useState(true);  //true for english....

  useEffect(() => {
    axios("https://programming-quotes-api.herokuapp.com/Quotes/random").then((res) => {
      // console.log(res.data);
      // const tempQuote = language ? res.data.en : "";
      setQuote(res.data.en );
      setAuthor(res.data.author);

    }).catch((e) => {
      console.log(e);
    })
  }, []);

  const generateQuote = () => {
    axios("https://programming-quotes-api.herokuapp.com/Quotes/random").then((res) => {
      // console.log(res.data);
      setQuote(res.data.en);
      setAuthor(res.data.author);

    }).catch((e) => {
      console.log(e);
    })
  }

  const changeLanguage = () => {
    setLanguage(!language);
    const currentLang = language ? "en" : "sr";
    const translateLang = language ? "sr" : "en";
    fetch(`https://api.mymemory.translated.net/get?q=${quote}!&langpair=${currentLang}|${translateLang}&de=${process.env.REACT_APP_EMAIL}`)
      .then(async (res) =>
        await res.json()
      ).then((data) => {
        console.log(data.responseData.translatedText);
        setQuote(data.responseData.translatedText);
      })
  }

  const downloadImg = ()=>{
    htmlToImage.toJpeg(document.getElementById('downloadSection'), { quality: 0.95 })
  .then(function (dataUrl) {
    var link = document.createElement('a');
    link.download = `quote_by_${author}.jpeg`;
    link.href = dataUrl;
    link.click();
  });
  }

  return (
    <div className='container'>
      <div className='wrapper'>
        <div className='top' id='downloadSection'>
          <div className='topQuote'>
            <h1 className='quote'>{quote ? `"${quote}"` : ""}</h1>
          </div>
          <div className='topAuthor'>
            <h1 className='author'>{author ? `- ${author}` : ""}</h1>
          </div>
        </div>

        <div className='bottom'>
          <button className='bottomButton' onClick={generateQuote}>Generate</button>
          <button className='bottomButton' onClick={changeLanguage}>Toggle Language</button>
          <button className='bottomButton' onClick={downloadImg}>Download</button>
        </div>
      </div>
    </div>
  );
}

export default App;
