import React, { useState, useEffect } from "react";
import axios from "axios";
import Word from "./components/Word";
import Counter from "./components/Counter";
import NewWord from "./components/NewWord";
import "./App.css";

const App = () => {
  const [words, setWords] = useState([]);
  const apiEndpoint = "https://nugatory.azurewebsites.net/api/word";

  const handleDelete = async (wordId) => {
    const originalWords = words;
    setWords(words.filter((w) => w.id !== wordId));
    try {
      // await axios.delete(`${apiEndpoint}/${wordId}`);
      throw new console.error("");
    } catch (ex) {
      alert("An error occurred while deleting a word");
      setWords(originalWords);
    }
  };
  const handleAdd = async (word, color) => {
    const { data: post } = await axios.post(apiEndpoint, {
      word: word,
      color: color,
    });
    setWords(words.concat(post));
  };
  // this is the functional equivalent to componentDidMount
  useEffect(() => {
    // initial data loaded here
    async function fetchData() {
      const { data: fetchedWords } = await axios.get(apiEndpoint);
      setWords(fetchedWords);
    }
    fetchData();
  }, []);
  return (
    <div className="App">
      <header className="App-header">nugatory</header>
      {words.map((word) => (
        <Word key={word.id} word={word} onDelete={handleDelete} />
      ))}
      <Counter totalWords={words.length} />
      <NewWord onAdd={handleAdd} />
    </div>
  );
};

export default App;
