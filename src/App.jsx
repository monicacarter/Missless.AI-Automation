import MainLayout from './layouts/MainLayout.jsx';
import Home from './pages/Home.jsx';

/**
 * App — single-page site. MainLayout wraps the navbar/footer; Home renders
 * the 11 marketing sections in order.
 */
export default function App() {
  return (
    <MainLayout>
      <Home />
    </MainLayout>
  );
}
