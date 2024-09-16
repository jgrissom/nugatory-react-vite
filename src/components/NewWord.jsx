import React, { useState, useEffect } from "react";

const NewWord = (props) => {
  const [showForm, setShowForm] = useState(false);
  const [word, setWord] = useState("");
  const [color, setColor] = useState("#000000");

  function handleSubmit(e) {
    e.preventDefault();
    props.onAdd(word, color);
    setShowForm(false);
  }

  useEffect(() => {
    // this "hook" is called whenever showForm value changes
    if (showForm) {
      setWord("");
      setColor("#000000");
    }
  }, [showForm]);

  return (
    <div className="New-word">
      <form style={{ display: `${showForm ? "block" : "none"}` }}>
        <input
          type="text"
          id="word"
          name="word"
          value={word}
          onChange={(e) => setWord(e.target.value)}
          placeholder="Word"
          autoFocus
          autoComplete="off"
        />
        <input
          type="color"
          id="color"
          name="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          placeholder="Color"
          autoComplete="off"
        />
        <button
          disabled={word.trim().length === 0}
          type="submit"
          onClick={(e) => handleSubmit(e)}
        >
          Save
        </button>
        <button type="button" onClick={() => setShowForm(false)}>
          Cancel
        </button>
      </form>
      <span
        onClick={() => setShowForm(true)}
        className="Toggle-form"
        style={{ display: `${showForm ? "none" : "block"}` }}
      >
        New Word
      </span>
    </div>
  );
};

export default NewWord;
