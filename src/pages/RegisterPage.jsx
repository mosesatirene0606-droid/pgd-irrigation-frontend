import { useState } from "react";
import { useAuth } from "../api/context/AuthContext";
import AuthInput from "../components/ui/AuthInput";
import AuthButton from "../components/ui/AuthButton";

export default function RegisterPage({ setScreen, setAuthDirection }) {
  const { register } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function submit(e) {
    e.preventDefault();

    try {
      await register(name, email, password);
      setAuthDirection(-1);
      setScreen("login");
    } catch {
      alert("Registration failed");
    }
  }

  return (
    <>
      <h2 className="text-3xl font-bold text-emerald-900">Create Account</h2>

      <form onSubmit={submit} className="mt-8 space-y-5">
        <AuthInput
          placeholder="Full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <AuthInput
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <AuthInput
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <AuthButton>Create Account</AuthButton>

        <p className="text-center text-sm text-slate-600">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => {
              setAuthDirection(-1);
              setScreen("login");
            }}
            className="font-semibold text-emerald-600 hover:underline">
            Login
          </button>
        </p>
      </form>
    </>
  );
}
