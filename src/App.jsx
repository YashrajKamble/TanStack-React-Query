import "./App.css";
import { useQuery } from "@tanstack/react-query";
import { fetchPosts } from "./api/api";

function App() {
  const { data, isLoading, isError, error, status } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  console.log(data, isLoading, status, isError, error);
  return (
    <>
      <h1>Get started</h1>
    </>
  );
}

export default App;
