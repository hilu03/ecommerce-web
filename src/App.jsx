import { Toaster } from "./components/ui/sonner";
import AppRoutes from "./routes/AppRoutes";


function App() {
  return (
    <>
      <AppRoutes />
      <Toaster richColors />
    </>
  );
}

export default App
