// app/dashboard/interview/[interviewId]/start/page.jsx (StartInterview)
"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { db } from "@/utils/db";
import { mockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import QuestionsSection from "./_components/QuestionsSection";
import RecordAnswerSection from "./_components/RecordAnswerSection";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const StartInterview = () => {
  // Use next/navigation hook to get dynamic route params in a client component
  const params = useParams();
  const interviewId = params.interviewId;

  const [interviewData, setInterviewData] = useState(null);
  const [mockInterviewQuestion, setMockInterviewQuestion] = useState([]);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

  useEffect(() => {
    const getInterviewDetails = async () => {
      try {
        const result = await db
          .select()
          .from(mockInterview)
          .where(eq(mockInterview.mockId, interviewId));

        if (!result.length) {
          console.warn("No interview found with this ID");
          return;
        }

        const rawJson = result[0].jsonMockResp.trim();

        // Normalize single-object wrap into array
        let normalized = rawJson;
        if (rawJson.startsWith("{") && rawJson.endsWith("}")) {
          normalized = `[${rawJson.slice(1, -1)}]`;
        }

        // Parse outer JSON
        const outerParsed = JSON.parse(normalized);

        // Map inner entries: if string, parse; if object, use directly
        const finalParsed = outerParsed
          .map((q) => {
            if (typeof q === "string") {
              try {
                return JSON.parse(q);
              } catch (e) {
                console.error("Failed to parse inner question string:", q, e);
                return null;
              }
            } else if (typeof q === "object" && q !== null) {
              return q;
            } else {
              console.error("Unexpected question entry type:", q);
              return null;
            }
          })
          .filter(Boolean);

        setMockInterviewQuestion(finalParsed);
        setInterviewData(result[0]);
      } catch (error) {
        console.error("Error fetching interview details:", error);
      }
    };

    if (interviewId) {
      getInterviewDetails();
    }
  }, [interviewId]);

  // console.log("Interview Data:", interviewData);
  // console.log("Mock Interview Questions:", mockInterviewQuestion);

  // Render loading until questions are ready
  if (!mockInterviewQuestion.length) {
    return <div>Loading interview questions...</div>;
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Questions display */}
        <QuestionsSection
          mockInterviewQuestion={mockInterviewQuestion}
          activeQuestionIndex={activeQuestionIndex}
          onQuestionClick={setActiveQuestionIndex}
        />

        {/* Recording UI */}
        <div className="pt-10">
          <RecordAnswerSection
            mockInterviewQuestion={mockInterviewQuestion}
            activeQuestionIndex={activeQuestionIndex}
            interviewData={interviewData}
          />

          <div className="flex justify-end gap-6 mt-6">
            {activeQuestionIndex > 0 && (
              <Button onClick={() => setActiveQuestionIndex(i => i - 1)}>
                Previous Question
              </Button>
            )}

            {activeQuestionIndex < mockInterviewQuestion.length - 1 && (
              <Button onClick={() => setActiveQuestionIndex(i => i + 1)}>
                Next Question
              </Button>
            )}

            {activeQuestionIndex === mockInterviewQuestion.length - 1 && (
              <Link href={`/dashboard/interview/${interviewData?.mockId}/feedback`}>
                <Button>End Interview</Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartInterview;
