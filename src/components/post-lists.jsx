import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { addPost, fetchPosts, fetchTags } from "../api/api";
import { useState } from "react";

const PostLists = () => {
  const [page, setPage] = useState(1);

  const {
    data: postData = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["posts", { page }],
    queryFn: () => fetchPosts(page),
    staleTime: 1000 * 60 * 5,
    placeholderData: keepPreviousData,
    // gcTime: 0,
    // refetchInterval: 1000 * 5,
  });
  //   console.log(data, isLoading, status, isError, error);

  const { data: tagsData } = useQuery({
    queryKey: ["tags"],
    queryFn: fetchTags,
    staleTime: Infinity,
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
        exact: true,
        //   predicate:(query)=>{
        //     query.queryKey[0] ==='post' && query.queryKey[1].page >=2
        //   }
      });
    },

    // onError:(error,variables,context)=>{},
    // onSettled:(data,error,variables,context)=>{}
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const title = formData.get("title");
    const tags = Array.from(formData.keys()).filter(
      (key) => formData.get(key) === "on",
    );

    if (!title || !tags) return;
    mutate({ id: postData?.data?.length + 1, title, tags });
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

      {isLoading && isPending && <p>Loading...</p>}
      {isError && <p>{error?.message}</p>}
      {isPostError && <p onClick={() => reset()}>Unable to Post</p>}

      <div className="pages">
        <button
          onClick={() => setPage((oldPage) => Math.max(oldPage - 1, 0))}
          disabled={!postData?.prev}
        >
          Previous Page
        </button>
        <span>{page}</span>
        <button
          onClick={() => setPage((oldPage) => oldPage + 1)}
          disabled={!postData?.next}
        >
          Next Page
        </button>
      </div>

      {postData?.data?.map((post) => {
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
