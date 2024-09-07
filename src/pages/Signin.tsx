import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { authRepository } from "@/repositories/auth";
import { SessionContext } from "@/SessionProvider";
import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";

function Signin() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { currentUser, setCurrentUser } = useContext(SessionContext);

  const signin = async () => {
    try {
      const user = await authRepository.signin({ email, password });
      setCurrentUser(user);
    } catch (error) {
      console.error("Sign in エラー:", error);
    }
  };

  if (currentUser !== null) return <Navigate replace to={"/"} />;

  return (
    <div className="relative h-screen flex items-center">
      {/* 背景画像 */}
      <div className="absolute inset-0 z-0">
        <img
          src="/rome.jpg"
          alt="background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30 backdrop-filter backdrop-blur-sm"></div>
      </div>

      {/* コンテンツ */}
      <div className="relative z-10 w-full flex justify-evenly container mx-auto ">
        {/* 左：文字列 */}
        <div className="flex items-center">
          <h2 className="text-7xl font-bold text-white">いま、はじめよう。</h2>
        </div>

        {/* 右：ログイン画面 */}
        <div className="flex items-center justify-center v">
          <Card className="w-full max-w-md bg-white bg-transparent shadow-none border-none rounded-none">
            <CardHeader>
              <h2 className="text-4xl font-bold mb-2 text-white">
                SNS APPにログイン
              </h2>
            </CardHeader>
            <CardContent className="space-y-8">
              <Input
                onChange={(event) => setEmail(event.target.value)}
                placeholder="メールアドレス"
                required
                type="email"
                className="text-white placeholder:text-gray-400"
              />
              <Input
                onChange={(event) => setPassword(event.target.value)}
                placeholder="パスワード"
                required
                type="password"
                className="text-white placeholder:text-gray-400"
              />
              <Button
                onClick={signin}
                disabled={!email || !password}
                className="w-full"
              >
                ログイン
              </Button>
            </CardContent>
            <p className="text-sm text-gray-200 text-center">
              パスワードを忘れた場合は、
              {/* TODO: パスワードリセット機能の実装 */}
              <Link to="/" className="underline">
                こちら
              </Link>
            </p>
            <div className="p-4">
              <Separator className="my-5" />
            </div>
            <CardFooter className="justify-center">
              <div>
                <Link to="/signup">
                  <Button variant="outline" className="w-full">
                    新規登録する
                  </Button>
                </Link>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Signin;
