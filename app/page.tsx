import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Alert>
        <AlertTitle>WARNING! This page is not even close to complete!</AlertTitle>
        <AlertDescription>The application is still under construction...</AlertDescription>
      </Alert>
    </div>
  );
}
