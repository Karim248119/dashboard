import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="App">
      <NavBar />

      <div className="container mx-auto my-4">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
