import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SessionContext } from "@/SessionProvider";
import { useContext } from "react";

export function SideMenu() {
  const { currentUser } = useContext(SessionContext);
  const username = currentUser?.userName ?? "Guest";
  const useremail = currentUser?.email ?? "no email";

  return (
    <Card className="h-[140px] rounded">
      <CardHeader>
        <CardTitle>My Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="break-words whitespace-pre-wrap">Name: {username}</p>
        <p className="break-words whitespace-pre-wrap">Email: {useremail}</p>
      </CardContent>
    </Card>
  );
}
