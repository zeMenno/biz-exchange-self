
import BusinessHero from "~/components/business-hero";
import { CallToAction } from "~/components/call-to-action";
import { QuickValuationTool } from "~/components/quick-valuation-tool";
import { HydrateClient } from "~/trpc/server";

export default async function Home() {
  return (
    <HydrateClient>
      <BusinessHero/>
      <div className="py-16 bg-gray-50 -mx-4 px-4">
        <div className="container mx-auto">
          <div className="row-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 font-heading">Estimate Your Business Value</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Use our quick valuation tool to get an estimate of what your business might be worth.
            </p>
          </div>
          <div className="max-w-3xl mx-auto">
            <QuickValuationTool />
          </div>
          </div>
        </div>
      </div>
      <CallToAction/>
    </HydrateClient>
  );
}
