import { BrowserRouter as Router } from "react-router-dom";
import NavigationBar from "./layouts/NavigationBar";
import Footer from "./layouts/Footer";
import AppRouter from "./routes/AppRouter";
import ScrollToTop from "./helpers/ScrollToTop";
import ProgressBar from "./components/ui/ProgressBar";
import ScrollToTopButton from "./components/common/ScrollToTopButton";
import { CartProvider } from "./context/CartContext";

function App() {
  return (
    <Router>
      <CartProvider>
        <ProgressBar />
        <div className="d-flex flex-column min-vh-100">
          <NavigationBar />
          <main className="flex-grow-1 bg-light">
            <AppRouter />
          </main>
          <Footer />
        </div>
      </CartProvider>
      <ScrollToTopButton />
      <ScrollToTop />
    </Router>
  );
}

export default App;
