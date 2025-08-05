'use client';

import { useState } from 'react';

import { Check, ChevronsUpDown } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';

interface FeatureSection {
  category: string;
  features: {
    name: string;
    free: string | boolean;
    startup: string | boolean;
    enterprise: string | boolean;
  }[];
}

const pricingPlans = [
  {
    name: 'Free',
    button: {
      text: 'Get started',
      variant: 'outline' as const,
    },
  },
  {
    name: 'Startup',
    button: {
      text: 'Get started',
      variant: 'outline' as const,
    },
  },
  {
    name: 'Enterprise',
    button: {
      text: 'Get a demo',
      variant: 'outline' as const,
    },
  },
];

const comparisonFeatures: FeatureSection[] = [
  {
    category: 'Usage',
    features: [
      {
        name: 'Members',
        free: 'Unlimited',
        startup: 'Unlimited',
        enterprise: 'Unlimited',
      },
      {
        name: 'Transactions',
        free: '250',
        startup: 'Unlimited',
        enterprise: 'Unlimited',
      },
      {
        name: 'Teams',
        free: '2',
        startup: 'Unlimited',
        enterprise: 'Unlimited',
      },
    ],
  },
  {
    category: 'Features',
    features: [
      {
        name: 'Reporting',
        free: true,
        startup: true,
        enterprise: true,
      },
      {
        name: 'Analytics',
        free: true,
        startup: true,
        enterprise: true,
      },
      {
        name: 'Import and export',
        free: true,
        startup: true,
        enterprise: true,
      },
      {
        name: 'Integrations',
        free: true,
        startup: true,
        enterprise: true,
      },
      {
        name: 'Mainline AI',
        free: false,
        startup: true,
        enterprise: true,
      },
      {
        name: 'Admin roles',
        free: false,
        startup: false,
        enterprise: false,
      },
      {
        name: 'Audit log',
        free: false,
        startup: false,
        enterprise: false,
      },
    ],
  },
  {
    category: 'Support',
    features: [
      {
        name: 'Priority Support',
        free: true,
        startup: true,
        enterprise: true,
      },
      {
        name: 'Account Manager',
        free: false,
        startup: false,
        enterprise: true,
      },
      {
        name: 'Uptime SLA',
        free: false,
        startup: false,
        enterprise: true,
      },
    ],
  },
];

const Pricing2 = () => {
  const [selectedPlan, setSelectedPlan] = useState(1); // Default to Startup plan

  return (
    <section className="pb-28 lg:py-32">
      <div className="container">
        <PlanHeaders
          selectedPlan={selectedPlan}
          onPlanChange={setSelectedPlan}
        />
        <FeatureSections selectedPlan={selectedPlan} />
      </div>
    </section>
  );
};

const PlanHeaders = ({
  selectedPlan,
  onPlanChange,
}: {
  selectedPlan: number;
  onPlanChange: (index: number) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="">
      {/* Mobile View */}
      <div className="md:hidden">
        <Collapsible open={isOpen} onOpenChange={setIsOpen} className="">
          <div className="flex items-center justify-between border-b py-4">
            <CollapsibleTrigger className="flex items-center gap-2">
              <h3 className="text-2xl font-semibold">
                {pricingPlans[selectedPlan].name}
              </h3>
              <ChevronsUpDown
                className={`size-5 transition-transform ${isOpen ? 'rotate-180' : ''}`}
              />
            </CollapsibleTrigger>
            <Button
              variant={pricingPlans[selectedPlan].button.variant}
              className="w-fit"
            >
              {pricingPlans[selectedPlan].button.text}
            </Button>
          </div>
          <CollapsibleContent className="flex flex-col space-y-2 p-2">
            {pricingPlans.map(
              (plan, index) =>
                index !== selectedPlan && (
                  <Button
                    size="lg"
                    variant="secondary"
                    key={index}
                    onClick={() => {
                      onPlanChange(index);
                      setIsOpen(false);
                    }}
                  >
                    {plan.name}
                  </Button>
                ),
            )}
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Desktop View */}
      <div className="grid grid-cols-4 gap-4 max-md:hidden">
        <div className="col-span-1 max-md:hidden"></div>

        {pricingPlans.map((plan, index) => (
          <div key={index} className="">
            <h3 className="mb-3 text-2xl font-semibold">{plan.name}</h3>
            <Button variant={plan.button.variant} className="">
              {plan.button.text}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

const FeatureSections = ({ selectedPlan }: { selectedPlan: number }) => (
  <>
    {comparisonFeatures.map((section, sectionIndex) => (
      <div key={sectionIndex} className="">
        <div className="border-primary/40 border-b py-4">
          <h3 className="text-lg font-semibold">{section.category}</h3>
        </div>
        {section.features.map((feature, featureIndex) => (
          <div
            key={featureIndex}
            className="text-primary grid grid-cols-2 font-medium max-md:border-b md:grid-cols-4"
          >
            <span className="inline-flex items-center py-4">
              {feature.name}
            </span>
            {/* Mobile View - Only Selected Plan */}
            <div className="md:hidden">
              <div className="flex items-center gap-1 py-4 md:border-b">
                {(() => {
                  const value = [
                    feature.free,
                    feature.startup,
                    feature.enterprise,
                  ][selectedPlan];
                  return typeof value === 'boolean' ? (
                    value ? (
                      <Check className="size-5" />
                    ) : null
                  ) : (
                    <div className="flex items-center gap-1">
                      <Check className="size-4" />
                      <span>{value}</span>
                    </div>
                  );
                })()}
              </div>
            </div>
            {/* Desktop View - All Plans */}
            <div className="hidden md:col-span-3 md:grid md:grid-cols-3 md:gap-4">
              {[feature.free, feature.startup, feature.enterprise].map(
                (value, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-1 border-b py-4"
                  >
                    {typeof value === 'boolean' ? (
                      value ? (
                        <Check className="size-5" />
                      ) : null
                    ) : (
                      <div className="flex items-center gap-1">
                        <Check className="size-4" />
                        <span>{value}</span>
                      </div>
                    )}
                  </div>
                ),
              )}
            </div>
          </div>
        ))}
      </div>
    ))}
  </>
);

export default Pricing2;
