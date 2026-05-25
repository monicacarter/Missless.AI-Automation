import Navbar from '../components/Navbar/index.js';
import Footer from '../components/Footer/index.js';

/**
 * MainLayout — site shell wrapping every page with Navbar + Footer.
 * Single-page site, so children render directly inside <main>.
 */
export default function MainLayout({ children }) {
  return (
    <>
      <Navbar />
      <main id="main-content">{children}</main>
      <Footer />
    </>
  );
}
