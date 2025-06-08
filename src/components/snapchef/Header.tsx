import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ChefHat, User, Sparkles } from 'lucide-react';

export default function Header() {
  return (
    <header className="py-4 px-6 border-b bg-card shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 text-2xl font-headline font-bold text-primary">
          <Sparkles className="h-7 w-7" />
          SnapChef
        </Link>
        <nav className="flex items-center gap-4">
          <Button variant="ghost" asChild>
            <Link href="/">Home</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/my-recipes">My Recipes</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/pricing">Pricing</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/auth/signin" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Login
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
