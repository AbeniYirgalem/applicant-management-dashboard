"use client";

import { LogOut, Menu } from "lucide-react";
import { usePathname } from "next/navigation";
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
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Sidebar } from "@/components/layout/sidebar";
import { ThemeSwitcher } from "@/components/layout/theme-switcher";
import { DASHBOARD_NAVIGATION } from "@/constants/navigation";
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

function getPageTitle(pathname: string) {
  const match = DASHBOARD_NAVIGATION.find(
    (item) => item.available && item.href === pathname,
  );
  return match?.label ?? "Dashboard";
}

export function Navbar() {
  const { user, logout, isLoading } = useAuth();
  const pathname = usePathname();
  const [isMobileNavigationOpen, setIsMobileNavigationOpen] = useState(false);
  const pageTitle = getPageTitle(pathname);

  return (
    <header className="sticky top-0 z-40 border-b bg-background">
      <div className="mx-auto flex h-14 max-w-[96rem] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-2.5">
          <Sheet
            open={isMobileNavigationOpen}
            onOpenChange={setIsMobileNavigationOpen}
          >
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="shrink-0 lg:hidden"
                aria-label="Open navigation"
              >
                <Menu className="size-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-60 p-0 pt-12">
              <div className="px-3">
                <Sidebar onNavigate={() => setIsMobileNavigationOpen(false)} />
              </div>
            </SheetContent>
          </Sheet>
          <div className="flex size-7 shrink-0 items-center justify-center rounded-md border bg-muted text-[11px] font-semibold">
            IN
          </div>
          <div className="hidden min-w-0 items-center gap-2.5 sm:flex">
            <span className="text-sm font-medium">INFNOVA</span>
            <Separator orientation="vertical" className="h-4" />
            <span className="truncate text-sm text-muted-foreground">
              {pageTitle}
            </span>
          </div>
          <span className="truncate text-sm font-medium sm:hidden">
            {pageTitle}
          </span>
        </div>
        <div className="flex shrink-0 items-center gap-1.5">
          <div className="hidden text-right md:block">
            <p className="text-sm font-medium leading-none">
              {user?.fullName ?? "Administrator"}
            </p>
            <p className="mt-0.5 text-xs text-muted-foreground">{user?.email}</p>
          </div>
          <Avatar className="size-8">
            <AvatarFallback className="bg-muted text-xs font-medium">
              {initials(user?.fullName)}
            </AvatarFallback>
          </Avatar>
          <ThemeSwitcher />
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                disabled={isLoading}
              >
                <LogOut className="size-3.5" />
                <span className="hidden sm:inline">Log out</span>
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Log out?</AlertDialogTitle>
                <AlertDialogDescription>
                  You will need to sign in again to access the dashboard.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel asChild>
                  <Button type="button" variant="outline" size="sm">
                    Cancel
                  </Button>
                </AlertDialogCancel>
                <AlertDialogAction asChild>
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={() => logout()}
                  >
                    Log out
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
