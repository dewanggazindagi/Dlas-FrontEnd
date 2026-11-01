import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import AuthLayout from "../../components/layout/Public/AuthLayout";
import Button from "../../components/ui/Button";
import TextField from "../../components/ui/TextField";
import { useAuth } from "../../hooks/useAuth";

export default function RegisterPage() {
  const { isAuthenticated, register } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const isValid =
    name.trim() !== "" &&
    email.trim() !== "" &&
    phone.trim() !== "" &&
    password.trim() !== "" &&
    confirmPassword.trim() !== "";

  function handleSubmit() {
    if (password !== confirmPassword) {
      setError("Konfirmasi kata sandi tidak sama");
      return;
    }
    const result = register({ name: name.trim(), email: email.trim(), phone: phone.trim(), password });
    if (!result.success) {
      setError(result.message ?? "Gagal mendaftar");
      return;
    }
    navigate("/");
  }

  return (
    <AuthLayout title="Selamat Datang Kembali" subtitle="Masuk ke akun anda untuk proses selanjutnya">
      <div className="flex w-full flex-col items-start gap-3">
        <TextField label="Nama Lengkap" value={name} onChange={setName} placeholder="Masukan nama lengkap anda" />
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={setEmail}
          placeholder="Masukan Email"
          autoComplete="email"
        />
        <TextField
          label="No. HP"
          type="tel"
          value={phone}
          onChange={setPhone}
          placeholder="Masukan No. HP"
          autoComplete="tel"
        />
        <TextField
          label="Kata Sandi"
          type="password"
          value={password}
          onChange={setPassword}
          placeholder="Masukan Kata Sandi Anda"
          autoComplete="new-password"
        />
        <TextField
          label="Konfirmasi Kata Sandi"
          type="password"
          value={confirmPassword}
          onChange={setConfirmPassword}
          placeholder="Masukan ulang kata sandi Anda"
          autoComplete="new-password"
        />
        {error && <p className="text-t5 text-danger">{error}</p>}
      </div>

      <div className="flex w-full flex-col items-center gap-4.5">
        <Button variant="primary" fullWidth disabled={!isValid} onClick={handleSubmit}>
          Daftar
        </Button>
        <p className="text-t4 text-dark-gray">
          Sudah punya akun?{" "}
          <Link to="/login" className="text-primary">
            Masuk
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
