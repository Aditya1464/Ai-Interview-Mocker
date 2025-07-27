"use client"
import { Button } from "@/components/ui/button";
import Image from "next/image";
import "./globals.css";
import Header from "./Header";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const onDashboard = () => {
    router.push("/dashboard");
  };
  return (
    <>
      <Header />
      <main className="flex flex-col items-center justify-center bg-gray-50 px-4">
        <section
          className="max-w-2xl w-full text-center flex flex-col justify-center items-center flex-1"
          style={{ minHeight: "calc(100vh - 88px)" }} // Adjust 88px if your header height is different
        >
          <Image
            src="/logo.svg"
            alt="AI Interview Mocker"
            width={250}
            height={250}
            className="mx-auto mb-6"
          />
          <h1 className="text-4xl font-bold mb-4">AI Interview Mocker</h1>
          <p className="text-lg text-gray-600 mb-8">
            Practice your interview skills with AI-powered mock interviews. Get
            instant feedback, improve your confidence, and ace your next
            interview!
          </p>
          <Button size="lg" className="px-8 py-4 text-lg cursor-pointer" onClick={onDashboard}>
            Start Mock Interview
          </Button>
        </section>
      </main>
    </>
  );
}
