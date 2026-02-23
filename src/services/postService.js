import { createPost } from "../controllers/postController.js";
import { countAllPosts, findAllPosts, deletePostById } from "../repositories/postRepository.js";
export const createPostService = async (createPostObejct) => {
    const caption = createPostObejct.caption?.trim();
    const image = createPostObejct.image;
     // const user = createPostObejct.user; add later
      const post = await createPost(caption, image);
      return post;
}
export const getAllPostsService = async (offset, limit) => {
    const posts = await findAllPosts(offset, limit);

    // Calculate total number of posts and total number of pages
    const totalDocuments = await countAllPosts();

    const totalPages = Math.ceil(totalDocuments / limit);

    return {
        posts, totalPages, totalDocuments
    }

}

export const deletePostService = async (id) => {
    // call the repository function
    const response = await deletePostById(id);
    return response;
}