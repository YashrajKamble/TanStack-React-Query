const fetchPosts = async (page) => {
    const response = await fetch(
        `http://localhost:3000/posts?_sort=-id&${page ? `_page=${page}&_per_page=5` : ""
        }`
    );

    if (!response.ok) {
        throw new Error(`Failed to fetch posts. Status: ${response.status}`);
    }

    const postData = await response.json();
    return postData;
};

const fetchTags = async () => {
    const response = await fetch("http://localhost:3000/tags");
    if (!response.ok) {
        throw new Error(`Failed to fetch tags. Status: ${response.status}`);
    }
    const tagsData = await response.json();
    return tagsData;
};

const addPost = async (post) => {
    const response = await fetch("http://localhost:3000/posts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(post),
    });

    if (!response.ok) {
        throw new Error(`Failed to post. Status: ${response.status}`);
    }

    return response.json();
};

export { fetchPosts, fetchTags, addPost };