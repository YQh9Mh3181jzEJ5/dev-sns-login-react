export interface Posts {
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

// export interface CreatePostDto {
//   content: string;
//   userId: string;
// }
