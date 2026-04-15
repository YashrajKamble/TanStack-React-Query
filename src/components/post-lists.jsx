import { useQuery } from "@tanstack/react-query";
import { fetchPosts } from "../api/api";

const PostLists = () => {
  const {
    data: postData = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  //   console.log(data, isLoading, status, isError, error);

  return (
    <div className="container">
      {isLoading && <p>Loading...</p>}
      {isError && <p>{error?.message}</p>}
      {postData.map((post) => {
        return (
          <div key={post.id} className="post">
            <div>{post.title}</div>
            {post.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default PostLists;
