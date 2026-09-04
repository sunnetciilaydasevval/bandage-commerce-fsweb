import "./i18n/i18n";

import { useEffect, useRef } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import {
  useDispatch,
  useSelector,
} from "react-redux";
import { useTranslation } from "react-i18next";

import PageContent from "./layout/PageContent";
import ProtectedRoute from "./components/ProtectedRoute";

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

import {
  fetchProducts,
} from "./redux/thunks/productThunk";

import {
  verifyToken,
} from "./redux/thunks/clientThunks";

function AppRoutes() {
  const dispatch = useDispatch();
  const initializationStarted = useRef(false);
  const { t } = useTranslation();

  const authChecked = useSelector(
    (state) =>
      state.client?.authChecked
  );

  useEffect(() => {
    if (initializationStarted.current) {
      return;
    }

    initializationStarted.current = true;

    dispatch(
      verifyToken()
    );

    dispatch(
      fetchCategories()
    );

    dispatch(
      fetchProducts({
        limit: 25,
        offset: 0,
      })
    );
  }, [dispatch]);

  /*
   * Token verification tamamlanmadan
   * route'ları render etmiyoruz.
   *
   * Böylece:
   *
   * App açılır
   *    ↓
   * /verify
   *    ↓
   * user Redux'a
   *    ↓
   * Route'lar render edilir
   */
  if (!authChecked) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white font-['Montserrat',sans-serif]">
        <p className="text-sm font-bold text-[#737373]">
          {t("common.loading")}
        </p>
      </div>
    );
  }

  return (
    <PageContent>
      <Routes>

        {/* PUBLIC ROUTES */}

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
          path="/product/:productNameSlug/:productId"
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

        {/* PROTECTED ROUTES */}

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
          path="/orders"
          element={
            <ProtectedRoute>
              <PreviousOrders />
            </ProtectedRoute>
          }
        />

        {/* FALLBACK */}

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
