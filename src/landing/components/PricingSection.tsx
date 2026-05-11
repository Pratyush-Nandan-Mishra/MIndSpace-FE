import { useState } from 'react';
import { CheckOutlined } from '@ant-design/icons';

const PricingSection = () => {
  const [isYearly, setIsYearly] = useState(false);

  const plans = [
    {
      name: "Basic",
      subtitle: "For individuals",
      description: "Perfect for individuals and small projects.",
      price: { monthly: 99, yearly: 79 },
      features: [
        "All analytics features",
        "Up to 250,000 tracked visits",
        "Normal support",
        "Up to 3 team members"
      ],
      isPopular: false
    },
    {
      name: "Pro",
      subtitle: "For startups",
      description: "Unlock enhanced AI capabilities, priority support, and weekly updates.",
      price: { monthly: 199, yearly: 159 },
      features: [
        "All analytics features",
        "Up to 1,000,000 tracked visits",
        "Premium support",
        "Up to 10 team members"
      ],
      isPopular: true
    },
    {
      name: "Enterprise",
      subtitle: "For big companies",
      description: "Access the full suite of AI features, 24/7 dedicated support.",
      price: { monthly: 399, yearly: 319 },
      features: [
        "All analytics features",
        "Up to 5,000,000 tracked visits",
        "Dedicated support",
        "Up to 50 team members"
      ],
      isPopular: false
    }
  ];

  return (
    <section className="py-24 px-6 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Flexible and Transparent Pricing
          </h2>
          <p className="text-xl text-slate-400 mb-12">for teams of all sizes</p>

          <div className="flex items-center justify-center gap-6 mt-12">
            <span className={`text-lg font-semibold ${!isYearly ? 'text-white' : 'text-slate-500'}`}>
              Monthly
            </span>
            <button
              onClick={() => setIsYearly(!isYearly)}
              className={`relative w-16 h-8 rounded-full transition-all duration-300 ${isYearly ? 'bg-purple-600' : 'bg-slate-700'
                }`}
            >
              <div
                className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all duration-300 ${isYearly ? 'translate-x-9' : 'translate-x-1'
                  }`}
              />
            </button>
            <span className={`text-lg font-semibold ${isYearly ? 'text-white' : 'text-slate-500'}`}>
              Yearly
            </span>
            {isYearly && (
              <span className="ml-3 px-3 py-1 bg-purple-600 text-white text-sm font-semibold rounded-full">
                20% off
              </span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div key={plan.name} className="relative group">
              {plan.isPopular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <span className="bg-purple-600 text-white text-sm font-bold px-4 py-2 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}

              <div className={`bg-slate-900/50 backdrop-blur-sm border rounded-3xl p-8 h-full transition-all duration-300 ${plan.isPopular
                  ? 'border-purple-500 shadow-2xl shadow-purple-500/10 scale-105'
                  : 'border-slate-800 hover:border-slate-700 hover:scale-105'
                }`}>
                <div className="text-center mb-8">
                  <p className="text-slate-400 text-sm uppercase tracking-wider mb-2">
                    {plan.subtitle}
                  </p>
                  <h3 className="text-3xl font-bold text-white mb-4">
                    {plan.name}
                  </h3>
                  <p className="text-slate-400 mb-8 leading-relaxed">
                    {plan.description}
                  </p>

                  <div className="mb-8">
                    <span className="text-5xl font-bold text-white">
                      ${isYearly ? plan.price.yearly : plan.price.monthly}
                    </span>
                    <span className="text-slate-400 ml-2 text-lg">
                      /monthly
                    </span>
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  <p className="font-bold text-white text-lg">What's included</p>
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start gap-3">
                      <CheckOutlined className="text-purple-400 mt-1 text-lg flex-shrink-0" />
                      <span className="text-slate-300">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="space-y-4">
                  <button className={`w-full py-4 px-6 rounded-2xl font-semibold text-lg transition-all duration-300 ${plan.isPopular
                      ? "bg-purple-600 text-white hover:bg-purple-700 hover:shadow-lg hover:shadow-purple-500/25"
                      : "border-2 border-slate-700 text-white hover:border-purple-500 hover:text-purple-400"
                    }`}>
                    Get Started
                  </button>
                  <button className="w-full py-3 text-slate-400 hover:text-white font-medium transition-colors duration-300">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;