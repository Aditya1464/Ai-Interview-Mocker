// "use client";
// import React from "react";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";

// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { LoaderCircle } from "lucide-react";
// import { v4 as uuidv4 } from 'uuid';
// import { useUser } from "@clerk/nextjs";
// import moment from "moment";

// import { db } from "@/utils/db";
// import { mockInterview } from "@/utils/schema";
// import { useRouter } from "next/navigation";
// function AddNewInterview() {
//   const [open, setOpen] = React.useState(false);
//   const [jobRole, setJobRole] = React.useState("");
//   const [jobDes, setJobDescription] = React.useState("");
//   const [yearsOfExperience, setYearsOfExperience] = React.useState("");
//   const [loading, setLoading] = React.useState(false);
//   const [jsonResponse, setJsonResponse] = React.useState([]);
//   const { isLoaded, isSignedIn, user } = useUser();
//   const router = useRouter();

//   const onSubmit = async (e) => {
//     setLoading(true);
//     e.preventDefault();

//     try {
//       const response = await fetch("/api/generate-questions", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           jobRole,
//           jobDescription,
//           yearsOfExperience,
//         }),
//       });

//       const text = await response.text();
//       const contentType = response.headers.get("content-type");

//       if (contentType && contentType.includes("application/json")) {
//         const data = JSON.parse(text);
//         if (!response.ok) throw new Error(data.error || "API call failed");

//         console.log("Interview Questions:", data.questions);
//         setJsonResponse(data.questions);

//         if(!data.questions || data.questions.length === 0) {
//           alert("No questions generated. Please check your inputs.");
//         } else {
//           const resp = await db.insert(mockInterview).values({
//             mockId : uuidv4(),
//             jsonMockResp: data.questions,
//             jobPosition: jobRole,
//             jobDes: jobDescription,
//             jobExperience: yearsOfExperience,
//             createdBy: user?.primaryEmailAddress?.emailAddress || "unknown",
//             createdAt: moment().format("YYYY-MM-DD HH:mm:ss"),
//           }).returning({ mockId: mockInterview.mockId });

//         console.log("Database Response:", resp);
//         if(resp){
//           setOpen(false);
//           router.push('/dashboard/interview'+resp[0]?.mockId)
//         }
//       }
//         // Reset form and close dialog
//         setOpen(false);
//         setJobRole("");
//         setJobDescription("");
//         setYearsOfExperience("");
//         // Optional: Pass data to a parent or save it somewhere
//       } else {
//         console.error("Unexpected non-JSON response:\n", text);
//         throw new Error("Non-JSON response from server.");
//       }
//     } catch (err) {
//       console.error("Error:", err);
//       alert("Something went wrong. Please try again.");
//     }
//     setLoading(false);
//   };

//   return (
//     <div>
//       <div
//         className="p-10 border rounded-lg shadow-md bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all"
//         onClick={() => setOpen(true)}
//       >
//         <h2 className="font-bold text-lg text-center">+ Add New</h2>
//       </div>
//       <Dialog open={open} onOpenChange={setOpen}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle className="text-2xl">
//               Tell us more about your job interview
//             </DialogTitle>

//             <DialogDescription>
//               <div>
//                 <h2>
//                   Add Details about your job position/role, Job description and
//                   years of experience
//                 </h2>

//                 <form onSubmit={onSubmit}>
//                   <div className="mt-7 my-3">
//                     <label>Job Role/ Job Position</label>
//                     <Input
//                       placeholder="Ex. Full Stack Developer"
//                       required
//                       onChange={(e) => setJobRole(e.target.value)}
//                     />
//                   </div>
//                   <div className="my-3">
//                     <label>Job Description/ Tech Stack (In Short)</label>
//                     <Textarea
//                       placeholder="Ex. React, Angular, NodeJs, MySql etc."
//                       required
//                       onChange={(e) => setJobDescription(e.target.value)}
//                     />
//                   </div>
//                   <div className="my-3">
//                     <label>Years of Experience</label>
//                     <Input
//                       placeholder="Ex. 3"
//                       type="number"
//                       required
//                       max="50"
//                       onChange={(e) => setYearsOfExperience(e.target.value)}
//                     />
//                   </div>

