import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import config from './config.js'
import Firebase from "firebase";

function App() {

  //Nothing at data[0] array starts from data[1]
  const [data, setData] = useState("")
  const [input, setInput] = useState("")

  useEffect(() => {
    Firebase.initializeApp(config);
    let ref = Firebase.database().ref("/");
    ref.on("value", snapshot => {
      const state = snapshot.val();
      setData(state);
    });
  }, [])

  function compare (inputStr) {
    const sortedStr = inputStr.split("").sort().join("");
    let count = 0;
    for (let i = 1; i < data.length; i++) {
      const sortedData = data[i].split("").sort().join("");
      if (sortedStr === sortedData) {
        count++;
      }
    }
    return count;
  }

  return (
    <div className="App">
    <p>Find the Anagrams!</p>
    <form>
      <input onChange={inp => {setInput(inp.target.value)}} value={input} />
    </form>
    <p>{compare(input)} anagrams found.</p>
    
    </div>
  );
}

export default App;
