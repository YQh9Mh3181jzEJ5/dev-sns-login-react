import { useContext } from "react";
import { SessionContext } from "../SessionProvider";

export function SideMenu() {
  const { currentUser } = useContext(SessionContext);
  const username = currentUser?.userName ?? "Guest";
  const useremail = currentUser?.email ?? "no email";

  
  return (
    <div className="bg-white p-4 rounded-lg shadow-md h-[200px] flex justify-center items-center">
      <div className="text-left">
        <h2 className="text-xl font-semibold mb-4">My Profile</h2>
        <p>Name: {username}</p>
        <p>email: {useremail}</p>
      </div>
    </div>
  );
}
