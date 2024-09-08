import { usePostsManager } from "@/hooks/usePostsManager";
import React, { useContext } from "react";
import { NewPostForm } from "./NewPostForm";

import { SessionContext } from "@/SessionProvider";
import { PostListContainer } from "./PostListContainer";

export const PostsSection: React.FC = () => {
  const { currentUser } = useContext(SessionContext);

  if (!currentUser) {
    throw new Error("User must be logged in to view posts");
  }

  const {
    posts,
    createPost,
    deletePost,
    moveToNextPage,
    moveToPrevPage,
    hasNextPage,
    hasPrevPage,
  } = usePostsManager(currentUser.id);

  return (
    <div className="md:col-span-2 space-y-8">
      <NewPostForm onSubmit={createPost} />
      <PostListContainer
        posts={posts}
        onDelete={deletePost}
        currentUserId={currentUser.id}
        onNextPage={moveToNextPage}
        onPrevPage={moveToPrevPage}
        hasNextPage={hasNextPage}
        hasPrevPage={hasPrevPage}
      />
    </div>
  );
};