//                   <div className="flex gap-4 justify-end">
//                     <Button
//                       className="cursor-pointer"
//                       type="submit"
//                       variant="ghost"
//                       onClick={() => setOpen(false)}
//                     >
//                       Cancel
//                     </Button>
//                     <Button type="submit" disabled={loading} className="cursor-pointer">
//                       {loading ? (
//                         <div className="flex items-center gap-2">
//                           <LoaderCircle className="animate-spin w-4 h-4" />
//                           Generating...
//                         </div>
//                       ) : (
//                         "Start Interview"
//                       )}
//                     </Button>
//                   </div>
//                 </form>
//               </div>
//             </DialogDescription>
//           </DialogHeader>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// }

// export default AddNewInterview;

"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { chatSession } from "@/utils/GeminiAIModal";
import { LoaderCircle } from "lucide-react";
import { mockInterview } from "@/utils/schema";
import { v4 as uuidv4 } from "uuid";
import { db } from "@/utils/db";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { useRouter } from "next/navigation";

export default function AddNewInterview() {
  const [openDialog, setOpenDialog] = useState(false);
  const [jobPosition, setJobPosition] = useState("");
  const [jobDes, setJobDes] = useState("");
  const [jobExperience, setJobExperience] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const inputPrompt = `Job position: ${jobPosition}, Job Description: ${jobDes}, Years of Experience: ${jobExperience}, Depends on Job Position, Job Description and Years of Experience give us ${process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT} Interview question along with Answer in JSON format, Give us question and Answer field on JSON,Each question and answer should be in the format:
  {
    "question": "Your question here",
    "answer": "Your answer here"
  }`;

    try {
      // 1) Ask the AI
      const result = await chatSession.sendMessage(inputPrompt);
      const responseText = await result.response.text();

      // 2) Find the true JSON array in the response
      const startIdx = responseText.indexOf("[");
      const endIdx = responseText.lastIndexOf("]");
      if (startIdx === -1 || endIdx === -1 || endIdx <= startIdx) {
        throw new Error("Could not find a valid JSON array in the AI response");
      }
      const jsonSlice = responseText.slice(startIdx, endIdx + 1).trim();

      // 3) Parse it
      let mockResponse;
      try {
        mockResponse = JSON.parse(jsonSlice);
      } catch (parseErr) {
        console.error("❌ JSON.parse failed on slice:", jsonSlice);
        throw parseErr;
      }

      // 4) Persist to DB
      const res = await db
        .insert(mockInterview)
        .values({
          mockId: uuidv4(),
          jsonMockResp: JSON.stringify(mockResponse),
          jobPosition,
          jobDes,
          jobExperience,
          createdBy: user?.primaryEmailAddress?.emailAddress,
          createdAt: moment().format("DD-MM-YYYY"),
        })
        .returning({ mockId: mockInterview.mockId });

      // 5) Navigate to the start page
      router.push(`dashboard/interview/${res[0].mockId}`);
    } catch (error) {
      console.error("Error fetching interview questions:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div
        className="p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all"
        onClick={() => setOpenDialog(true)}
      >
        <h1 className="font-bold text-lg text-center">+ Add New</h1>
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="font-bold text-2xl">
              Tell us more about your job Interviewing
            </DialogTitle>
          </DialogHeader>

          <DialogDescription>
            <form onSubmit={onSubmit}>
              <div className="mt-7 my-3">
                <label>Job Role/Job Position</label>
                <Input
                  placeholder="Ex. Full Stack Developer"
                  required
                  value={jobPosition}
                  onChange={(e) => setJobPosition(e.target.value)}
                />
              </div>

              <div className="my-3">
                <label>Job Description/Tech Stack (In short)</label>
                <Textarea
                  placeholder="Ex. React, Node.js, MySQL, etc."
                  required
                  value={jobDes}
                  onChange={(e) => setJobDes(e.target.value)}
                />
              </div>

              <div className="my-3">
                <label>Years of Experience</label>
                <Input
                  placeholder="Ex. 5"
                  type="number"
                  min="1"
                  max="70"
                  required
                  value={jobExperience}
                  onChange={(e) => setJobExperience(e.target.value)}
                />
              </div>

              <div className="flex gap-5 justify-end">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setOpenDialog(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={loading}>
                  {loading ? (
                    <>
                      <LoaderCircle className="animate-spin" /> Generating...
                    </>
                  ) : (
                    "Start Interview"
                  )}
                </Button>
              </div>
            </form>
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </>
  );
}