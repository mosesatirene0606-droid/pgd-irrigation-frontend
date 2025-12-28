import { useState } from "react";
import { useAuth } from "../api/context/AuthContext";
import AuthInput from "../components/ui/AuthInput";
import AuthButton from "../components/ui/AuthButton";

export default function LoginPage({ setScreen, setAuthDirection }) {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      await login(email, password);
      setTimeout(() => setScreen("dashboard"), 250);
    } catch {
      alert("Login failed");
      setLoading(false);
    }
  }

  return (
    <>
      <h2 className="text-3xl font-bold text-emerald-900">Welcome Back</h2>
      <p className="mt-2 text-sm text-slate-600">Sign in to your account</p>

      <form onSubmit={submit} className="mt-8 space-y-5">
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

        <AuthButton disabled={loading}>
          {loading ? "Signing in..." : "Sign In"}
        </AuthButton>

        <p className="text-center text-sm text-slate-600">
          Don’t have an account?{" "}
          <button
            type="button"
            onClick={() => {
              setAuthDirection(1);
              setScreen("register");
            }}
            className="font-semibold text-emerald-600 hover:underline">
            Register
          </button>
        </  p>
      </form>
    </>
  );
}
