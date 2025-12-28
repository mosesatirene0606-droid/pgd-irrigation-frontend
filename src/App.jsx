//App.jsx
import { AuthProvider } from "./api/context/AuthContext";
import PGDMockups from "./PGDMockups";

function App() {
  return (
    <AuthProvider>
      <PGDMockups />
    </AuthProvider>
  );
}

export default App;