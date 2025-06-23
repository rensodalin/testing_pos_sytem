import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { removeUser, setUser } from "../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";

const useLoadData = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Mock user data for frontend-only operation
    const mockUser = { _id: 'mock', name: 'Mock User', email: 'mock@example.com', phone: '0000000000', role: 'admin' };
    dispatch(setUser(mockUser));
    setIsLoading(false);
  }, [dispatch]);

  return isLoading;
};

export default useLoadData;
