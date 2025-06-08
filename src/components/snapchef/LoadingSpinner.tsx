import { LoaderCircle } from 'lucide-react';

interface LoadingSpinnerProps {
  size?: number;
  className?: string;
}

export default function LoadingSpinner({ size = 24, className }: LoadingSpinnerProps) {
  return (
    <div className={`flex justify-center items-center ${className}`}>
      <LoaderCircle className="animate-spin text-primary" style={{ width: size, height: size }} />
    </div>
  );
}
