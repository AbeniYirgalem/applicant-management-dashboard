"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type ThemeOption = "light" | "dark" | "system";

const themeOptions = [
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
  { value: "system", label: "System", icon: Monitor },
] as const;

function isThemeOption(theme: string | undefined): theme is ThemeOption {
  return theme === "light" || theme === "dark" || theme === "system";
}

function ThemeIcon({ theme }: { theme: ThemeOption }) {
  if (theme === "light") return <Sun className="size-4" />;
  if (theme === "dark") return <Moon className="size-4" />;
  return <Monitor className="size-4" />;
}

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const selectedTheme = isThemeOption(theme) ? theme : "system";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label={
            mounted ? `Theme: ${selectedTheme}. Change theme` : "Change theme"
          }
          title="Change theme"
        >
          {mounted ? (
            <ThemeIcon theme={selectedTheme} />
          ) : (
            <Monitor className="size-4" aria-hidden />
          )}
          <span className="sr-only">Change theme</span>
        </Button>
      </DropdownMenuTrigger>
      {mounted ? (
        <DropdownMenuContent align="end" className="w-40">
          <DropdownMenuLabel>Theme</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup
            value={selectedTheme}
            onValueChange={setTheme}
          >
            {themeOptions.map(({ value, label, icon: Icon }) => (
              <DropdownMenuRadioItem key={value} value={value}>
                <Icon className="mr-2 size-4" />
                {label}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      ) : null}
    </DropdownMenu>
  );
}
