import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import AuthLayout from "../../components/layout/Public/AuthLayout";
import Button from "../../components/ui/Button";
import TextField from "../../components/ui/TextField";
import { useAuth } from "../../hooks/useAuth";

export default function LoginPage() {
  const { isAuthenticated, login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const isValid = email.trim() !== "" && password.trim() !== "";

  function handleSubmit() {
    const result = login(email.trim(), password);
    if (!result.success) {
      setError(result.message ?? "Gagal masuk");
      return;
    }
    navigate("/");
  }

  return (
    <AuthLayout title="Selamat Datang Kembali" subtitle="Masuk ke akun anda untuk proses selanjutnya">
      <div className="flex w-full flex-col items-start gap-3">
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={setEmail}
          placeholder="Masukan Email"
          autoComplete="email"
        />
        <TextField
          label="Kata Sandi"
          type="password"
          value={password}
          onChange={setPassword}
          placeholder="Masukan Kata Sandi Anda"
          autoComplete="current-password"
        />
        {error && <p className="text-t5 text-danger">{error}</p>}
      </div>

      <div className="flex w-full flex-col items-center gap-[18px]">
        <Button variant="primary" fullWidth disabled={!isValid} onClick={handleSubmit}>
          Masuk
        </Button>
        <p className="text-t4 text-dark-gray">
          Tidak punya akun?{" "}
          <Link to="/register" className="text-primary">
            Daftar
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
