import { useState, useEffect } from "react";

function App() {
  const [toDo, setToDo] = useState("");
  const [toDos, setToDos] = useState([]);
  const onChange = (e) => setToDo(e.target.value);
  const onSubmit = (event) => {
    event.preventDefault();
    console.log(toDo);
    if(toDo === "") {
      return;
    } 
    
    setToDos((currentArray) => [toDo, ...currentArray]);
    setToDo(""); 
  };
  return (
    <div>
      <h1>My To Dos ({toDos.length})</h1>
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          value= {toDo}
          type="text"
          placeholder="Write your to do..."
        ></input>
        <button>Add to do</button>
      </form>
    <hr>
    </hr>
    <ul>
    {toDos.map((item, index) => (
      <li key={index}>{item}</li>
      ))}
    </ul>
    </div>
  );
}

export default App;
