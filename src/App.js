import React, {useState, useEffect} from 'react';
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

  //First attempt of comparing if two strings are anagrams.
  // function compare (inputStr) {
  //   const sortedStr = inputStr.split("").sort().join("");
  //   let count = 0;
  //   for (let i = 1; i < data.length; i++) {
  //     const sortedData = data[i].split("").sort().join("");
  //     if (sortedStr === sortedData) {
  //       count++;
  //     }
  //   }
  //   return count;
  // }

  // Second attempt using key value pairs to avoid sorting. The assignment did not mention anything about
  // upper and lower case situations so I have chosen not to include it. If it was added in I would simply toLowerCase both strings before looping to fill object
  function compare (inputStr) {
    let count = 0;
    for (let i = 1; i < data.length; i++) {
      if (inputStr.length !== data[i].length) {
        
      } else {
        const compareObj = {};
        const inputArr = inputStr.split("")
        const dataArr = data[i].split("")
        for (let j = 0; j < inputArr.length; j++) {

          if (compareObj[inputArr[j]] === undefined) {
            compareObj[inputArr[j]] = 1;
          } else {
            compareObj[inputArr[j]] ++;
          }

          if (compareObj[dataArr[j]] === undefined) {
            compareObj[dataArr[j]] = -1;
          } else {
            compareObj[dataArr[j]] --;
          }

        }
       if (checkObj(compareObj) === true) {
         count++;
       } 
      }
    }
    return count;
  }

  //Used in second attempt to check if all keys values are 0
  function checkObj (inputObj) {
    for (const key in inputObj) {
      if (inputObj[key] !== 0) {
        return false
      }
    }
    return true; 
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
