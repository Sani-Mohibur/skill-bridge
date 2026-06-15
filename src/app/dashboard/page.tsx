"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

interface BookedSession {
  id: string;
  tutorName: string;
  subject: string;
  date: string;
  time: string;
  status: "upcoming" | "completed";
}

const UPCOMING_SESSIONS: BookedSession[] = [
  {
    id: "s1",
    tutorName: "Sani Mohibur",
    subject: "Real-Time Systems & WebSockets",
    date: "June 17, 2026",
    time: "7:00 PM - 8:00 PM",
    status: "upcoming",
  },
  {
    id: "s2",
    tutorName: "Arif Islam",
    subject: "Next.js Core Architecture & Hydration Tuning",
    date: "June 23, 2026",
    time: "8:00 PM - 9:30 PM",
    status: "upcoming",
  },
];

export default function StudentDashboard() {
  return (
    <div className="relative min-h-screen flex flex-col w-full overflow-x-hidden">
      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Welcome Header */}
        <div className="mb-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-card-border pb-6">
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
              Welcome back, Student
            </h1>
            <p className="mt-1 text-sm text-muted-text">
              Track your upcoming mentoring tracks and active engineering
              classes.
            </p>
          </div>
          <a
            href="/tutors"
            className="inline-flex h-10 items-center justify-center rounded-lg bg-brand-accent px-4 text-xs font-semibold text-white hover:bg-brand-hover transition-all self-start shadow-xs"
          >
            Book New Session
          </a>
        </div>

        {/* Quick Stat Counter Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          <div className="border border-card-border bg-card p-5 rounded-xl shadow-xs">
            <span className="text-xs font-bold text-muted-text uppercase tracking-wider block">
              Total Hours Tracked
            </span>
            <span className="text-2xl font-extrabold text-foreground mt-1 block">
              14.5 hrs
            </span>
          </div>
          <div className="border border-card-border bg-card p-5 rounded-xl shadow-xs">
            <span className="text-xs font-bold text-muted-text uppercase tracking-wider block">
              Upcoming Sessions
            </span>
            <span className="text-2xl font-extrabold text-brand-accent mt-1 block">
              2 Slots
            </span>
          </div>
          <div className="border border-card-border bg-card p-5 rounded-xl shadow-xs">
            <span className="text-xs font-bold text-muted-text uppercase tracking-wider block">
              Completed Mentorships
            </span>
            <span className="text-2xl font-extrabold text-foreground mt-1 block">
              8 Classes
            </span>
          </div>
        </div>

        {/* Sessions Matrix Layout */}
        <div className="space-y-4">
          <h2 className="text-sm font-bold text-muted-text uppercase tracking-wider">
            Your Mentoring Schedule
          </h2>

          <div className="border border-card-border bg-card rounded-2xl overflow-hidden shadow-xs">
            {UPCOMING_SESSIONS.length > 0 ? (
              <div className="divide-y divide-card-border/60">
                {UPCOMING_SESSIONS.map((session) => (
                  <div
                    key={session.id}
                    className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-muted-surface/20 transition-all"
                  >
                    <div className="space-y-1">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-brand-accent/10 text-brand-accent border border-brand-accent/20">
                        {session.status}
                      </span>
                      <h3 className="text-base font-bold text-foreground pt-1">
                        {session.subject}
                      </h3>
                      <p className="text-xs text-muted-text">
                        Instructor:{" "}
                        <span className="text-foreground font-medium">
                          {session.tutorName}
                        </span>
                      </p>
                    </div>

                    <div className="flex sm:flex-col items-start sm:items-end gap-2 sm:gap-0 text-left sm:text-right">
                      <p className="text-sm font-semibold text-foreground">
                        {session.date}
                      </p>
                      <p className="text-xs text-muted-text">{session.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-12 text-center text-sm text-muted-text">
                You have no scheduled technical mentor blocks currently active.
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
