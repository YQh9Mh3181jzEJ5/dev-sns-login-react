import { supabase } from "../lib/supabase";

interface SignUpParams {
  name: string;
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
    return { ...data.user, userName: data.user?.user_metadata.name };
  },
};
