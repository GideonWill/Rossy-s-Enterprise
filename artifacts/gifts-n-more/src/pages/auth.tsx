import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { API_BASE_URL } from "@/api";
import { Layout } from "@/pages/home";

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
          <h1 className="mb-6 text-center font-serif text-3xl">Admin Login</h1>
          {error && <div className="mb-4 bg-destructive/10 p-3 text-sm text-destructive">{error}</div>}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-muted-foreground">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-primary"
              />
            </div>
            <div>
              <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-muted-foreground">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-primary"
              />
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
          <h1 className="mb-6 text-center font-serif text-3xl">Register</h1>
          {error && <div className="mb-4 bg-destructive/10 p-3 text-sm text-destructive">{error}</div>}
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-muted-foreground">Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
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
                className="w-full border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-primary"
              />
            </div>
            <div>
              <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-muted-foreground">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-primary"
              />
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
