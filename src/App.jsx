import { BrowserRouter as Router } from "react-router-dom";
import NavigationBar from "./layouts/NavigationBar";
import Footer from "./layouts/Footer";
import AppRouter from "./routes/AppRouter";
import ScrollToTop from "./helpers/ScrollToTop";
import ProgressBar from "./components/ui/ProgressBar";

function App() {
  return (
    <Router>
      <ProgressBar />
      <div className="d-flex flex-column min-vh-100">
        <NavigationBar />
        <main className="flex-grow-1 bg-light">
          <AppRouter />
        </main>
        <Footer />
      </div>

      <ScrollToTop />
    </Router>
  );
}

export default App;
