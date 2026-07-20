"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, LoaderCircle, LockKeyhole, Mail } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/use-auth";
import { loginSchema, type LoginFormValues } from "@/schemas/auth.schema";
import { getAuthErrorMessage } from "@/services/axios";
import type { APIError } from "@/types/api";

export default function LoginPage() {
  const { login, isLoading, isAuthenticated } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<APIError | null>(null);
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  if (isAuthenticated) return null;

  const onSubmit = async (values: LoginFormValues) => {
    if (isLoading) return;
    setError(null);

    try {
      await login(values);
    } catch (cause) {
      const authError = getAuthErrorMessage(cause);
      setError(authError);
      toast.error(authError.title ?? authError.message, {
        description: authError.title ? authError.message || undefined : undefined,
      });
    }
  };

  const submitting = isLoading || form.formState.isSubmitting;

  return <div className="space-y-6"><div className="space-y-2 text-center"><h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1><p className="text-sm text-muted-foreground">Sign in to manage your applicant workspace.</p></div>{error ? <div role="alert" className="rounded-xl border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive"><p className="font-medium">{error.title ?? error.message}</p>{error.title && error.message ? <p className="mt-1">{error.message}</p> : null}</div> : null}<form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)} noValidate><label className="block space-y-2"><span className="text-sm font-medium">Email address</span><div className="relative"><Mail className="pointer-events-none absolute left-3 top-3 size-5 text-muted-foreground" /><Input className="pl-10" type="email" autoComplete="email" placeholder="Enter your email address" aria-invalid={Boolean(form.formState.errors.email)} {...form.register("email")} /></div>{form.formState.errors.email ? <p className="text-sm text-destructive">{form.formState.errors.email.message}</p> : null}</label><label className="block space-y-2"><span className="text-sm font-medium">Password</span><div className="relative"><LockKeyhole className="pointer-events-none absolute left-3 top-3 size-5 text-muted-foreground" /><Input className="pl-10 pr-12" type={showPassword ? "text" : "password"} autoComplete="current-password" aria-invalid={Boolean(form.formState.errors.password)} {...form.register("password")} /><Button className="absolute right-0 top-0" type="button" variant="ghost" size="icon" onClick={() => setShowPassword((value) => !value)} aria-label={showPassword ? "Hide password" : "Show password"}>{showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}</Button></div>{form.formState.errors.password ? <p className="text-sm text-destructive">{form.formState.errors.password.message}</p> : null}</label><Button className="w-full" type="submit" disabled={submitting}>{submitting ? <LoaderCircle className="size-4 animate-spin" /> : null}{submitting ? "Signing in..." : "Sign in"}</Button></form></div>;
}