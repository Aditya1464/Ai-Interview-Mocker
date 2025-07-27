import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";

const InterviewItemCard = ({ interview }) => {
  const router = useRouter();
  const onStart = () => {
    router.push("/dashboard/interview/" + interview?.mockId);
  };
  const onFeedbackPress = () => {
    router.push("dashboard/interview/" + interview.mockId + "/feedback");
  };
  return (
    <div className="border shadow-sm rounded-sm p-3">
      <h2 className="font-bold text-primary">
        {interview?.jobPosition?.toUpperCase()}
      </h2>

      <h2 className="text-sm text-gray-500">
        {interview?.jobExperience} years of experience
      </h2>
      <h2 className="text-xs text-gray-400">
        Created At: {interview?.createdAt}
      </h2>
      <div className="flex justify-between gap-5 mt-2">
        <Button variant="outline" onClick={onFeedbackPress}>
          Feedback
        </Button>
        <Button onClick={onStart}>Start</Button>
      </div>
    </div>
  );
};

export default InterviewItemCard;
