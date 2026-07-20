"use client";

import { LogOut, Menu } from "lucide-react";
import { useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Sidebar } from "@/components/layout/sidebar";
import { ThemeSwitcher } from "@/components/layout/theme-switcher";
import { useAuth } from "@/hooks/use-auth";

function initials(name?: string) {
  return (
    name
      ?.split(" ")
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "AD"
  );
}

export function Navbar() {
  const { user, logout, isLoading } = useAuth();
  const [isMobileNavigationOpen, setIsMobileNavigationOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b bg-card/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-[96rem] items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <Sheet
            open={isMobileNavigationOpen}
            onOpenChange={setIsMobileNavigationOpen}
          >
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                aria-label="Open navigation"
              >
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 p-4 pt-16">
              <Sidebar onNavigate={() => setIsMobileNavigationOpen(false)} />
            </SheetContent>
          </Sheet>
          <div className="flex size-10 items-center justify-center rounded-xl bg-primary font-bold text-primary-foreground">
            IN
          </div>
          <div>
            <p className="text-sm font-semibold">INFNOVA</p>
            <p className="hidden text-xs text-muted-foreground sm:block">
              Applicant Management
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden text-right sm:block">
            <p className="text-sm font-medium">
              {user?.fullName ?? "Administrator"}
            </p>
            <p className="text-xs text-muted-foreground">{user?.email}</p>
          </div>
          <Avatar className="size-9">
            <AvatarFallback className="bg-primary/10 text-xs font-semibold text-primary">
              {initials(user?.fullName)}
            </AvatarFallback>
          </Avatar>
          <ThemeSwitcher />
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={isLoading}
              >
                <LogOut className="size-4" />
                <span className="hidden sm:inline">Log out</span>
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Log Out</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to log out?
                  <br />
                  You will need to sign in again to access the dashboard.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel asChild>
                  <Button type="button" variant="outline">
                    Cancel
                  </Button>
                </AlertDialogCancel>
                <AlertDialogAction asChild>
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={() => logout()}
                  >
                    Log Out
                  </Button>
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </header>
  );
}
