import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState} from "react";
import { auth } from "../Firebase/Firebase";

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{user}}>
      {children}
    </AuthContext.Provider>
  );
};

export {AuthProvider,AuthContext};
