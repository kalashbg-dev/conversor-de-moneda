import { CurrencyConverter } from "@/components/converter/CurrencyConverter";
import ExchangeRates from "./exchangeRateCard/ExchangeRates";

export default function Home() {
  return (
    <div className="bg-[#F0F5FF] w-full h-96">
      <div className="flex flex-col items-center justify-center gap-8 p-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4 ">
            Currency Converter
          </h1>
          <p className="text-small text-black max-w-2xl">
            Convert currencies using real-time exchange rates. Sign in to access
            institutional rates.
          </p>
        </div>

        <CurrencyConverter />
      </div>

      <div className="max-w-3xl mx-auto mb-12 text-center pt-16 p-8">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">
          Exchange USD without hidden fees
        </h2>
        <p className="text-black text-small">
          Wherever you need to send US dollars, our pricing is clear and simple.
          Our model is made up of two parts: an FX rate and a small payment fee
          – that's it. So what you see at the time of your transaction is
          exactly what you'll pay – there are no hidden charges.
        </p>
        <ExchangeRates />
      </div>
    </div>
  );
}
