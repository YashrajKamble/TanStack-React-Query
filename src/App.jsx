import "./App.css";
import { useQuery } from "@tanstack/react-query";

function App() {

  useQuery(
    {
      queryKey:["posts"],
      queryFn;
    }
  )
  return (
    <>
      <h1>Get started</h1>
    </>
  );
}

export default App;
