import { useState } from "react";
import "./App.css";
import PostLists from "./components/post-lists";

function App() {
  const [toggle, setToggle] = useState(true);
  return (
    <>
      <h2 className="title">My Posts</h2>
      <button onClick={() => setToggle(!toggle)}> Toggle</button>
      {toggle && <PostLists />}
    </>
  );
}

export default App;
