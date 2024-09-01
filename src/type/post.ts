export interface Post {
  id: string;
  content: string;
  user_id: string;
  created_at: string;
  userId: string;
  userName: string;
  user?: {
    user_metadata: {
      name: string;
    };
  };
}
