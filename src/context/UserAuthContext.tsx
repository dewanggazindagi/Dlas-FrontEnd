import { createContext, useCallback, useState, type ReactNode } from "react";
import type { StoredAccount, User } from "../types/user";

const ACCOUNTS_KEY = "dlas_accounts";
const SESSION_KEY = "dlas_session_email";

interface RegisterInput {
  name: string;
  email: string;
  phone: string;
  password: string;
}

interface UserAuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  login: (
    email: string,
    password: string,
  ) => { success: boolean; message?: string };
  register: (input: RegisterInput) => { success: boolean; message?: string };
  logout: () => void;
  updateProfile: (
    input: Partial<Pick<User, "name" | "email" | "phone" | "avatar">>,
  ) => void;
  deleteAccount: () => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const UserAuthContext = createContext<UserAuthContextValue | undefined>(
  undefined,
);

function readAccounts(): StoredAccount[] {
  try {
    return JSON.parse(
      localStorage.getItem(ACCOUNTS_KEY) ?? "[]",
    ) as StoredAccount[];
  } catch {
    return [];
  }
}

function writeAccounts(accounts: StoredAccount[]): void {
  localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
}

function toPublicUser(account: StoredAccount): User {
  return {
    name: account.name,
    email: account.email,
    phone: account.phone,
    avatar: account.avatar,
  };
}

function readInitialUser(): User | null {
  const sessionEmail = localStorage.getItem(SESSION_KEY);
  if (!sessionEmail) return null;
  const account = readAccounts().find((item) => item.email === sessionEmail);
  return account ? toPublicUser(account) : null;
}

export function UserAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(readInitialUser);

  const login = useCallback((email: string, password: string) => {
    const account = readAccounts().find(
      (item) => item.email.toLowerCase() === email.toLowerCase(),
    );
    if (!account || account.password !== password) {
      return { success: false, message: "Email atau kata sandi salah" };
    }
    localStorage.setItem(SESSION_KEY, account.email);
    setUser(toPublicUser(account));
    return { success: true };
  }, []);

  const register = useCallback((input: RegisterInput) => {
    const accounts = readAccounts();
    if (
      accounts.some(
        (item) => item.email.toLowerCase() === input.email.toLowerCase(),
      )
    ) {
      return { success: false, message: "Email sudah terdaftar" };
    }
    const newAccount: StoredAccount = { ...input };
    writeAccounts([...accounts, newAccount]);
    localStorage.setItem(SESSION_KEY, newAccount.email);
    setUser(toPublicUser(newAccount));
    return { success: true };
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(SESSION_KEY);
    setUser(null);
  }, []);

  const updateProfile = useCallback(
    (input: Partial<Pick<User, "name" | "email" | "phone" | "avatar">>) => {
      setUser((current) => {
        if (!current) return current;
        const accounts = readAccounts();
        const index = accounts.findIndex(
          (item) => item.email === current.email,
        );
        if (index === -1) return current;
        const updatedAccount: StoredAccount = { ...accounts[index], ...input };
        accounts[index] = updatedAccount;
        writeAccounts(accounts);
        if (input.email && input.email !== current.email) {
          localStorage.setItem(SESSION_KEY, input.email);
        }
        return toPublicUser(updatedAccount);
      });
    },
    [],
  );

  const deleteAccount = useCallback(() => {
    setUser((current) => {
      if (!current) return current;
      writeAccounts(
        readAccounts().filter((item) => item.email !== current.email),
      );
      localStorage.removeItem(SESSION_KEY);
      return null;
    });
  }, []);

  return (
    <UserAuthContext.Provider
      value={{
        user,
        isAuthenticated: Boolean(user),
        login,
        register,
        logout,
        updateProfile,
        deleteAccount,
      }}
    >
      {children}
    </UserAuthContext.Provider>
  );
}
