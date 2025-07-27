"use client";
import React from "react";
import Header from "../Header";
import { useRouter } from "next/navigation";
const steps = [
    {
        title: "1. Choose Your Role",
        description:
            "Select the job role or position you want to practice for. Our AI supports a wide range of industries and experience levels.",
        emoji: "🧑‍💼",
    },
    {
        title: "2. Start the Mock Interview",
        description:
            "Engage in a realistic interview simulation powered by AI. Answer questions just like in a real interview.",
        emoji: "🎤",
    },
    {
        title: "3. Get Instant Feedback",
        description:
            "Receive detailed feedback on your answers, including strengths and areas for improvement, so you can level up your interview skills.",
        emoji: "💡",
    },
    {
        title: "4. Track Your Progress",
        description:
            "Monitor your growth over time with personalized analytics and tips tailored to your performance.",
        emoji: "📈",
    },
];

export default function HowItWorks() {
    const router = useRouter();
      const onDashboard = () => {
        router.push("/dashboard");
      };
    return (
        <>
            <Header />
            <main className="max-w-3xl mx-auto py-12 px-4">
                <h1 className="text-4xl font-bold text-center mb-8">
                    How It Works <span role="img" aria-label="lightbulb">✨</span>
                </h1>
                <div className="space-y-8">
                    {steps.map((step, idx) => (
                        <div
                            key={idx}
                            className="flex items-start space-x-4 bg-white rounded-lg shadow p-6 hover:scale-105 transition-transform"
                        >
                            <div className="text-4xl">{step.emoji}</div>
                            <div>
                                <h2 className="text-xl font-semibold mb-1">{step.title}</h2>
                                <p className="text-gray-600">{step.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mt-12 text-center">
                    <a
                        href="/"
                        className="inline-block bg-blue-600 text-white px-6 py-3 rounded-full font-bold shadow hover:bg-blue-700 transition"
                        onClick={onDashboard}
                    >
                        Try Your First Mock Interview Now 🚀
                    </a>
                </div>
            </main>
        </>
    );
}