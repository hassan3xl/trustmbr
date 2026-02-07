"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Shield, Mail, Lock, User, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { authApi } from "@/lib/api/auth.api";
import { handleLogin } from "@/lib/actions/auth.actions";
import { useAuth } from "@/lib/contexts/AuthContext";

export default function SignupPage() {
  const router = useRouter();
  const { refreshUser } = useAuth();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setIsLoading(true);

    try {
      const result = await authApi.signUp({
        email,
        password,
        full_name: fullName,
      });

      // If signup returns tokens directly, log the user in
      if (result.access && result.refresh) {
        await handleLogin(
          {
            id: result.user?.id || result.id,
            name: result.user?.full_name || fullName,
            email: result.user?.email || email,
          },
          result.access,
          result.refresh,
        );

        refreshUser();
        router.push("/");
        router.refresh();
      } else {
        // Otherwise, redirect to login
        router.push("/login?registered=true");
      }
    } catch (err: any) {
      setError(err?.data?.detail || err?.message || "Failed to create account");
      setIsLoading(false);
    }
  };

  return (
    <div className="relative w-full max-w-md">
      {/* Background effects */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-emerald-500/5 via-transparent to-transparent" />
      <div className="absolute -top-48 -right-48 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl -z-10" />

      <Card className="w-full border-border/50 bg-card/50 backdrop-blur animate-scale-in">
        <CardHeader className="text-center">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 mb-4"
          >
            <Shield className="h-10 w-10 text-emerald-500" />
            <span className="text-2xl font-bold tracking-wider">
              TRUST<span className="text-emerald-500">MBR</span>
            </span>
          </Link>
          <CardTitle className="text-xl tracking-wide">
            CREATE ACCOUNT
          </CardTitle>
          <p className="text-muted-foreground text-sm">
            Join TrustMBR to register and verify your business
          </p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm animate-fade-in">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm text-muted-foreground uppercase tracking-wide flex items-center gap-2">
                <User className="h-4 w-4" />
                Full Name
              </label>
              <Input
                type="text"
                placeholder="John Doe"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="h-12 bg-background/50"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm text-muted-foreground uppercase tracking-wide flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Email
              </label>
              <Input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-12 bg-background/50"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm text-muted-foreground uppercase tracking-wide flex items-center gap-2">
                <Lock className="h-4 w-4" />
                Password
              </label>
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="h-12 bg-background/50"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm text-muted-foreground uppercase tracking-wide flex items-center gap-2">
                <Lock className="h-4 w-4" />
                Confirm Password
              </label>
              <Input
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="h-12 bg-background/50"
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 bg-emerald-600 hover:bg-emerald-700 tracking-wide"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  CREATING ACCOUNT...
                </>
              ) : (
                <>
                  CREATE ACCOUNT
                  <ArrowRight className="h-4 w-4 ml-2" />
                </>
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link href="/login" className="text-emerald-400 hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
