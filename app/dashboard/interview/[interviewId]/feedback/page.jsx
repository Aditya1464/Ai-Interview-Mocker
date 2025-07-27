// app/dashboard/interview/[interviewId]/feedback/page.jsx (Feedback)
"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { db } from "@/utils/db";
import { UserAnswer } from "@/utils/schema";
import { eq } from "drizzle-orm";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const Feedback = () => {
  // Use Next.js hook to access route params in a client component
  const params = useParams();
  const interviewId = params.interviewId;
  const router = useRouter();

  const [feedbackList, setFeedbackList] = useState([]);
  const [avgRating, setAvgRating] = useState(0);

  useEffect(() => {
    const getFeedback = async () => {
      try {
        const result = await db
          .select()
          .from(UserAnswer)
          .where(eq(UserAnswer.mockIdRef, interviewId))
          .orderBy(UserAnswer.id);

        setFeedbackList(result);

        if (result.length > 0) {
          const sum = result.reduce((acc, item) => acc + Number(item.rating), 0);
          setAvgRating(sum / result.length);
        }
      } catch (error) {
        console.error("Error fetching feedback:", error);
      }
    };

    if (interviewId) {
      getFeedback();
    }
  }, [interviewId]);

  // Loading state
  if (!feedbackList) {
    return <div>Loading feedback...</div>;
  }

  return (
    <div className="p-10">
      <h2 className="text-3xl font-bold text-green-600">Congratulations!</h2>
      <h2 className="font-bold text-2xl">Here is your interview feedback</h2>

      {feedbackList.length === 0 ? (
        <h2 className="font-bold text-lg text-green-500">
          No interview feedback
        </h2>
      ) : (
        <>
          <h2 className="text-primary text-lg my-2">
            Your overall interview rating: <strong>{avgRating.toFixed(1)}/10</strong>
          </h2>
          <h2 className="text-sm text-gray-500 mb-4">
            Below are each question’s correct answer, your answer, and feedback for improvement.
          </h2>

          {feedbackList.map((item, idx) => (
            <Collapsible key={idx} className="mt-4">
              <CollapsibleTrigger className="p-2 flex justify-between bg-secondary rounded-lg text-left gap-7 w-full">
                {item.question} <ChevronsUpDown className="h-4" />
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-2">
                <div className="flex flex-col gap-2">
                  <h2 className="text-red-500 p-2 border rounded-lg">
                    <strong>Rating:</strong> {item.rating}
                  </h2>
                  <h2 className="p-2 border rounded-lg bg-red-50 text-sm text-red-900">
                    <strong>Your Answer:</strong> {item.userAns}
                  </h2>
                  <h2 className="p-2 border rounded-lg bg-green-50 text-sm text-green-900">
                    <strong>Correct Answer Looks Like:</strong> {item.correctAns}
                  </h2>
                  <h2 className="p-2 border rounded-lg bg-blue-50 text-sm text-primary">
                    <strong>Feedback:</strong> {item.feedback}
                  </h2>
                </div>
              </CollapsibleContent>
            </Collapsible>
          ))}
        </>
      )}

      <Button className="mt-6" onClick={() => router.replace("/dashboard") }>
        Go Home
      </Button>
    </div>
  );
};

export default Feedback;
