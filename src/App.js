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
  console.log(toDos); 
  return (
    <div>
      <h1>My To Dos ({toDos.length})</h1>
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          value={toDo}
          type="text"
          palceholder="Write your to do..."
        ></input>
        <button>Add to do</button>
      </form>

     
    </div>
  );
}

export default App;
