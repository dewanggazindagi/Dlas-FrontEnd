import AppRoutes from "./routes/AppRoutes";
import { AuthProvider } from "./context/AuthContext";
import { UserAuthProvider } from "./context/UserAuthContext";

export default function App() {
  return (
    <AuthProvider>
      <UserAuthProvider>
        <AppRoutes />
      </UserAuthProvider>
    </AuthProvider>
  );
}
