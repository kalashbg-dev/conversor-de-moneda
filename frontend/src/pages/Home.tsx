import { CurrencyConverter } from '@/components/converter/CurrencyConverter';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center gap-8 p-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">
          Currency Converter
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl">
          Convert currencies using real-time exchange rates. Sign in to access institutional rates.
        </p>
      </div>
      
      <CurrencyConverter />
    </div>
  );
}