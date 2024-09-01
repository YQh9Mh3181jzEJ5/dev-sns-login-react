import { supabase } from "../lib/supabase";
import { Post } from "../type/post";

export const postRepository = {
  async create(
    content: string,
    userId: string
  ): Promise<Post | null | undefined> {
    const { data, error } = await supabase.from("posts").insert([
      {
        content,
        user_id: userId,
      },
    ]);

    if (error) throw new Error(error.message);
    if (data !== null) return data[0];
  },
  async find(page: number, limit: number) {
    page = isNaN(page) || page < 1 ? 1 : page;
    const start = (page - 1) * limit;
    const end = start + limit - 1;
    const { data, error } = await supabase
      .from("posts_view")
      .select("*")
      .range(start, end)
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);

    return data!.map((post) => {
      return {
        ...post,
        userId: post.user_id,
        userName: post.user_metadata?.name || "Unknown User",
      };
    });
  },
};
