import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

interface NewPostFormProps {
  onSubmit: (content: string) => void;
}

export function NewPostForm({ onSubmit }: NewPostFormProps) {
  const [content, setContent] = useState<string>("");

  const handleSubmit = () => {
    onSubmit(content);
    setContent("");
  };

  return (
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
          onClick={handleSubmit}
          disabled={content === ""}
        >
          投稿する
        </Button>
      </CardFooter>
    </Card>
  );
}
