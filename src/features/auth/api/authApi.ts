import { supabase } from "@/lib/supabase";
import { AuthCredentials, SignUpCredentials, User } from "@/type/settion";

export const authApi = {
  async signup({ name, email, password }: SignUpCredentials) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name } },
    });

    if (error !== null) throw new Error(error.message);

    return {
      ...data.user,
      userName: data.user?.user_metadata.name,
    };
  },

  async signin({ email, password }: AuthCredentials) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw new Error(error.message);

    return {
      ...data.user,
      userName: data.user?.user_metadata.name,
    };
  },

  async getCurrentUser(): Promise<User | null> {
    try {
      const { data, error } = await supabase.auth.getSession();
      if (error) throw error;
      if (!data.session) return null;
      return {
        id: data.session.user.id,
        name: data.session.user.user_metadata.name || "",
        email: data.session.user.email || "",
        userName: data.session.user.user_metadata.name || "",
      };
    } catch (error) {
      console.error("Error getting current user:", error);
      return null;
    }
  },
  async signout(): Promise<void> {
    const { error } = await supabase.auth.signOut();
    if (error) throw new Error(error.message);
  },
};
