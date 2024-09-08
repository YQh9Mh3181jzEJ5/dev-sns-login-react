import { Header } from "@/components/Header";
import { PostsSection } from "@/components/posts/PostsSection";
import { SideMenu } from "@/components/posts/SideMenu";
import { authApi } from "@/features/auth/api/authApi";
import { SessionContext } from "@/SessionProvider";
import { useContext } from "react";
import { Navigate } from "react-router-dom";

function Home() {
  const { currentUser, setCurrentUser } = useContext(SessionContext);
  if (currentUser === null) return <Navigate replace to={"/signin"} />;

  const signout = async () => {
    try {
      await authApi.signout();
      setCurrentUser(null);
    } catch (error) {
      console.error("ログアウト中にエラーが発生しました:", error);
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
      <Header onSignout={signout} />

      {/* メインコンテンツ */}
      <div className="relative z-1 pt-24">
        <div className="container mx-auto max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-8 z-10">
          <PostsSection />
          <SideMenu />
        </div>
      </div>
    </div>
  );
}

export default Home;
