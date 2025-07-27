import React from "react";
import Header from "../Header";

const plans = [
    {
        name: "Starter",
        priceMonthly: "Free",
        priceYearly: "Free",
        features: [
            "5 mock interviews/month",
            "Basic AI feedback",
            "Access to community forum",
        ],
        creative: "Perfect for beginners exploring AI interviews.",
    },
    {
        name: "Pro",
        priceMonthly: "$12",
        priceYearly: "$120",
        features: [
            "Unlimited mock interviews",
            "Advanced AI feedback & analytics",
            "Priority support",
            "Custom interview scenarios",
        ],
        creative: "Unlock your full potential with tailored feedback.",
    },
    {
        name: "Elite",
        priceMonthly: "$29",
        priceYearly: "$290",
        features: [
            "Everything in Pro",
            "1-on-1 expert coaching (2/month)",
            "Personalized interview roadmap",
            "Early access to new features",
            "Certificate of completion",
        ],
        creative: "For those aiming for top tech roles and rapid growth.",
    },
];

export default function UpgradesPage() {
    return (
        <>
            <Header />
            <div
                className="min-h-screen w-full"
                style={{
                    background: "linear-gradient(135deg, #e0e7ff 0%, #f0fdfa 100%)",
                }}
            >
                <div className="max-w-4xl mx-auto py-16 px-4">
                    <h1 className="text-4xl font-extrabold mb-12 text-center text-[#4845D2] drop-shadow">
                        Upgrade Your Interview Prep
                    </h1>
                    <div className="grid md:grid-cols-3 gap-10">
                        {plans.map((plan) => (
                            <div
                                key={plan.name}
                                className={`
                                    border rounded-2xl shadow-lg p-8 flex flex-col items-center bg-white transition-transform
                                    hover:scale-105 hover:shadow-2xl relative
                                    ${plan.name === "Pro" ? "border-4 border-[#4845D2] z-10 scale-105 shadow-2xl" : ""}
                                `}
                                style={plan.name === "Pro" ? { top: "-12px" } : {}}
                            >
                                {plan.name === "Pro" && (
                                    <span className="absolute -top-5 left-1/2 -translate-x-1/2 bg-[#4845D2] text-white px-4 py-1 rounded-full text-xs font-bold shadow">
                                        Most Popular
                                    </span>
                                )}
                                <h2 className="text-2xl font-bold mb-2 text-[#4845D2]">{plan.name}</h2>
                                <div className="mb-4 flex items-end gap-1">
                                    <span className="text-3xl font-extrabold">{plan.priceMonthly}</span>
                                    <span className="text-base text-gray-500">/month</span>
                                </div>
                                <div className="mb-2 text-gray-500">
                                    {plan.priceYearly !== "Free" && (
                                        <>
                                            <span className="font-semibold">{plan.priceYearly}</span>
                                            <span> /year</span>
                                        </>
                                    )}
                                </div>
                                <ul className="mb-4 text-left list-disc list-inside space-y-1 text-gray-700">
                                    {plan.features.map((feature) => (
                                        <li key={feature}>{feature}</li>
                                    ))}
                                </ul>
                                <p className="italic text-sm text-blue-600 mb-6 text-center">{plan.creative}</p>
                                <button
                                    className={`
                                        px-6 py-2 rounded-full font-semibold transition
                                        ${plan.priceMonthly === "Free"
                                            ? "bg-gray-300 text-gray-700 cursor-not-allowed"
                                            : "bg-[#4845D2] text-white hover:bg-[#3732a8] shadow"
                                        }
                                    `}
                                    disabled={plan.priceMonthly === "Free"}
                                >
                                    {plan.priceMonthly === "Free" ? "Current Plan" : "Upgrade"}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}