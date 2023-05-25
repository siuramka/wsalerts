import React, { createContext, useState } from 'react';

export type User = {
  discordId: string;
  username: string;
  token: string
};

type AuthContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
};

const initialAuthContext: AuthContextType = {
  user: null,
  setUser: () => {},    
}

type Props = {
    children?: React.ReactNode;
};

const AuthContext = createContext(initialAuthContext);

const AuthContextProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(null);


  const authContextValues: AuthContextType = {
    user,
    setUser
  };

  return (
    <AuthContext.Provider value={authContextValues}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };