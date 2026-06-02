import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout.jsx";
import Home from "./pages/Home.jsx";
import BookDemo from "./pages/BookDemo.jsx";
import Pricing from "./pages/Pricing.jsx";

/**
 * App – single-page site. MainLayout wraps the navbar/footer; Home renders
 * the 11 marketing sections in order.
 */
export default function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <MainLayout>
            <Home />
          </MainLayout>
        }
      />

      <Route
        path="/book-a-demo"
        element={
          <MainLayout>
            <BookDemo />
          </MainLayout>
        }
      />

      <Route
        path="/pricing"
        element={
          <MainLayout>
            <Pricing />
          </MainLayout>
        }
      />
    </Routes>
  );
}