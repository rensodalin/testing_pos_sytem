import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { removeUser, setUser } from "../redux/slices/userSlice";

const useLoadData = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const savedUser = localStorage.getItem('cafio_user');
    
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        dispatch(setUser(userData));
      } catch (error) {
        console.error("Error parsing saved user data:", error);
        localStorage.removeItem('cafio_user');
        // Don't redirect, let the routing handle it
      }
    }
    // If no saved user, don't do anything - let the routing handle navigation
    
    setIsLoading(false);
  }, [dispatch]);

  return isLoading;
};

export default useLoadData;
