import { useState, useEffect } from "react";

function Hello() {
  useEffect(() => {
    console.log("hi :)");
    return function() {
      console.log("bye :(");
    }
  }, []);
  return <h1>Hello</h1>;
}


function App() {
  const [showing, setShowing] = useState(false);
  const onclick = () =>  setShowing((prev) => !prev);
  return (
    <div>
      {showing ? <Hello></Hello> : null}
      <button onClick={onclick}> {showing ? "Hide" : "Show"} </button>
    </div>
  );
}

export default App;
