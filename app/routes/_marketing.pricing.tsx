import PricingPlan from '~/components/marketing/PricingPlan';
import { PRICING_PLANS } from '~/constants/constants';

export default function PricingPage() {
   return (
      <main id="pricing">
         <h2>Great Product, Simple Pricing</h2>
         <ol id="pricing-plans">
            {PRICING_PLANS.map((plan) => (
               <li key={plan.id} className="plan">
                  <PricingPlan
                     title={plan.title}
                     price={plan.price}
                     perks={plan.perks}
                     icon={plan.icon}
                  />
               </li>
            ))}
         </ol>
      </main>
   );
}

export function meta() { }

export function headers({ actionHeaders, loaderHeaders, parentHeaders, errorHeaders }) {
   console.log(actionHeaders, loaderHeaders, parentHeaders, errorHeaders);
   return {
      'Cache-Control': parentHeaders.get('Cache-Control') // 60minutes
   }
}

export const handle = { disableJS: true };