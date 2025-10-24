import NavigationBar from "./layouts/NavigationBar";
import Footer from "./layouts/Footer";
import AppRouter from "./routes/AppRouter";

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <NavigationBar />
      <main className="flex-grow-1 bg-light">
        <AppRouter />
      </main>
      <Footer />
    </div>
  );
}

export default App;
