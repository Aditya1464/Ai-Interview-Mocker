"use client";

import React, { useEffect, useState, use } from "react"; // ✅ import `use`
import { db } from "@/utils/db";
import { mockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";
import Webcam from "react-webcam";
import { Ghost, Lightbulb, WebcamIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function Interview(props) {
  const params = use(props.params); // ✅ unwrap the `params` promise
  const [interviewData, setInterviewData] = useState();
  const [webcamEnabled, setWebcamEnabled] = useState(false);

  useEffect(() => {
    console.log("Interview ID:", params.interviewId);
    GetInterviewDetails();
  }, []);

  const GetInterviewDetails = async () => {
    const result = await db
      .select()
      .from(mockInterview)
      .where(eq(mockInterview.mockId, params.interviewId));

    if (result.length > 0) {
      console.log("Interview Details:", result);
      setInterviewData(result[0]);
    } else {
      console.log("No interview found with this ID");
    }
  };

  return (
    <div className="my-10 ">
      <h2 className="font-bold text-2xl"> Let's Get Started</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-15">
        <div className="flex flex-col my-5 gap-5 ">
          <div className="flex flex-col gap-2 p-5 rounded-lg border">
            <h2 className="text-0.5xl">
              <strong>Job Role/Job Position:</strong>{" "}
              {interviewData ? interviewData.jobPosition : "Loading..."}
            </h2>
            <h2 className="text-0.5xl ">
              <strong>Job Description/Tech stack:</strong>{" "}
              {interviewData ? interviewData.jobDes : "Loading..."}
            </h2>
            <h2 className="text-0.5xl ">
              <strong>Years of Experience:</strong>{" "}
              {interviewData ? interviewData.jobExperience : "Loading..."}
            </h2>
          </div>
          <div className="p-5 border rounded-lg border-yellow-300 bg-yellow-100">
            <h2 className="flex gap-2 items-center text-yellow-500">
              <Lightbulb />
              <strong>Information</strong>
            </h2>
            <h2 className="mt-5 text-yellow-500">{process.env.NEXT_PUBLIC_INFO}</h2>
          </div>
        </div>
        <div>
          {webcamEnabled ? (
            <Webcam
              onUserMedia={() => setWebcamEnabled(true)}
              onUserMediaError={() => setWebcamEnabled(false)}
              mirrored={true}
              style={{
                height: 300,
                width: 300,
              }}
            />
          ) : (
            <>
              <WebcamIcon className="h-65 w-full p-20 my-7 bg-secondary rounded-lg border" />
              <Button
                variant="ghost"
                className={"w-full cursor-pointer"}
                onClick={() => setWebcamEnabled(true)}
              >
                Enable Webcam and Microphone
              </Button>
            </>
          )}
        </div>
      </div>

      <div className="flex justify-end items-end">
        <Link href={`/dashboard/interview/${params.interviewId}/start`}>
          <Button className={"cursor-pointer"}>Start Interview</Button>
        </Link>
      </div>
    </div>
  );
}

export default Interview;
