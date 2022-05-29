import React from 'react';
import { PricingTable, PricingSlot, PricingDetail } from 'react-pricing-table';
import { useHistory } from 'react-router-dom';
function Pricing() {
  const history = useHistory();
  return (
    <div className='container view-port-wrapper position-relative'>
      <div className='py-3'></div>
      <PricingTable>
        <PricingSlot
          onClick={(e) => history.push(`/signup/free`)}
          buttonText='TRY IT FREE'
          title='FREE'
          priceText='$0/month'
        >
          <PricingDetail strikethrough>Search Movies / TV Shows</PricingDetail>
          <PricingDetail strikethrough>Recommendations</PricingDetail>
        </PricingSlot>
        <PricingSlot
          onClick={(e) => history.push(`/signup/bingewatcher`)}
          buttonText='SIGN UP'
          title='BINGE WATCHER'
          priceText='$24/month'
        >
          <PricingDetail>Search Movies / TV Shows</PricingDetail>
          <PricingDetail>
            <b>Recommendations</b>
          </PricingDetail>
        </PricingSlot>
      </PricingTable>
    </div>
  );
}

export default Pricing;
