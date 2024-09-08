import { postApi } from "@/features/posts/api/postApi";
import { Posts } from "@/type/post";
import { useCallback, useEffect, useState } from "react";

export const usePostsManager = (userId: string) => {
  const [posts, setPosts] = useState<Posts[]>([]);
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const limit = 5;

  const fetchPosts = useCallback(async (pageNum: number) => {
    setIsLoading(true);
    setError(null);
    try {
      const fetchedPosts = await postApi.find(pageNum, limit);
      setPosts(fetchedPosts);
    } catch (err) {
      setError("Failed to fetch posts. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts(page);
  }, [page, fetchPosts]);

  const createPost = async (content: string) => {
    try {
      const newPost = await postApi.create(content, userId);
      if (newPost) {
        setPosts((prevPosts) => [newPost, ...prevPosts]);
        console.log(posts);
      }
    } catch (err) {
      setError("Failed to create post. Please try again.");
    }
  };

  const deletePost = async (postId: string) => {
    try {
      await postApi.delete(postId);
      setPosts(posts.filter((post) => post.id !== postId));
    } catch (err) {
      setError("Failed to delete post. Please try again.");
    }
  };

  const moveToNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const moveToPrevPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return {
    posts,
    isLoading,
    error,
    createPost,
    deletePost,
    moveToNextPage,
    moveToPrevPage,
    hasNextPage: posts.length >= limit,
    hasPrevPage: page > 1,
  };
};
