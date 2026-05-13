import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { API_BASE_URL } from "@/api";
import { Layout } from "@/pages/home";


/* ── Password input with eye toggle ───────────────────────────────────────── */
function PasswordInput({
  value,
  onChange,
  placeholder = "Enter password",
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <input
        type={showPassword ? "text" : "password"}
        required
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full border border-border bg-background px-4 py-3 pr-12 text-sm outline-none transition-colors focus:border-primary"
      />
      <button
        type="button"
        onClick={() => setShowPassword((v) => !v)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
        aria-label={showPassword ? "Hide password" : "Show password"}
      >
        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
      </button>
    </div>
  );
}


/* ── Login Page ───────────────────────────────────────────────────────────── */
export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [, setLocation] = useLocation();
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Login failed");

      login(data.token, data.user);
      setLocation("/admin");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout cartCount={0} searchProducts={() => {}}>
      <section className="flex min-h-screen items-center justify-center bg-background py-20">
        <div className="w-full max-w-md border border-border bg-card p-8 shadow-sm">
          <h1 className="mb-2 text-center font-serif text-3xl">Welcome Back</h1>
          <p className="mb-6 text-center text-sm text-muted-foreground">Sign in to access the admin dashboard</p>

          {error && <div className="mb-4 bg-destructive/10 p-3 text-sm text-destructive">{error}</div>}


          {/* Email/Password Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-muted-foreground">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-primary"
              />
            </div>
            <div>
              <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-muted-foreground">Password</label>
              <PasswordInput value={password} onChange={setPassword} />
            </div>
            <Button type="submit" disabled={isLoading} className="mt-4 w-full rounded-none bg-primary py-6 text-base text-primary-foreground">
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </form>
          <p className="mt-6 text-center text-sm text-muted-foreground">
            No account? <Link href="/register" className="text-primary hover:underline">Register here</Link>
          </p>
        </div>
      </section>
    </Layout>
  );
}

/* ── Register Page ────────────────────────────────────────────────────────── */
export function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [, setLocation] = useLocation();
  const { login } = useAuth();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Registration failed");

      login(data.token, data.user);
      setLocation("/admin");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout cartCount={0} searchProducts={() => {}}>
      <section className="flex min-h-screen items-center justify-center bg-background py-20">
        <div className="w-full max-w-md border border-border bg-card p-8 shadow-sm">
          <h1 className="mb-2 text-center font-serif text-3xl">Create Account</h1>
          <p className="mb-6 text-center text-sm text-muted-foreground">Register to get started with Rossy's Enterprise</p>

          {error && <div className="mb-4 bg-destructive/10 p-3 text-sm text-destructive">{error}</div>}


          {/* Email/Password Form */}
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-muted-foreground">Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your full name"
                className="w-full border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-primary"
              />
            </div>
            <div>
              <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-muted-foreground">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-primary"
              />
            </div>
            <div>
              <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-muted-foreground">Password</label>
              <PasswordInput value={password} onChange={setPassword} placeholder="Create a password" />
            </div>
            <Button type="submit" disabled={isLoading} className="mt-4 w-full rounded-none bg-primary py-6 text-base text-primary-foreground">
              {isLoading ? "Registering..." : "Register"}
            </Button>
          </form>
          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account? <Link href="/login" className="text-primary hover:underline">Login here</Link>
          </p>
        </div>
      </section>
    </Layout>
  );
}
