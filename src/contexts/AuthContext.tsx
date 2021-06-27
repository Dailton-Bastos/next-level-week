import React from 'react';
import { auth, firebase } from '../services/firebase';

interface AuthContextProps {
  children: React.ReactNode;
}

interface User {
  id: string;
  name: string;
  avatar: string;
}

interface AuthContextTypes {
  user: User | undefined;
  signInWithGoogle: () => Promise<void>;
  signOutApp: () => Promise<void>;
}

export const AuthContext = React.createContext({} as AuthContextTypes);

export const AuthStorage = ({ children }: AuthContextProps) => {
  const [user, setUser] = React.useState<User>();

  async function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();

    const result = await auth.signInWithPopup(provider);

    if (result.user) {
      const { displayName, photoURL, uid } = result.user;

      if (!displayName || !photoURL) {
        throw new Error('Missing information from Google Account.');
      }

      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL,
      });
    }
  }

  async function signOutApp() {
    try {
      await firebase.auth().signOut();
      setUser(undefined);
    } catch (error) {
      throw new Error('An error happened.');
    }
  }

  React.useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const { displayName, photoURL, uid } = user;

        if (!displayName || !photoURL) {
          throw new Error('Missing information from Google Account.');
        }

        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL,
        });
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, signInWithGoogle, signOutApp }}>
      {children}
    </AuthContext.Provider>
  );
};
