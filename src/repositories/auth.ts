import { supabase } from "../lib/supabase";
import { SessionUser } from "../type/settion";

interface SignUpParams {
  name: string;
  email: string;
  password: string;
}

interface SignInParams {
  email: string;
  password: string;
}

export const authRepository = {
  async signup({ name, email, password }: SignUpParams) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name } },
    });

    if (error !== null) throw new Error(error.message);
    return {
      id: data.user?.id || "",
      name: data.user?.user_metadata.name || "",
      userName: data.user?.user_metadata.name || "",
    };
  },

  async signin({ email, password }: SignInParams) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw new Error(error.message);
    return {
      id: data.user?.id || "",
      name: data.user?.user_metadata.name || "",
      userName: data.user?.user_metadata.name || "",
    };
  },
  async getCurrentUser(): Promise<SessionUser | null> {
    try {
      const { data, error } = await supabase.auth.getSession();
      if (error) throw error;
      if (!data.session) return null;
      return {
        id: data.session.user.id,
        name: data.session.user.user_metadata.name || "",
        userName: data.session.user.user_metadata.name || "",
      };
    } catch (error) {
      console.error("Error getting current user:", error);
      return null;
    }
  },
};
