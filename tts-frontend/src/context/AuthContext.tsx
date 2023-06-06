import React, { createContext, useState } from 'react';

export type User = {
  discordId: string;
  username: string;
  token: string
};

type AuthContextType = {
  user: User | null;
  setUserHandler: (user: User | null) => void;
  setUserSignout: () => void;
};

const initialAuthContext: AuthContextType = {
  user: null,
  setUserHandler: () => {},
  setUserSignout: () => {}
}

export type Props = {
    children?: React.ReactNode;
};

const AuthContext = createContext(initialAuthContext);

const AuthContextProvider = ({ children }: Props) => {
  const storedUser = localStorage.getItem('user');
  const initialUser = storedUser ? JSON.parse(storedUser) : null;
  const [user, setUser] = useState<User | null>(initialUser);

  const setUserSignout = () => {
    setUserHandler(null);
  }

  const setUserHandler = (user: User | null) => {
    setUser(user);
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  };
  const authContextValues: AuthContextType = {
    user,
    setUserHandler,
    setUserSignout
  };

  return (
    <AuthContext.Provider value={authContextValues}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };