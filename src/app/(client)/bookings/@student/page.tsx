"use client";

import { useState, useEffect } from "react";
import { BookingsHero } from "@/components/bookings/student/BookingsHero";
import { BookingsTabs } from "@/components/bookings/student/BookingsTabs";
import { PastBookingsList } from "@/components/bookings/student/PastBookingsList";
import { MyReviewsList } from "@/components/bookings/student/MyReviewsList";
import {
  AvailableSlotsTable,
  SlotData,
} from "@/components/bookings/student/AvailableSlotsTable";
import { BookingData } from "@/components/bookings/student/BookingCard";
import { ReviewData } from "@/components/bookings/student/ReviewCard";
import { AddReviewModal } from "@/components/bookings/student/AddReviewModal";
import { UpcomingBookingsList } from "@/components/bookings/student/UpcomingBookingsList";
import { toast } from "sonner";

const API_BASE = process.env.NEXT_PUBLIC_API_URL;

export default function BookingsPage() {
  const [bookings, setBookings] = useState<BookingData[]>([]);
  const [reviews, setReviews] = useState<ReviewData[]>([]);
  const [availableSlots, setAvailableSlots] = useState<SlotData[]>([]);

  const [isBooking, setIsBooking] = useState(false);
  const [isCanceling, setIsCanceling] = useState(false);
  const [isBookingsLoading, setIsBookingsLoading] = useState(true);
  const [isReviewsLoading, setIsReviewsLoading] = useState(true);
  const [isSlotsLoading, setIsSlotsLoading] = useState(true);

  const [selectedBooking, setSelectedBooking] = useState<BookingData | null>(
    null,
  );
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  useEffect(() => {
    fetchBookings();
    fetchMyReviews();
    fetchAvailableSlots();
  }, []);

  const fetchBookings = async () => {
    try {
      setIsBookingsLoading(true);
      const res = await fetch(`${API_BASE}/bookings/student-list`, {
        credentials: "include",
      });
      const json = await res.json();
      if (json.success) setBookings(json.data);
    } catch (err) {
      console.error("Error fetching bookings:", err);
    } finally {
      setIsBookingsLoading(false);
    }
  };

  const fetchMyReviews = async () => {
    try {
      setIsReviewsLoading(true);
      const res = await fetch(`${API_BASE}/reviews/my-reviews`, {
        credentials: "include",
      });
      const json = await res.json();
      if (json.success) setReviews(json.data);
    } catch (err) {
      console.error("Error fetching reviews:", err);
    } finally {
      setIsReviewsLoading(false);
    }
  };

  const fetchAvailableSlots = async () => {
    try {
      setIsSlotsLoading(true);
      const res = await fetch(`${API_BASE}/availability/student-upcoming`, {
        credentials: "include",
      });
      const json = await res.json();
      if (json.success) setAvailableSlots(json.data);
    } catch (err) {
      console.error("Error fetching slots:", err);
    } finally {
      setIsSlotsLoading(false);
    }
  };

  const handleBookSlot = async (slotId: string) => {
    setIsBooking(true);
    const toastId = toast.loading("Booking your slot...");
    try {
      const res = await fetch(`${API_BASE}/bookings/book`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ availabilityId: slotId }),
        credentials: "include",
      });
      const json = await res.json();
      if (json.success) {
        toast.success("Class booked successfully!", { id: toastId });
        await Promise.all([fetchBookings(), fetchAvailableSlots()]);
      } else {
        toast.error(json.message || "Failed to book slot.", { id: toastId });
      }
    } catch (err) {
      console.error("Booking error:", err);
      toast.error("An error occurred while booking.", { id: toastId });
    } finally {
      setIsBooking(false);
    }
  };

  const handleCancelBooking = async (bookingId: string) => {
    if (!confirm("Are you sure you want to cancel this class booking?")) return;

    setIsCanceling(true);
    const toastId = toast.loading("Canceling your booking...");

    try {
      const res = await fetch(`${API_BASE}/bookings/cancel/${bookingId}`, {
        method: "DELETE",
        credentials: "include",
      });

      const json = await res.json();

      if (json.success) {
        toast.success("Booking canceled successfully!", { id: toastId });
        await Promise.all([fetchBookings(), fetchAvailableSlots()]);
      } else {
        toast.error(json.message || "Failed to cancel booking.", {
          id: toastId,
        });
      }
    } catch (err) {
      console.error("Error canceling booking:", err);
      toast.error("An error occurred while canceling.", { id: toastId });
    } finally {
      setIsCanceling(false);
    }
  };

  const handleSubmitReview = async (payload: {
    bookingId: string;
    rating: number;
    comment: string;
  }) => {
    try {
      const res = await fetch(`${API_BASE}/reviews/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (json.success) {
        toast.success("Review submitted successfully!");
        await Promise.all([fetchBookings(), fetchMyReviews()]);
      } else {
        toast.error(json.message || "Failed to submit review.");
      }
    } catch (err) {
      console.error("Error submitting review:", err);
      toast.error("An error occurred while submitting.");
    }
  };

  const openReviewModal = (booking: BookingData) => {
    setSelectedBooking(booking);
    setIsReviewModalOpen(true);
  };

  return (
    <main className="min-h-screen w-full bg-background pt-16 pb-16 px-4 max-w-7xl mx-auto space-y-16">
      <BookingsHero />

      <section className="pt-4 animate-in fade-in duration-300">
        <BookingsTabs
          renderUpcoming={() => (
            <UpcomingBookingsList
              bookings={bookings}
              onCancelBooking={handleCancelBooking}
              isLoading={isBookingsLoading}
            />
          )}
          renderAvailableSlots={() => (
            <AvailableSlotsTable
              slots={availableSlots}
              onBookSlot={handleBookSlot}
              isLoading={isSlotsLoading}
            />
          )}
          renderPast={() => (
            <PastBookingsList
              bookings={bookings}
              onOpenReviewModal={openReviewModal}
              isLoading={isBookingsLoading}
            />
          )}
          renderReviews={() => (
            <MyReviewsList reviews={reviews} isLoading={isReviewsLoading} />
          )}
        />
      </section>

      <AddReviewModal
        booking={selectedBooking}
        isOpen={isReviewModalOpen}
        onClose={() => {
          setIsReviewModalOpen(false);
          setSelectedBooking(null);
        }}
        onSubmitReview={handleSubmitReview}
      />
    </main>
  );
}
