"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  User,
  Mail,
  ShieldAlert,
  Loader2,
  GraduationCap,
} from "lucide-react";
import { TutorAttendeeHeader } from "@/components/bookings/tutor/TutorAttendeeHeader";

interface StudentAttendee {
  id: string;
  studentProfile: {
    id: string;
    user: {
      name: string;
      email: string;
    };
  };
}

export default function SlotStudentsPage() {
  const params = useParams();
  const router = useRouter();
  const availabilityId = params?.id as string;

  const [attendees, setAttendees] = useState<StudentAttendee[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const apiBase = process.env.NEXT_PUBLIC_API_URL || "";

  useEffect(() => {
    const fetchAttendees = async () => {
      if (!availabilityId) return;
      try {
        setIsLoading(true);
        const res = await fetch(
          `${apiBase}/bookings/slot-students/${availabilityId}`,
          {
            credentials: "include",
          },
        );
        const json = await res.json();
        if (json.success) {
          setAttendees(json.data || []);
        }
      } catch (err) {
        console.error("Error fetching attendees:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAttendees();
  }, [availabilityId, apiBase]);

  return (
    <main className="min-h-screen w-full bg-background pt-16 pb-16 px-4 max-w-7xl mx-auto space-y-12">
      {/* Back Navigation Arrow */}
      {/* <button
        onClick={() => router.back()}
        className="inline-flex items-center gap-1 text-xs font-bold text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
      >
        &larr; Back to Dashboard
      </button> */}

      {/* Exact Same Sized Premium Header */}
      <TutorAttendeeHeader totalAttendees={attendees.length} />

      {/* Content Canvas */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20 space-y-3">
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
          <p className="text-xs text-muted-foreground font-medium">
            Pulling attendee registration logs from secure layers...
          </p>
        </div>
      ) : attendees.length === 0 ? (
        <div className="border border-dashed border-slate-300 dark:border-slate-800 rounded-3xl p-16 text-center space-y-3 bg-slate-50/40 dark:bg-slate-900/40">
          <div className="p-3 bg-slate-200 dark:bg-slate-800 inline-flex rounded-full text-muted-foreground">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div className="space-y-1 max-w-sm mx-auto">
            <h5 className="font-bold text-sm text-foreground">Roster Empty</h5>
            <p className="text-xs text-muted-foreground leading-relaxed">
              No students have committed registration transactions to this
              individual availability block yet.
            </p>
          </div>
        </div>
      ) : (
        /* Premium Solid Row Layout Table Listing */
        <div className="border border-slate-300 dark:border-slate-800 rounded-2xl overflow-hidden bg-slate-50/40 dark:bg-slate-900/40">
          <div className="divide-y divide-slate-300 dark:divide-slate-800">
            {attendees.map((row) => (
              <div
                key={row.id}
                className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/90 dark:bg-slate-900 hover:bg-slate-100/60 dark:hover:bg-slate-800/60 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-slate-200/60 dark:bg-slate-800 text-primary rounded-xl border border-slate-300/40 dark:border-slate-700/50">
                    <User className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="font-bold text-sm text-foreground">
                      {row.studentProfile?.user?.name || "Anonymous Learner"}
                    </h5>
                    <p className="text-[11px] text-muted-foreground font-mono">
                      ID: {row.studentProfile?.id}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground bg-background dark:bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-300/60 dark:border-slate-800/80 self-start sm:self-auto">
                  <Mail className="w-3.5 h-3.5 text-emerald-500" />
                  <span>{row.studentProfile?.user?.email || "N/A"}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
