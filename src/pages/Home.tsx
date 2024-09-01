import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { SessionContext } from "../SessionProvider";
import { SideMenu } from "../components/SideMenu";
import { postRepository } from "../repositories/post";
import { PostList } from "../components/PostList";
import { Post } from "../type/post";
import { Pagination } from "../components/Pagenation";
import { authRepository } from "../repositories/auth";
const limit: number = 5;
function Home() {
  const [content, setContent] = useState<string>("");
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState<number>(1);
  const { currentUser, setCurrentUser } = useContext(SessionContext);
  if (currentUser === null) return <Navigate replace to={"/signin"} />;
  const createPost = async () => {
    const post = await postRepository.create(content, currentUser.id);
    if (post) {
      setPosts([
        {
          ...post,
          userId: currentUser.id,
          userName: currentUser.userName,
        } as Post,
        ...posts,
      ]);
      setContent("");
    }
  };

  const fetchPosts = async (page: number) => {
    const posts = await postRepository.find(page, limit);
    setPosts(posts);
  };

  useEffect(() => {
    fetchPosts(page);
  }, [page]);

  const moveToNextPage = () => {
    const nextPage = page + 1;
    fetchPosts(nextPage);
    setPage(nextPage);
  };

  const moveToPrevPage = () => {
    const prevPage = Math.max(page - 1, 1);
    fetchPosts(prevPage);
    setPage(prevPage);
  };

  const deletePost = async (postId: string) => {
    await postRepository.delete(postId);
    const newPosts = posts.filter((post) => post.id !== postId);
    setPosts(newPosts);
  };

  const signout = async () => {
    await authRepository.signout();
    setCurrentUser(null);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-[#34D399] p-4">
        <div className="container mx-auto flex items-center justify-between">
          <h1 className="text-3xl font-bold text-white">SNS APP</h1>
          <button className="text-white hover:text-red-600" onClick={signout}>
            ログアウト
          </button>
        </div>
      </header>
      <div className="container mx-auto mt-6 p-4">
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <textarea
                className="w-full p-2 mb-4 border-2 border-gray-200 rounded-md"
                placeholder="What's on your mind?"
                onChange={(event) => setContent(event.target.value)}
                value={content}
              />
              <button
                className="bg-[#34D399] text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={createPost}
                disabled={content === ""}
              >
                Post
              </button>
            </div>
            <div className="mt-4">
              {posts.map((post) => (
                <PostList key={post.id} post={post} onDelete={deletePost} />
              ))}
            </div>
            <Pagination
              onPrev={page > 1 ? moveToPrevPage : null}
              onNext={posts.length >= limit ? moveToNextPage : null}
            />
          </div>
          <SideMenu />
        </div>
      </div>
    </div>
  );
}

export default Home;
