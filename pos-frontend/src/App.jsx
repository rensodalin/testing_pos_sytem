import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import { 
  Home, 
  Orders, 
  Tables, 
  Menu, 
  Dashboard,
  CustomerAuth,
  CustomerDashboard,
  CustomerMenu,
  CustomerCart,
  CustomerOrderTracking,
  Landing,
  Auth
} from "./pages";
import Header from "./components/shared/Header";
import { useSelector } from "react-redux";
import useLoadData from "./hooks/useLoadData";
import FullScreenLoader from "./components/shared/FullScreenLoader";

function Layout() {
  const isLoading = useLoadData();
  const location = useLocation();
  const hideHeaderRoutes = ["/auth", "/customer/auth", "/landing"];
  const { isAuth, isCustomer, role } = useSelector((state) => state.user);

  if (isLoading) return <FullScreenLoader />;

  return (
    <>
      {!hideHeaderRoutes.includes(location.pathname) && <Header />}

      <Routes>
        {/* Landing Page - Always accessible when not authenticated */}
        <Route
          path="/landing"
          element={
            isAuth ? (
              isCustomer ? (
                <Navigate to="/customer/dashboard" />
              ) : (
                <Navigate to="/" />
              )
            ) : (
              <Landing />
            )
          }
        />

        {/* Admin/Staff Routes */}
        <Route
          path="/"
          element={
            <ProtectedAdminRoutes>
              <Home />
            </ProtectedAdminRoutes>
          }
        />

        {/* Admin Auth - Show the actual Auth page */}
        <Route path="/auth" element={<Auth />} />
        
        <Route
          path="/orders"
          element={
            <ProtectedAdminRoutes>
              <Orders />
            </ProtectedAdminRoutes>
          }
        />
        <Route
          path="/tables"
          element={
            <ProtectedAdminRoutes>
              <Tables />
            </ProtectedAdminRoutes>
          }
        />
        <Route
          path="/menu"
          element={
            <ProtectedAdminRoutes>
              <Menu />
            </ProtectedAdminRoutes>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedAdminRoutes>
              <Dashboard />
            </ProtectedAdminRoutes>
          }
        />

        {/* Customer Routes */}
        <Route
          path="/customer/auth"
          element={
            isAuth && isCustomer ? <Navigate to="/customer/dashboard" /> : <CustomerAuth />
          }
        />
        <Route
          path="/customer/dashboard"
          element={
            <ProtectedCustomerRoutes>
              <CustomerDashboard />
            </ProtectedCustomerRoutes>
          }
        />
        <Route
          path="/customer/menu"
          element={
            <ProtectedCustomerRoutes>
              <CustomerMenu />
            </ProtectedCustomerRoutes>
          }
        />
        <Route
          path="/customer/cart"
          element={
            <ProtectedCustomerRoutes>
              <CustomerCart />
            </ProtectedCustomerRoutes>
          }
        />
        <Route
          path="/customer/track"
          element={
            <ProtectedCustomerRoutes>
              <CustomerOrderTracking />
            </ProtectedCustomerRoutes>
          }
        />

        {/* Default redirect - Show landing page for unauthenticated users */}
        <Route
          path="*"
          element={
            isAuth ? (
              isCustomer ? (
                <Navigate to="/customer/dashboard" />
              ) : (
                <Navigate to="/" />
              )
            ) : (
              <Navigate to="/landing" />
            )
          }
        />
      </Routes>
    </>
  );
}

function ProtectedAdminRoutes({ children }) {
  const { isAuth, isCustomer } = useSelector((state) => state.user);
  
  if (!isAuth) {
    return <Navigate to="/landing" />;
  }
  
  if (isCustomer) {
    return <Navigate to="/customer/dashboard" />;
  }
  
  return children;
}

function ProtectedCustomerRoutes({ children }) {
  const { isAuth, isCustomer } = useSelector((state) => state.user);
  
  if (!isAuth) {
    return <Navigate to="/customer/auth" />;
  }
  
  if (!isCustomer) {
    return <Navigate to="/" />;
  }
  
  return children;
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;


