
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { Mail, KeyRound } from "lucide-react";
import { useRouter } from 'next/navigation';
import { app, auth } from "@/lib/firebase"; // Ensure this path is correct
import { GoogleAuthProvider, GithubAuthProvider, signInWithPopup, UserCredential } from "firebase/auth";
import { useToast } from "@/hooks/use-toast";


// Inline SVG for Google Icon
const GoogleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" /><path d="M1 1h22v22H1z" fill="none"/></svg>
);

// Inline SVG for GitHub Icon
const GitHubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
);


export default function SignInPage() {
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement email/password sign-in with Firebase:
    // const email = (e.target as any).email.value;
    // const password = (e.target as any).password.value;
    // signInWithEmailAndPassword(auth, email, password)
    //   .then((userCredential) => {
    //     router.push('/profile');
    //   })
    //   .catch((error) => {
    //     toast({ variant: "destructive", title: "Sign In Failed", description: error.message });
    //   });
    toast({ variant: "destructive", title: "Not Implemented", description: "Email/Password Sign in functionality is not yet implemented with Firebase." });
  };

  const handleSocialSignIn = async (providerName: string) => {
    let provider;
    if (providerName === 'Google') {
      provider = new GoogleAuthProvider();
    } else if (providerName === 'GitHub') {
      provider = new GithubAuthProvider();
    } else {
      toast({ variant: "destructive", title: "Unsupported Provider", description: "This social provider is not supported." });
      return;
    }

    try {
      // Ensure Firebase app is initialized (imported 'app' and 'auth' from firebase.ts)
      if (!app) {
          toast({ variant: "destructive", title: "Firebase Not Initialized", description: "Please ensure Firebase is configured correctly in src/lib/firebase.ts." });
          return;
      }
      const result: UserCredential = await signInWithPopup(auth, provider);
      const user = result.user;
      toast({ title: "Sign In Successful", description: `Welcome back, ${user.displayName || user.email}!` });
      router.push('/profile'); // Or your desired redirect path after successful sign-in
    } catch (error: any) {
      console.error(`Error during ${providerName} sign-in:`, error);
      // Handle specific errors like 'auth/popup-closed-by-user' or 'auth/account-exists-with-different-credential'
      if (error.code === 'auth/cancelled-popup-request' || error.code === 'auth/popup-closed-by-user') {
        toast({ variant: "default", title: "Sign-in Cancelled", description: "You closed the sign-in popup." });
      } else if (error.code === 'auth/account-exists-with-different-credential') {
         toast({ variant: "destructive", title: "Account Exists", description: "An account already exists with the same email address but different sign-in credentials. Try signing in with the original method." });
      } else {
        toast({ variant: "destructive", title: `${providerName} Sign In Failed`, description: error.message });
      }
    }
  };


  return (
    <div className="flex items-center justify-center py-12 animate-fade-in">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="font-headline text-3xl">Sign In to SnapChef</CardTitle>
          <CardDescription>Access your recipes and culinary creations.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input id="email" name="email" type="email" placeholder="you@example.com" required className="pl-10" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input id="password" name="password" type="password" placeholder="••••••••" required className="pl-10" />
              </div>
            </div>
            <Button type="submit" className="w-full">
              Sign In with Email
            </Button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <Button variant="outline" className="w-full" onClick={() => handleSocialSignIn('Google')}>
              <GoogleIcon />
              <span className="ml-2">Sign In with Google</span>
            </Button>
            <Button variant="outline" className="w-full" onClick={() => handleSocialSignIn('GitHub')}>
              <GitHubIcon />
              <span className="ml-2">Sign In with GitHub</span>
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <p className="text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Button variant="link" asChild className="p-0 h-auto text-primary">
              <Link href="/auth/signup">Sign Up</Link>
            </Button>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
