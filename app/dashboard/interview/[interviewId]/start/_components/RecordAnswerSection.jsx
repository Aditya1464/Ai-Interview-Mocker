"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Webcam from "react-webcam";
import useSpeechToText from "react-hook-speech-to-text";
import { Mic, StopCircle, WebcamIcon } from "lucide-react";
import { toast } from "sonner";
import { chatSession } from "@/utils/GeminiAIModal";
import { db } from "@/utils/db";
import { UserAnswer } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import moment from "moment";

const RecordAnswerSection = ({
  mockInterviewQuestion,
  activeQuestionIndex,
  interviewData,
}) => {
  // —— Webcam state
  const [webcamEnabled, setWebcamEnabled] = useState(false);

  // —— Speech‑to‑text state
  const [userAnswer, setUserAnswer] = useState("");
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
    setResults,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  // Append each result chunk to userAnswer
  useEffect(() => {
    results.forEach((r) => {
      setUserAnswer((prev) => prev + r.transcript);
    });
  }, [results]);

  // When transcription stops & we have a decent-length answer, save it
  useEffect(() => {
    if (!isRecording && userAnswer.length > 10) {
      UpdateUserAnswer();
    }
  }, [isRecording]);

  const StartStopRecording = () => {
    if (isRecording) {
      stopSpeechToText();
    } else {
      // clear any prior answer
      setUserAnswer("");
      startSpeechToText();
    }
  };

  const UpdateUserAnswer = async () => {
    setLoading(true);
    const questionText = mockInterviewQuestion[activeQuestionIndex]?.question;
    const feedbackPrompt = [
      `Question: ${questionText}`,
      `User Answer: ${userAnswer}`,
      `Please rate the answer and give feedback in JSON with keys "rating" and "feedback".`,
    ].join("  ");

    const result = await chatSession.sendMessage(feedbackPrompt);
    let mockJsonResp = result.response
      .text()
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const JsonfeedbackResp = JSON.parse(mockJsonResp);
    await db.insert(UserAnswer).values({
      mockIdRef: interviewData.mockId,
      question: questionText,
      correctAns: mockInterviewQuestion[activeQuestionIndex]?.answer,
      userAns: userAnswer,
      feedback: JsonfeedbackResp.feedback,
      rating: JsonfeedbackResp.rating,
      userEmail: user?.primaryEmailAddress?.emailAddress,
      createdAt: moment().format("DD-MM-YYYY"),
    });

    toast.success("User answer recorded!");
    setUserAnswer("");
    setResults([]);
    setLoading(false);
  };

  if (error) {
    return <p>Web Speech API is not available in this browser 🤷‍</p>;
  }

  return (
    <div className="flex flex-col items-center">
      {/* —— Webcam Preview */}
      <div className="w-full max-w-sm bg-black rounded-lg p-4 mb-6 flex justify-center items-center">
        {webcamEnabled ? (
          <Webcam
            mirrored
            audio={false}
            videoConstraints={{ facingMode: "user" }}
            className="rounded-lg"
            style={{ width: "100%", height: "auto" }}
          />
        ) : (
          <div className="flex flex-col items-center">
            <WebcamIcon className="h-16 w-16 text-gray-400 mb-2" />
            <Button
              variant="outline"
              onClick={() => setWebcamEnabled(true)}
            >
              Enable Webcam
            </Button>
          </div>
        )}
      </div>

      {/* —— Record/Stop Button */}
      <Button
        disabled={loading}
        variant="outline"
        className="mb-6"
        onClick={StartStopRecording}
      >
        {isRecording ? (
          <span className="flex items-center gap-2 text-red-600 animate-pulse">
            <StopCircle /> Stop Recording
          </span>
        ) : (
          <span className="flex items-center gap-2 text-primary">
            <Mic /> Record Answer
          </span>
        )}
      </Button>

      {/* —— Optionally, show interim transcript */}
      {interimResult && (
        <p className="italic text-gray-500 w-full max-w-sm">
          {interimResult}
        </p>
      )}
    </div>
  );
};

export default RecordAnswerSection;
