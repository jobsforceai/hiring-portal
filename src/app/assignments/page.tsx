"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useTestStore, UserAssignment } from "@/store/testScore";
import { ArrowRight, CheckCircle, Clock } from "lucide-react";

function AssignmentCard({ assignment }: { assignment: UserAssignment }) {
  const router = useRouter();
  const { setJobId } = useTestStore();

  const handleAction = () => {
    setJobId(assignment.jobId);
    if (assignment.submissionStatus === "pending") {
      router.push(`/jobs/${assignment.jobId}`);
    } else {
      router.push(`/jobs/${assignment.jobId}/results`);
    }
  };

  const getStatusPill = () => {
    switch (assignment.submissionStatus) {
      case "graded":
        return (
          <div className="flex items-center gap-2 text-emerald-400">
            <CheckCircle size={16} />
            <span>Graded</span>
          </div>
        );
      case "submitted":
      case "grading":
        return (
          <div className="flex items-center gap-2 text-yellow-400">
            <Clock size={16} />
            <span>In Review</span>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Card className="text-white p-6 rounded-2xl border-white/10 bg-white/5 backdrop-blur-xl flex items-center justify-between">
      <div>
        <h3 className="text-lg font-semibold">{assignment.jobTitle}</h3>
        <div className="text-sm text-white/70 mt-1">{getStatusPill()}</div>
      </div>
      <Button
        onClick={handleAction}
        className="bg-white/10 hover:bg-white/20"
      >
        {assignment.submissionStatus === "pending"
          ? "Start Test"
          : "View Results"}
        <ArrowRight size={16} className="ml-2" />
      </Button>
    </Card>
  );
}

export default function AssignmentsPage() {
  const router = useRouter();
  const { email, assignments, loading, getAllAssignments } = useTestStore();

  React.useEffect(() => {
    if (email && assignments.length === 0) {
      getAllAssignments(email).catch((err) => {
        toast.error(err?.message || "Failed to load assignments");
      });
    }
  }, [email, assignments, getAllAssignments]);

  React.useEffect(() => {
    if (!loading && !email) {
      router.replace("/login");
    }
  }, [loading, email, router]);

  if (loading || !email) {
    return (
      <div className="min-h-screen grid place-items-center p-6 text-white bg-[radial-gradient(60%_60%_at_50%_0%,#0D0B1E_0%,#070712_60%)]">
        <div className="animate-pulse w-full max-w-2xl space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-24 bg-white/10 rounded-2xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white bg-[radial-gradient(60%_60%_at_50%_0%,#0D0B1E_0%,#070712_60%)]">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold tracking-tight mb-6">
          Your Assignments
        </h1>
        {assignments.length > 0 ? (
          <div className="space-y-4">
            {assignments.map((assignment) => (
              <AssignmentCard
                key={assignment.applicationId}
                assignment={assignment}
              />
            ))}
          </div>
        ) : (
          <Card className="text-white p-6 rounded-2xl border-white/10 bg-white/5 backdrop-blur-xl text-center">
            <h3 className="text-lg font-semibold">No assignments found</h3>
            <p className="text-white/70 mt-1">
              You have no pending or submitted assignments.
            </p>
          </Card>
        )}
      </div>
    </div>
  );
}
