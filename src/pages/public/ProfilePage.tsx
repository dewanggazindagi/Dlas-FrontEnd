import { useRef, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Pencil } from "lucide-react";
import PublicLayout from "../../components/layout/Public/PublicLayout";
import BackLink from "../../components/ui/BackLink";
import Button from "../../components/ui/Button";
import TextField from "../../components/ui/TextField";
import Avatar from "../../components/ui/Avatar";
import { useAuth } from "../../hooks/useAuth";

export default function ProfilePage() {
  const { user, isAuthenticated, updateProfile, logout, deleteAccount } = useAuth();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState(user?.name ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [phone, setPhone] = useState(user?.phone ?? "");
  const [avatar, setAvatar] = useState(user?.avatar);

  if (!isAuthenticated || !user) {
    return <Navigate to="/" replace />;
  }

  function handleAvatarChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setAvatar(reader.result as string);
    reader.readAsDataURL(file);
  }

  function handleSave() {
    updateProfile({ name: name.trim(), email: email.trim(), phone: phone.trim(), avatar });
  }

  function handleLogout() {
    logout();
    navigate("/");
  }

  function handleDeleteAccount() {
    if (!window.confirm("Yakin ingin menghapus akun anda? Tindakan ini tidak dapat dibatalkan.")) return;
    deleteAccount();
    navigate("/");
  }

  return (
    <PublicLayout>
      <div className="flex w-full flex-col items-center gap-6 bg-soft-gray px-4 pt-6 pb-8 md:gap-10.5 md:px-13 md:pt-6.5 md:pb-21">
        <div className="flex w-full max-w-334 flex-col items-start">
          <BackLink label="Kembali ke Beranda" to="/" />
        </div>

        <div className="flex w-full max-w-185.5 flex-col items-center gap-8">
          <div className="flex flex-col items-center gap-5">
            <Avatar name={name || user.name} src={avatar} size="lg" />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex cursor-pointer items-center gap-1.5 rounded-full border border-border bg-white px-3.5 py-2.5 text-t5 font-semibold text-black shadow-[2px_3px_7px_rgba(0,0,0,0.05)]"
            >
              <Pencil size={18} />
              Ubah Foto Profile
            </button>
            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleAvatarChange} className="hidden" />
          </div>

          <div className="flex w-full flex-col items-start gap-5">
            <TextField label="Nama Lengkap" value={name} onChange={setName} />
            <TextField label="Email" type="email" value={email} onChange={setEmail} />
            <TextField label="No. HP" type="tel" value={phone} onChange={setPhone} />
          </div>

          <div className="flex w-full flex-col items-start gap-4">
            <Button variant="primary" fullWidth onClick={handleSave}>
              Simpan Perubahan
            </Button>
            <div className="flex w-full items-start gap-4">
              <Button variant="outline-danger" fullWidth onClick={handleLogout}>
                Logout
              </Button>
              <Button variant="danger" fullWidth onClick={handleDeleteAccount}>
                Hapus Akun
              </Button>
            </div>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
