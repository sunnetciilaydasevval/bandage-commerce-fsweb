import "./i18n/i18n";

import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { useDispatch } from "react-redux";

import PageContent from "./layout/PageContent";

import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Product from "./pages/Product";
import Favorites from "./pages/Favorites";
import ShoppingCart from "./pages/ShoppingCart";
import Contact from "./pages/Contact";
import Team from "./pages/Team";
import AboutUs from "./pages/AboutUs";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import CreateOrder from "./pages/CreateOrder";
import PreviousOrders from "./pages/PreviousOrders";

import {
  fetchCategories,
} from "./redux/thunks/categoryThunk";

function ProtectedRoute({ children }) {
  const location = useLocation();

  const token = localStorage.getItem("token");

  if (!token) {
    return (
      <Navigate
        to="/login"
        replace
        state={{
          from: location.pathname,
        }}
      />
    );
  }

  return children;
}

function AppRoutes() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <PageContent>
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/shop"
          element={<Shop />}
        />

        <Route
          path="/shop/:gender/:categoryName/:categoryId"
          element={<Shop />}
        />

        <Route
          path="/shop/:gender/:categoryName/:categoryId/:productNameSlug/:productId"
          element={<Product />}
        />

        <Route
          path="/cart"
          element={<ShoppingCart />}
        />

        <Route
          path="/favorites"
          element={<Favorites />}
        />

        <Route
          path="/contact"
          element={<Contact />}
        />

        <Route
          path="/team"
          element={<Team />}
        />

        <Route
          path="/about"
          element={<AboutUs />}
        />

        <Route
          path="/signup"
          element={<SignUp />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/create-order"
          element={
            <ProtectedRoute>
              <CreateOrder />
            </ProtectedRoute>
          }
        />

        <Route
          path="/previous-orders"
          element={
            <ProtectedRoute>
              <PreviousOrders />
            </ProtectedRoute>
          }
        />

        <Route
          path="*"
          element={
            <Navigate
              to="/"
              replace
            />
          }
        />
      </Routes>
    </PageContent>
  );
}

export default function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}
