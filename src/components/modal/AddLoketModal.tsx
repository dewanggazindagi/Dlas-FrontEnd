/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";

import Modal from "../ui/Modal";
import Button from "../ui/Button";

import { createLoketUser } from "../../services/api/userService";

interface AddLoketModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
}

// Syarat password — sesuaikan kalau ternyata backend punya aturan berbeda
const PASSWORD_MIN_LENGTH = 8;

function getPasswordError(password: string): string | null {
  if (password.length < PASSWORD_MIN_LENGTH) {
    return `Kata sandi minimal ${PASSWORD_MIN_LENGTH} karakter.`;
  }
  if (!/[A-Z]/.test(password)) {
    return "Kata sandi harus mengandung minimal 1 huruf besar.";
  }
  if (!/[a-z]/.test(password)) {
    return "Kata sandi harus mengandung minimal 1 huruf kecil.";
  }
  if (!/[0-9]/.test(password)) {
    return "Kata sandi harus mengandung minimal 1 angka.";
  }
  if (!/[^A-Za-z0-9]/.test(password)) {
    return "Kata sandi harus mengandung minimal 1 karakter simbol (!@#$%, dst).";
  }
  return null;
}

export default function AddLoketModal({
  open,
  onClose,
  onSubmit,
}: AddLoketModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [passwordTouched, setPasswordTouched] = useState(false);

  const passwordError = getPasswordError(password);

  const resetForm = () => {
    setName("");
    setEmail("");
    setPassword("");
    setError(null);
    setPasswordTouched(false);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPasswordTouched(true);

    if (!name.trim() || !email.trim() || !password.trim()) {
      return;
    }

    if (passwordError) {
      return; // jangan submit kalau validasi lokal gagal
    }

    try {
      setSubmitting(true);
      setError(null);

      await createLoketUser({
        fullName: name.trim(),
        email: email.trim(),
        password,
      });

      onSubmit();
      resetForm();
      onClose();
    } catch (err) {
      setError(extractErrorMessage(err));
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <Modal open={open} onClose={handleClose} width="max-w-[390px] p-3">
      <div className="p-2">
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-black">
            Tambah Pengguna Loket
          </h2>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="rounded-xl border border-border bg-white p-3">
            <div className="mb-4">
              <label
                htmlFor="loket-name"
                className="mb-1.5 block text-sm text-dark-gray"
              >
                Nama Pengguna
              </label>
              <input
                id="loket-name"
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Masukan nama pengguna"
                disabled={submitting}
                className="h-10 w-full rounded-full border border-border bg-white px-4 text-md outline-none transition placeholder:text-dark-gray focus:border-primary focus:ring-1 focus:ring-primary disabled:opacity-60"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="loket-email"
                className="mb-1.5 block text-sm text-dark-gray"
              >
                Email
              </label>
              <input
                id="loket-email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Masukan email pengguna"
                disabled={submitting}
                className="h-10 w-full rounded-full border border-border bg-white px-4 text-md outline-none transition placeholder:text-dark-gray focus:border-primary focus:ring-1 focus:ring-primary disabled:opacity-60"
              />
            </div>

            <div>
              <label
                htmlFor="loket-password"
                className="mb-1.5 block text-sm text-dark-gray"
              >
                Kata Sandi
              </label>
              <input
                id="loket-password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                onBlur={() => setPasswordTouched(true)}
                placeholder="Masukan kata sandi"
                disabled={submitting}
                className={`h-10 w-full rounded-full border bg-white px-4 text-md outline-none transition placeholder:text-dark-gray focus:ring-1 disabled:opacity-60 ${
                  passwordTouched && passwordError ?
                    "border-red-400 focus:border-red-400 focus:ring-red-400"
                  : "border-border focus:border-primary focus:ring-primary"
                }`}
              />

              {/* Keterangan syarat password */}
              {passwordTouched && passwordError ?
                <p className="mt-1.5 text-xs text-red-500">{passwordError}</p>
              : <p className="mt-1.5 text-xs text-dark-gray">
                  Minimal {PASSWORD_MIN_LENGTH} karakter, kombinasi huruf besar,
                  huruf kecil, angka, dan simbol.
                </p>
              }
            </div>
          </div>

          {error && <p className="mt-2 text-sm text-red-500">{error}</p>}

          <Button
            type="submit"
            variant="primary"
            disabled={submitting}
            className="mt-3 h-10 w-full rounded-full font-semibold disabled:opacity-60"
          >
            {submitting ? "Menambahkan..." : "Tambahkan Loket"}
          </Button>
        </form>
      </div>
    </Modal>
  );
}

// Ambil pesan error yang paling jelas dari response axios (jika ada),
// fallback ke pesan generik kalau bentuknya tidak terduga.
function extractErrorMessage(err: unknown): string {
  if (
    typeof err === "object" &&
    err !== null &&
    "response" in err &&
    typeof (err as any).response === "object"
  ) {
    const data = (err as any).response?.data;
    const message = data?.message;

    if (Array.isArray(message)) {
      return message.join(" ");
    }
    if (typeof message === "string") {
      return message;
    }
  }

  if (err instanceof Error) {
    return err.message;
  }

  return "Gagal menambahkan pengguna loket. Coba lagi.";
}
