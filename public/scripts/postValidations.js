export function validatePostTitle(title, posts) {
    if (!title || title.trim() === '') {
        return { error: "Post title cannot be empty." };
    }
    
    const existingPost = posts.find(post => post.title === title);
    if (existingPost) {
        return { error: "A post with the same title already exists." };
    }
    
    return { error: null };
}
