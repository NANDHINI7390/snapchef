import PricingCard from '@/components/snapchef/PricingCard';
import { Sparkles, Zap, Gem } from 'lucide-react';

export default function PricingPage() {
  const plans = [
    {
      planName: "Basic Snapper",
      price: "$9",
      description: "Perfect for casual cooks trying out AI recipes.",
      features: [
        "10 recipe generations per month",
        "Basic ingredient identification",
        "Save up to 20 favorite recipes",
        "Email support",
      ],
      icon: <Sparkles className="h-8 w-8 text-primary" />,
    },
    {
      planName: "Pro Chef",
      price: "$19",
      description: "For the enthusiastic home cook who loves exploring new dishes.",
      features: [
        "100 recipe generations per month",
        "Advanced ingredient identification",
        "Unlimited favorite recipes",
        "Priority email support",
        "Access to exclusive recipes (coming soon)",
      ],
      isPopular: true,
      icon: <Zap className="h-8 w-8 text-primary" />,
    },
    {
      planName: "Gourmet Guru",
      price: "$49",
      description: "For culinary adventurers and content creators.",
      features: [
        "Unlimited recipe generations",
        "Premium ingredient identification (higher accuracy)",
        "Unlimited favorite recipes & collections",
        "Dedicated support specialist",
        "Early access to new features",
        "API access (coming soon)",
      ],
      icon: <Gem className="h-8 w-8 text-primary" />,
    },
  ];

  return (
    <div className="space-y-12">
      <section className="text-center space-y-4">
        <h1 className="text-5xl font-headline font-bold">
          Find the Perfect <span className="text-primary">SnapChef</span> Plan
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Unlock the full power of AI-driven culinary creativity. Choose a plan that fits your appetite.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <PricingCard key={plan.planName} {...plan} />
        ))}
      </div>

      <section className="text-center mt-16 p-8 bg-card rounded-lg shadow-md">
        <h2 className="text-3xl font-headline mb-4">Frequently Asked Questions</h2>
        <div className="max-w-2xl mx-auto text-left space-y-4">
          <div>
            <h3 className="font-semibold text-lg">Can I try SnapChef for free?</h3>
            <p className="text-muted-foreground">Currently, we offer paid plans to ensure high-quality AI processing. We might introduce a limited free tier in the future!</p>
          </div>
          <div>
            <h3 className="font-semibold text-lg">What payment methods do you accept?</h3>
            <p className="text-muted-foreground">We accept all major credit cards through our secure payment processor (Stripe integration coming soon).</p>
          </div>
          <div>
            <h3 className="font-semibold text-lg">Can I cancel my subscription anytime?</h3>
            <p className="text-muted-foreground">Yes, you can cancel your subscription at any time. You'll retain access until the end of your current billing period.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
