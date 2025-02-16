import React, { createContext, useState , useEffect} from 'react';

// Create a new context
export const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Global state (example: user)

  useEffect(() => {
    const token = localStorage.getItem("user");
    if (token) {
      setUser(true);
    }
  }, []);
  const loginUser = (userData) => {
    setUser(userData); // Example function to update user
  };

  const logoutUser = () => {
    setUser(null); // Function to clear user data
  };

  // Provide state and functions to the rest of the app
  return (
    <AppContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
