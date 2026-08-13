import { useState } from "react";

import Modal from "../ui/Modal";
import Button from "../ui/Button";

import type { UserTable } from "../../types/userTable";

interface AddLoketModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (user: UserTable) => void;
}

export default function AddLoketModal({
  open,
  onClose,
  onSubmit,
}: AddLoketModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!name.trim() || !email.trim() || !password.trim()) {
      return;
    }

    const newUser: UserTable = {
      id: `#${Date.now().toString().slice(-4)}`,
      name: name.trim(),
      email: email.trim(),
      phone: "-",
      role: "Loket",
      password,
    };

    onSubmit(newUser);

    setName("");
    setEmail("");
    setPassword("");

    onClose();
  };

  const handleClose = () => {
    setName("");
    setEmail("");
    setPassword("");

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
          <div
            className="
              rounded-xl
              border
              border-border
              bg-white
              p-3
            "
          >
            <div className="mb-4">
              <label
                htmlFor="loket-name"
                className="
                  mb-1.5
                  block
                  text-sm
                  text-dark-gray
                "
              >
                Nama Pengguna
              </label>

              <input
                id="loket-name"
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Masukan nama pengguna"
                className="
                  h-10
                  w-full
                  rounded-full
                  border
                  border-border
                  bg-white
                  px-4
                  text-md
                  outline-none
                  transition
                  placeholder:text-dark-gray
                  focus:border-primary
                  focus:ring-1
                  focus:ring-primary"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="loket-email"
                className="
                  mb-1.5
                  block
                  text-sm
                  text-dark-gray
                "
              >
                Email
              </label>

              <input
                id="loket-email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Masukan email pengguna"
                className="
                  h-10
                  w-full
                  rounded-full
                  border
                  border-border
                  bg-white
                  px-4
                  text-md
                  outline-none
                  transition
                  placeholder:text-dark-gray
                  focus:border-primary
                  focus:ring-1
                  focus:ring-primary
                "
              />
            </div>

            <div>
              <label
                htmlFor="loket-password"
                className="
                  mb-1.5
                  block
                  text-sm
                  text-dark-gray
                "
              >
                Kata Sandi
              </label>

              <input
                id="loket-password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Masukan kata sandi"
                className="
                  h-10
                  w-full
                  rounded-full
                  border
                  border-border
                  bg-white
                  px-4
                  text-md
                  outline-none
                  transition
                  placeholder:text-dark-gray
                  focus:border-primary
                  focus:ring-1
                  focus:ring-primary
                "
              />
            </div>
          </div>

          <Button
            type="submit"
            variant="primary"
            className="
              mt-3
              h-10
              w-full
              rounded-full
              font-semibold
            "
          >
            Tambahkan Loket
          </Button>
        </form>
      </div>
    </Modal>
  );
}
