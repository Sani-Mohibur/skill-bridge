"use client";

import {
  FileText,
  CheckCircle2,
  XCircle,
  ShieldCheck,
  ExternalLink,
} from "lucide-react";

export default function AdminVettingQueuePage() {
  // Static placeholder queue matrix mapping
  const mockApplications = [
    {
      id: "v1",
      name: "Alex Mercer",
      title: "Distributed Systems Architect",
      institution: "MIT Engineering Science",
      experience: "8 Years",
      applied: "2 hours ago",
      skills: ["System Design", "Go", "Kubernetes"],
    },
    {
      id: "v2",
      name: "Dr. Lora Kross",
      title: "Senior Data Science Lead",
      institution: "Stanford AI Research Lab",
      experience: "12 Years",
      applied: "5 hours ago",
      skills: ["Python", "PyTorch", "Data Modeling"],
    },
    {
      id: "v3",
      name: "Sani Mohibur",
      title: "Full Stack Engineer",
      institution: "Programming Hero Elite Track",
      experience: "3 Years",
      applied: "1 day ago",
      skills: ["MongoDB", "Express.js", "React", "Node.js"],
    },
  ];

  return (
    <div className="space-y-8 w-full animate-fade-in">
      {/* Editorial Page Header */}
      <div>
        <h1 className="text-2xl font-black tracking-tight text-foreground sm:text-3xl">
          Instructor Vetting Queue
        </h1>
        <p className="text-xs text-muted-foreground mt-1">
          Review credentials, verify educational documentation background
          checks, and issue system verification status parameters.
        </p>
      </div>

      {/* Grid List of Applications Pending Verification */}
      <div className="grid grid-cols-1 gap-6">
        {mockApplications.map((app) => (
          <div
            key={app.id}
            className="bg-card border border-black/5 dark:border-white/10 rounded-2xl p-6 shadow-xs flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6"
          >
            {/* Left Box: Profile Info */}
            <div className="space-y-4 max-w-2xl">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-black text-foreground">
                    {app.name}
                  </h3>
                  <span className="text-[10px] font-bold text-muted-foreground bg-muted px-2 py-0.5 rounded-md">
                    {app.experience} Exp
                  </span>
                </div>
                <p className="text-xs font-bold text-emerald-600 dark:text-blue-400">
                  {app.title}
                </p>
                <p className="text-[11px] text-muted-foreground font-medium flex items-center gap-1">
                  <FileText className="w-3.5 h-3.5" /> Credentials:{" "}
                  {app.institution}
                </p>
              </div>

              {/* Skills Badges Cluster */}
              <div className="flex flex-wrap gap-1.5">
                {app.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] font-semibold px-2 py-0.5 bg-slate-100 dark:bg-slate-900 border border-black/5 dark:border-white/5 rounded text-muted-foreground"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Right Box: Call to Actions Group */}
            <div className="flex flex-row lg:flex-col sm:items-center lg:items-end justify-between lg:justify-center w-full lg:w-auto border-t lg:border-t-0 pt-4 lg:pt-0 border-black/5 dark:border-white/5 gap-4 shrink-0">
              <span className="text-[10px] text-muted-foreground font-black uppercase tracking-wider block lg:mb-1">
                Received {app.applied}
              </span>

              <div className="flex items-center gap-2">
                <button className="h-8 px-3 text-[11px] font-bold rounded-xl border border-black/10 dark:border-white/10 hover:bg-red-500/10 hover:text-red-500 text-foreground cursor-pointer flex items-center gap-1 transition-colors">
                  <XCircle className="w-3.5 h-3.5" /> Reject
                </button>

                <button className="h-8 px-3 text-[11px] font-bold rounded-xl bg-slate-950 dark:bg-white text-white dark:text-black hover:opacity-90 cursor-pointer flex items-center gap-1 transition-all shadow-xs">
                  <ShieldCheck className="w-3.5 h-3.5" /> Verify Pro
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
