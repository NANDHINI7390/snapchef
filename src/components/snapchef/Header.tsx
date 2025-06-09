
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sparkles, User, Sun, Moon } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Header() {
  const [theme, setTheme] = useState<string | null>(null);

  useEffect(() => {
    // Check for saved theme in localStorage or default to 'light'
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    } else {
      // Check system preference if no theme is saved
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const initialTheme = prefersDark ? 'dark' : 'light';
      setTheme(initialTheme);
      document.documentElement.classList.toggle('dark', initialTheme === 'dark');
      localStorage.setItem('theme', initialTheme);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };
  
  // Prevents rendering the button until theme is determined to avoid hydration mismatch
  if (theme === null) {
    return (
      <header className="py-4 px-6 border-b bg-card shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 text-2xl font-headline font-bold text-primary">
            <Sparkles className="h-7 w-7" />
            SnapChef
          </Link>
          <nav className="flex items-center gap-4">
            {/* Placeholder for button to maintain layout consistency */}
            <div className="w-10 h-10"></div>
          </nav>
        </div>
      </header>
    );
  }


  return (
    <header className="py-4 px-6 border-b bg-card shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 text-2xl font-headline font-bold text-primary">
          <Sparkles className="h-7 w-7" />
          SnapChef
        </Link>
        <nav className="flex items-center gap-2 md:gap-4">
          <Button variant="ghost" asChild>
            <Link href="/">Home</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/my-recipes">My Recipes</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/pricing">Pricing</Link>
          </Button>
          <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </Button>
          <Button variant="outline" asChild>
            <Link href="/auth/signin" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">Login</span>
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
