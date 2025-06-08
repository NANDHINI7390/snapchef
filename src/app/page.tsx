import ImageUploadForm from '@/components/snapchef/ImageUploadForm';

export default function HomePage() {
  return (
    <div className="flex flex-col items-center space-y-12">
      <section className="text-center space-y-4">
        <h1 className="text-5xl font-headline font-bold tracking-tight">
          Welcome to <span className="text-primary">SnapChef</span>!
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Turn photos of your ingredients into amazing recipes in seconds. Just snap, upload, and cook!
        </p>
      </section>
      
      <ImageUploadForm />

      <section className="w-full max-w-4xl mt-16 py-8 border-t">
        <h2 className="text-3xl font-headline text-center mb-8">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="flex flex-col items-center p-4 rounded-lg">
            <div className="p-4 bg-primary/10 rounded-full mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-camera"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>
            </div>
            <h3 className="text-xl font-headline mb-2">1. Snap a Photo</h3>
            <p className="text-muted-foreground">Take a picture of the ingredients you have on hand.</p>
          </div>
          <div className="flex flex-col items-center p-4 rounded-lg">
            <div className="p-4 bg-primary/10 rounded-full mb-4">
               <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-scan-search"><path d="M3 7V5a2 2 0 0 1 2-2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/><path d="M21 17v2a2 2 0 0 1-2 2h-2"/><path d="M7 21H5a2 2 0 0 1-2-2v-2"/><circle cx="12" cy="12" r="3"/><path d="m16 16-1.9-1.9"/></svg>
            </div>
            <h3 className="text-xl font-headline mb-2">2. AI Identifies</h3>
            <p className="text-muted-foreground">Our smart AI identifies your ingredients instantly.</p>
          </div>
          <div className="flex flex-col items-center p-4 rounded-lg">
             <div className="p-4 bg-primary/10 rounded-full mb-4">
               <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chef-hat"><path d="M10 17H5a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1h-5"/><path d="M6 17c0-2.3.4-4.2 1-5.5C8.3 9.4 10 8 12 8s3.7 1.4 5 3.5c.6 1.3 1 3.2 1 5.5"/><path d="M12 8c0-1.66-1.34-3-3-3s-3 1.34-3 3"/><path d="m19 2-1.5 1.5"/><path d="M22 5 20.5 3.5"/><path d="m5 2 1.5 1.5"/><path d="M2 5l1.5-1.5"/></svg>
            </div>
            <h3 className="text-xl font-headline mb-2">3. Get Your Recipe</h3>
            <p className="text-muted-foreground">Receive a custom recipe and start cooking!</p>
          </div>
        </div>
      </section>
    </div>
  );
}
