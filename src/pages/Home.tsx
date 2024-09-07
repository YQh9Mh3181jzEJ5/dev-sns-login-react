import { Pagination } from "@/components/Pagenation";
import { PostList } from "@/components/PostList";
import { SideMenu } from "@/components/SideMenu";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { authRepository } from "@/repositories/auth";
import { postRepository } from "@/repositories/post";
import { SessionContext } from "@/SessionProvider";
import { Post } from "@/type/post";
import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
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
    try {
      await authRepository.signout();
      setCurrentUser(null);
    } catch (error) {
      console.error("ログアウト中にエラーが発生しました:", error);
      // エラーが発生しても、アプリケーションの状態をリセットする
      setCurrentUser(null);
    }
  };

  return (
    <div className="relative min-h-screen">
      {/* 背景画像とオーバーレイ */}
      <div className="fixed inset-0 z-0">
        <img
          src="/rome.jpg"
          alt="background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30 backdrop-filter backdrop-blur-sm"></div>
      </div>

      {/* ヘッダー */}
      <header className="fixed top-0 left-0 right-0 z-20 bg-white">
        <div className="container mx-auto p-4">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-slate-800">SNS APP</h1>
            <Button variant="outline" onClick={signout}>
              ログアウト
            </Button>
          </div>
        </div>
      </header>

      {/* メインコンテンツ */}
      <div className="relative z-1 pt-24">
        <div className="container mx-auto max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-8 z-10">
          <div className="md:col-span-2 space-y-8">
            <Card className="rounded">
              <CardHeader>
                <CardTitle>新規投稿</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="いまをつぶやこう！"
                  onChange={(event) => setContent(event.target.value)}
                  value={content}
                />
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  onClick={createPost}
                  disabled={content === ""}
                >
                  投稿する
                </Button>
              </CardFooter>
            </Card>
            <div className="space-y-4">
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
