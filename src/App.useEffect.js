import Button from "./Button";
import styles from "./App.module.css";
import { useState, useEffect } from "react";
function App() {
  const [counter, setValue] = useState(0);
  const [keyword, setKeyWord] = useState("");
  const onchange = (e) => setKeyWord(e.target.value);
  const onClick = () => setValue((prev) => prev + 1);
  
  useEffect(() => {
    console.log("i run all the time");
  }, []);
  useEffect(()=> {
    console.log("SERCH FOR", keyword);
}, [keyword]);

  useEffect(() => {
    console.log("counter THE API...");
  }, [counter]);

  
  useEffect(()=> {

      console.log("keyword, counter");
    
  }, [keyword, counter]);

  return (
    <div>
      <input value={keyword} onChange={onchange} type="text" placeholder="Search here.." />
      <h1>{counter}</h1>
      <button onClick={onClick}>Click me</button>
    </div>
  );
}

export default App;
