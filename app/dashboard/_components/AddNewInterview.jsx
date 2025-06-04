"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

function AddNewInterview() {
  const [open, setOpen] = React.useState(false);
  const [jobRole, setJobRole] = React.useState("");
  const [jobDescription, setJobDescription] = React.useState("");
  const [yearsOfExperience, setYearsOfExperience] = React.useState("");
  const onSubmit = (e) => {
    e.preventDefault();
    console.log("Job Role: ", jobRole);
    console.log("Job Description: ", jobDescription);
    console.log("Years of Experience: ", yearsOfExperience);
  }
  return (
    <div>
      <div
        className="p-10 border rounded-lg shadow-md bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all"
        onClick={() => setOpen(true)}
      >
        <h2 className="font-bold text-lg text-center">+ Add New</h2>
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-2xl">
              Tell us more about your job interview
            </DialogTitle>

            <DialogDescription>
              <div>
                <h2>
                  Add Details about your job position/role, Job description and
                  years of experience
                </h2>

                <form onSubmit={onSubmit}>
                  <div className="mt-7 my-3">
                    <label>Job Role/ Job Position</label>
                    <Input placeholder="Ex. Full Stack Developer" required
                    onChange={(e) => setJobRole(e.target.value)} />
                  </div>
                  <div className="my-3">
                    <label>Job Description/ Tech Stack (In Short)</label>
                    <Textarea placeholder="Ex. React, Angular, NodeJs, MySql etc." required
                    onChange={(e) => setJobDescription(e.target.value)} />
                  </div>
                  <div className="my-3">
                    <label>Years of Experience</label>
                    <Input placeholder="Ex. 3" type="number" required max="50"
                    onChange={(e) => setYearsOfExperience(e.target.value)} />
                  </div>

                  <div className="flex gap-4 justify-end">
                    <Button type="submit" variant="ghost" onClick={() => setOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit">Start Interview</Button>
                  </div>
                </form>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddNewInterview;
