import { useState } from "react";
import Button from "../ui/Button";
import TextField from "../ui/TextField";
import { useAuth } from "../../hooks/useAuth";

type Mode = "register" | "login";

export default function InlineAuthForm() {
  const { login, register } = useAuth();
  const [mode, setMode] = useState<Mode>("register");
  const [error, setError] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const isValid =
    mode === "login"
      ? email.trim() !== "" && password.trim() !== ""
      : name.trim() !== "" && email.trim() !== "" && phone.trim() !== "" && password.trim() !== "" && confirmPassword.trim() !== "";

  function handleSwitchMode(next: Mode) {
    setMode(next);
    setError("");
  }

  function handleSubmit() {
    if (mode === "login") {
      const result = login(email.trim(), password);
      if (!result.success) setError(result.message ?? "Gagal masuk");
      return;
    }

    if (password !== confirmPassword) {
      setError("Konfirmasi kata sandi tidak sama");
      return;
    }
    const result = register({ name: name.trim(), email: email.trim(), phone: phone.trim(), password });
    if (!result.success) setError(result.message ?? "Gagal mendaftar");
  }

  return (
    <div className="flex w-full flex-col items-start gap-4">
      <div className="flex w-full items-start justify-center gap-1 rounded-full border border-border bg-white p-1 drop-shadow-[2px_3px_7px_rgba(0,0,0,0.05)]">
        <button
          type="button"
          onClick={() => handleSwitchMode("register")}
          className={`flex flex-1 cursor-pointer items-center justify-center rounded-full px-4 py-2.5 text-t4 ${
            mode === "register" ? "border border-border bg-soft-gray font-semibold text-black" : "font-medium text-black"
          }`}
        >
          Tidak Punya Akun
        </button>
        <button
          type="button"
          onClick={() => handleSwitchMode("login")}
          className={`flex flex-1 cursor-pointer items-center justify-center rounded-full px-4 py-2.5 text-t4 ${
            mode === "login" ? "border border-border bg-soft-gray font-semibold text-black" : "font-medium text-black"
          }`}
        >
          Punya Akun
        </button>
      </div>

      <div className="flex w-full flex-col items-start gap-5 px-1.5">
        {mode === "register" ? (
          <>
            <TextField label="Nama Lengkap" value={name} onChange={setName} placeholder="Masukan nama lengkap anda" />
            <TextField label="Email" type="email" value={email} onChange={setEmail} placeholder="Masukan email" />
            <TextField label="No. HP" type="tel" value={phone} onChange={setPhone} placeholder="Masukan No. HP" />
            <TextField
              label="Kata Sandi"
              type="password"
              value={password}
              onChange={setPassword}
              placeholder="Masukan kata sandi baru anda"
            />
            <TextField
              label="Konfirmasi Kata Sandi"
              type="password"
              value={confirmPassword}
              onChange={setConfirmPassword}
              placeholder="Masukan ulang kata sandi anda"
            />
          </>
        ) : (
          <>
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
          </>
        )}
        {error && <p className="text-t5 text-danger">{error}</p>}
      </div>

      <Button variant="primary" fullWidth disabled={!isValid} onClick={handleSubmit}>
        Lanjutkan
      </Button>
    </div>
  );
}
