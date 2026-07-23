"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, LoaderCircle } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
        description: authError.title
          ? authError.message || undefined
          : undefined,
      });
    }
  };

  const submitting = isLoading || form.formState.isSubmitting;

  return (
    <div className="space-y-5">
      <div className="space-y-1">
        <h1 className="text-xl font-semibold tracking-tight">Sign in</h1>
        <p className="text-sm text-muted-foreground">
          Access your applicant workspace.
        </p>
      </div>
      {error ? (
        <div
          role="alert"
          className="rounded-md border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive"
        >
          <p className="font-medium">{error.title ?? error.message}</p>
          {error.title && error.message ? (
            <p className="mt-0.5 text-xs">{error.message}</p>
          ) : null}
        </div>
      ) : null}
      <form
        className="space-y-4"
        onSubmit={form.handleSubmit(onSubmit)}
        noValidate
      >
        <div className="space-y-1.5">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="you@company.com"
            aria-invalid={Boolean(form.formState.errors.email)}
            {...form.register("email")}
          />
          {form.formState.errors.email ? (
            <p className="text-xs text-destructive">
              {form.formState.errors.email.message}
            </p>
          ) : null}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input
              id="password"
              className="pr-10"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              aria-invalid={Boolean(form.formState.errors.password)}
              {...form.register("password")}
            />
            <Button
              className="absolute right-0 top-0 size-9"
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => setShowPassword((value) => !value)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOff className="size-3.5" />
              ) : (
                <Eye className="size-3.5" />
              )}
            </Button>
          </div>
          {form.formState.errors.password ? (
            <p className="text-xs text-destructive">
              {form.formState.errors.password.message}
            </p>
          ) : null}
        </div>
        <Button className="w-full" type="submit" disabled={submitting}>
          {submitting ? <LoaderCircle className="size-3.5 animate-spin" /> : null}
          {submitting ? "Signing in..." : "Sign in"}
        </Button>
      </form>
    </div>
  );
}
