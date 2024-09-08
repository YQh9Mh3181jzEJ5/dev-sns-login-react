import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SessionContext } from "@/SessionProvider";
import { useContext } from "react";
import { Button } from "../ui/button";

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date
    .toLocaleString("ja-JP", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })
    .replace(/\//g, "-");
};

export function PostList(props: any) {
  const { currentUser } = useContext(SessionContext);

  return (
    <Card className="rounded">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="font-normal">{props.post.userName}</span>
          <span className="text-gray-400 text-sm font-normal">
            {formatDate(props.post.created_at)}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700 break-words whitespace-pre-wrap">
          {props.post.content}
        </p>
      </CardContent>
      {currentUser!.id === props.post.userId && (
        <CardFooter>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => props.onDelete(props.post.id)}
          >
            削除
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
