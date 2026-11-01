import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import logo from "../../assets/images/logo.webp";
import AdminFooter from "../../components/layout/Admin/AdminFooter";
import Button from "../../components/ui/Button";

export default function PosLogin() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const loggedInUser = await login({
        email: email.trim(),
        password,
      });

      // VALIDASI ROLE: Tolak jika akun yang dipakai adalah Super Admin!
      const userRole = loggedInUser?.role?.toLowerCase();
      if (userRole === "superadmin") {
        setError("Akun Super Admin tidak diperbolehkan login di portal POS!");
        setLoading(false);
        return;
      }

      console.log("POS USER LOGIN SUCCESS:", loggedInUser);
      navigate("/pos/dashboard", { replace: true });
    } catch (err: unknown) {
      console.error("Login POS error:", err);
      setError("Email atau kata sandi petugas loket salah.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex flex-1 items-center justify-center">
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <img src={logo} alt="D'Las Logo" className="h-[98.74px]" />

          <div className="flex flex-col items-center mt-7">
            <h6 className="text-[28px] font-semibold">
              Login Petugas POS / Loket
            </h6>

            <p className="mt-2 text-sm font-normal text-dark-gray">
              Masuk dengan akun kasir/loket untuk melayani pengunjung
            </p>
          </div>

          <div className="flex flex-col gap-3 w-129 mt-7">
            <p className="text-sm text-dark-gray">Email</p>
            <div className="flex items-center gap-1.75 w-full rounded-full border border-border bg-white focus:border-primary px-5.25">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Masukkan Email Petugas"
                required
                className="h-11 w-full text-sm outline-none transition"
              />
            </div>

            <p className="text-sm text-dark-gray">Kata Sandi</p>
            <div className="flex items-center justify-between gap-1.75 w-full rounded-full border border-border bg-white focus:border-primary px-5.25">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan Kata Sandi"
                required
                className="h-11 w-full text-sm outline-none transition"
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? (
                  <EyeOff size={20} className="text-dark-gray" />
                ) : (
                  <Eye size={20} className="text-dark-gray" />
                )}
              </button>
            </div>
          </div>

          {error && <p className="mt-2 text-sm text-red-500 font-medium">{error}</p>}

          <Button
            type="submit"
            variant="primary"
            disabled={loading}
            className="mt-7 w-129 h-12"
          >
            {loading ? "Memproses..." : "Masuk ke POS"}
          </Button>
        </form>
      </main>
      <AdminFooter />
    </div>
  );
}