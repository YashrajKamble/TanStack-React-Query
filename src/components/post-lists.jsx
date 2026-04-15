import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addPost, fetchPosts, fetchTags } from "../api/api";

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

  const { data: tagsData } = useQuery({
    queryKey: ["tags"],
    queryFn: fetchTags,
  });

  const queryClient = useQueryClient();

  const {
    mutate,
    isError: isPostError,
    isPending,
    error: postError,
    reset,
  } = useMutation({
    mutationFn: addPost,
    onMutate: () => {
      return { id: 1 };
    },
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({
        queryKey: ["posts"],
        exact:true,
        predicate:()
      });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const title = formData.get("title");
    const tags = Array.from(formData.keys()).filter(
      (key) => formData.get(key) === "on",
    );

    if (!title || !tags) return;
    mutate({ id: postData.length + 1, title, tags });
    e.target.reset();

    // console.log(title, tags);
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your post.."
          className="postbox"
          name="title"
        />
        <div className="tags">
          {tagsData?.map((tag) => {
            // const inputId = `tag-${tag.id}`;

            return (
              <div key={tag.id}>
                <input name={tag.name} id={tag.id} type="checkbox" />
                <label htmlFor={tag.id}>{tag.name}</label>
              </div>
            );
          })}
        </div>
        <button className="postbox">Post</button>
      </form>

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
