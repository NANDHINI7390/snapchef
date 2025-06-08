import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2 } from 'lucide-react';

interface PricingCardProps {
  planName: string;
  price: string;
  priceFrequency?: string;
  description: string;
  features: string[];
  isPopular?: boolean;
  actionText?: string;
}

export default function PricingCard({
  planName,
  price,
  priceFrequency = "/ month",
  description,
  features,
  isPopular = false,
  actionText = "Get Started"
}: PricingCardProps) {
  return (
    <Card className={`flex flex-col h-full shadow-lg ${isPopular ? 'border-2 border-primary ring-2 ring-primary/50' : ''}`}>
      {isPopular && (
        <div className="py-1 px-4 bg-primary text-primary-foreground text-sm font-semibold rounded-t-lg text-center">
          Most Popular
        </div>
      )}
      <CardHeader className="pt-6">
        <CardTitle className="font-headline text-2xl">{planName}</CardTitle>
        <div className="flex items-baseline gap-1">
          <span className="text-4xl font-bold">{price}</span>
          <span className="text-muted-foreground">{priceFrequency}</span>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow space-y-3">
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button className="w-full" variant={isPopular ? "default" : "outline"}>
          {actionText}
        </Button>
      </CardFooter>
    </Card>
  );
}
