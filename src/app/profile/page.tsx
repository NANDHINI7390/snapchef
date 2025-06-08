'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { User, Mail, CreditCard, ShieldCheck, LogOut } from "lucide-react";
import Link from "next/link";

export default function ProfilePage() {
  // Mock user data
  const user = {
    name: "Alex Chefman",
    email: "alex.chefman@example.com",
    avatarUrl: "https://placehold.co/100x100.png", // Replace with actual avatar logic
    subscription: {
      planName: "Pro Chef",
      status: "Active",
      nextBillingDate: "October 26, 2024",
    },
  };

  const handleManageSubscription = () => {
    alert("Subscription management redirect (e.g., to Stripe Billing Portal) is not yet implemented.");
  };
  
  const handleLogout = () => {
    alert("Logout functionality is not yet implemented.");
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <h1 className="text-4xl font-headline font-bold text-center">Your Profile</h1>

      <Card className="shadow-xl">
        <CardHeader className="flex flex-col items-center text-center sm:flex-row sm:items-start sm:text-left">
          <Avatar className="h-24 w-24 mb-4 sm:mb-0 sm:mr-6">
            <AvatarImage src={user.avatarUrl} alt={user.name} data-ai-hint="person avatar" />
            <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="font-headline text-3xl">{user.name}</CardTitle>
            <CardDescription className="text-lg">{user.email}</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2 flex items-center gap-2"><User /> Account Details</h3>
            <div className="space-y-1 text-muted-foreground">
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
            </div>
            <Button variant="outline" size="sm" className="mt-2">Edit Profile</Button>
          </div>
          
          <Separator />

          <div>
            <h3 className="text-lg font-semibold mb-2 flex items-center gap-2"><CreditCard /> Subscription</h3>
            <div className="space-y-1 text-muted-foreground">
              <p><strong>Current Plan:</strong> {user.subscription.planName}</p>
              <p><strong>Status:</strong> <span className="text-green-600 font-medium">{user.subscription.status}</span></p>
              <p><strong>Next Billing Date:</strong> {user.subscription.nextBillingDate}</p>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <Button onClick={handleManageSubscription}>Manage Subscription</Button>
              <Button variant="link" asChild className="text-primary">
                <Link href="/pricing">View All Plans</Link>
              </Button>
            </div>
          </div>
          
          <Separator />
          
          <div>
             <h3 className="text-lg font-semibold mb-2 flex items-center gap-2"><ShieldCheck /> Security</h3>
             <Button variant="outline">Change Password</Button>
          </div>

          <Separator />

          <div className="text-center sm:text-right">
            <Button variant="destructive" onClick={handleLogout} className="w-full sm:w-auto">
              <LogOut className="mr-2 h-4 w-4" /> Log Out
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
