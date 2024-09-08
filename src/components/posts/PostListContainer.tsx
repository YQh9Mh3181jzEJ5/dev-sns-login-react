import { Posts } from "@/type/post";
import Pagination from "./Pagenation";
import { PostList } from "./PostList";

interface PostListContainerProps {
  currentUserId: string;
  posts: Posts[];
  onDelete: (postId: string) => Promise<void>;
  onNextPage: () => void;
  onPrevPage: () => void;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export function PostListContainer({
  currentUserId,
  posts,
  onDelete,
  onNextPage,
  onPrevPage,
  hasNextPage,
  hasPrevPage,
}: PostListContainerProps) {
  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <PostList
          key={post.id}
          post={post}
          onDelete={onDelete}
          currentUserId={currentUserId}
        />
      ))}
      <Pagination
        onPrev={hasPrevPage ? onPrevPage : null}
        onNext={hasNextPage ? onNextPage : null}
      />
    </div>
  );
}
