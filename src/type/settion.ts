export interface User {
  id: string;
  name: string;
  email: string | undefined;
  userName: string | undefined;
}

export interface AuthCredentials {
  email: string;
  password: string;
}

export interface SignUpCredentials extends AuthCredentials {
  name: string;
}
