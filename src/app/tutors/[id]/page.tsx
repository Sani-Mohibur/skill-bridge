"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import {
  Star,
  Mail,
  Briefcase,
  Clock,
  DollarSign,
  CheckCircle2,
  MessageSquare,
  CalendarDays,
} from "lucide-react";
import {
  TutorAvailableSlotsTable,
  TutorSlotData,
} from "@/components/tutors/TutorAvailableSlotsTable";

const API_BASE = process.env.NEXT_PUBLIC_API_URL;

export default function TutorProfileDetailsPage() {
  const { id } = useParams();
  const [tutor, setTutor] = useState<any>(null);
  const [slots, setSlots] = useState<TutorSlotData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSlotsLoading, setIsSlotsLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchTutorProfile = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${API_BASE}/tutor/${id}`);
        if (!response.ok) throw new Error("Profile not found");

        const resData = await response.json();
        setTutor(resData.data);
      } catch (error) {
        console.error("Error fetching tutor profile data layer:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTutorProfile();
    fetchTutorSlots();
  }, [id]);

  const fetchTutorSlots = async () => {
    try {
      setIsSlotsLoading(true);
      // Reusing your optimized backend logic filter by passing the query param
      const res = await fetch(
        `${API_BASE}/availability/upcoming?tutorId=${id}`,
        {
          credentials: "include",
        },
      );
      const json = await res.json();
      if (json.success) setSlots(json.data);
    } catch (err) {
      console.error("Error fetching specific tutor slots:", err);
    } finally {
      setIsSlotsLoading(false);
    }
  };

  const handleBookSlot = async (slotId: string) => {
    try {
      const res = await fetch(`${API_BASE}/bookings/book`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ availabilityId: slotId }),
        credentials: "include",
      });
      const json = await res.json();
      if (json.success) {
        alert("Class booked successfully!");
        fetchTutorSlots(); // Refresh local list instantly
      } else {
        alert(json.message || "Booking failed.");
      }
    } catch (err) {
      console.error("Booking handler error:", err);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-muted-foreground text-sm animate-pulse">
        Syncing live tutor profile data...
      </div>
    );
  }

  if (!tutor) {
    return (
      <div className="flex justify-center items-center min-h-screen text-destructive text-sm font-medium">
        Tutor profile metrics not found.
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background pt-16 pb-16 px-4 max-w-7xl mx-auto w-full">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Main Content Info Block: Column 1 & 2 */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-card border border-border rounded-xl p-6 md:p-8 shadow-sm space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-2xl uppercase">
                  {tutor.name.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-2xl font-bold text-card-foreground">
                      {tutor.name}
                    </h1>
                    {tutor.isVerified && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 fill-emerald-500/10" />
                    )}
                  </div>
                  <p className="text-primary font-medium text-sm mt-0.5">
                    {tutor.title || "Senior Engineering Mentor"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1 bg-amber-500/10 text-amber-600 dark:text-amber-400 px-3 py-1.5 rounded-lg text-sm font-semibold">
                <Star className="w-4 h-4 fill-current" />
                {tutor.rating.toFixed(1)} ({tutor.reviewCount} reviews)
              </div>
            </div>

            <hr className="border-border" />

            <div className="space-y-2">
              <h3 className="font-semibold text-foreground text-md">
                About Me
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {tutor.bio || "No biography provided by instructor yet."}
              </p>
            </div>

            {/* Added Qualifications Dynamic Section */}
            {tutor.qualifications && (
              <div className="space-y-2 pt-2">
                <h3 className="font-semibold text-foreground text-sm">
                  Background & Education
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {tutor.qualifications}
                </p>
              </div>
            )}

            {/* Core Skills Tags Array */}
            {tutor.skills?.length > 0 && (
              <div className="space-y-2 pt-2">
                <h3 className="font-semibold text-foreground text-sm">
                  Subjects Taught
                </h3>
                <div className="flex flex-wrap gap-2">
                  {tutor.skills.map((skill: string, index: number) => (
                    <span
                      key={index}
                      className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* NEW LIVE DIRECT AVAILABILITY SLOTS VIEW */}
          <div className="space-y-4">
            <h2 className="text-lg font-bold flex items-center gap-2 px-1">
              <CalendarDays className="w-5 h-5 text-primary" /> Direct Live
              Booking Slots
            </h2>
            <TutorAvailableSlotsTable
              slots={slots}
              onBookSlot={handleBookSlot}
              isLoading={isSlotsLoading}
            />
          </div>

          {/* Student Reviews Segment */}
          <div className="space-y-4">
            <h2 className="text-lg font-bold flex items-center gap-2 px-1">
              <MessageSquare className="w-5 h-5 text-primary" /> Student
              Feedback
            </h2>

            {!tutor.reviews || tutor.reviews.length === 0 ? (
              <div className="bg-card border border-border rounded-xl p-8 text-center text-muted-foreground text-sm">
                No verified reviews published for this instructor yet.
              </div>
            ) : (
              <div className="space-y-3">
                {tutor.reviews.map((review: any) => (
                  <div
                    key={review.id}
                    className="bg-card border border-border rounded-xl p-5 shadow-xs space-y-2.5"
                  >
                    <div className="flex items-center justify-between">
                      <div className="font-semibold text-sm">
                        {review.studentProfile?.user?.name ||
                          "Verified Student"}
                      </div>
                      <div className="flex items-center gap-0.5 text-amber-500">
                        {Array.from({ length: review.rating }).map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-current" />
                        ))}
                      </div>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {review.comment ||
                        "Left rating entry without written assessment comments."}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Action Sidebar: Column 3 */}
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm space-y-6 lg:sticky lg:top-24">
          <div>
            <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Hourly Rate
            </div>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-3xl font-extrabold text-foreground">
                ${tutor.pricePerHour}
              </span>
              <span className="text-muted-foreground text-sm">/ hour</span>
            </div>
          </div>

          <div className="space-y-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-2.5">
              <Briefcase className="w-4 h-4 text-primary" />
              <span>{tutor.experienceYears} Years Experience</span>
            </div>
            {/* totalHoursTaught preserved inside comment metrics layer safely
            <div className="flex items-center gap-2.5">
              <Clock className="w-4 h-4 text-primary" />
              <span>{tutor.totalHoursTaught} Hours Instructed</span>
            </div> 
            */}
            <div className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-primary" />
              <span className="truncate">{tutor.user?.email}</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
