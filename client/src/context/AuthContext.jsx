import {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

import Cookies from "js-cookie";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const storedUser = Cookies.get("user");

      if (storedUser) {
        const parsedUser =
          JSON.parse(storedUser);

        setUser(parsedUser);
      }
    } catch (error) {
      console.error(
        "Auth Parse Error:",
        error
      );

      Cookies.remove("user");
    } finally {
      setLoading(false);
    }
  }, []);

  const loginUser = (
    userData,
    token
  ) => {
    try {
      Cookies.set("token", token, {
        expires: 7,
      });

      Cookies.set(
        "user",
        JSON.stringify(userData),
        {
          expires: 7,
        }
      );

      setUser(userData);
    } catch (error) {
      console.error(
        "Login Save Error:",
        error
      );
    }
  };

  const logoutUser = () => {
    try {
      Cookies.remove("token");

      Cookies.remove("user");

      setUser(null);
    } catch (error) {
      console.error(
        "Logout Error:",
        error
      );
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        loginUser,
        logoutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};