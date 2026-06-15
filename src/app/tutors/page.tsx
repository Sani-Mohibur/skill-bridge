"use client";

import React, { useState, useMemo, useEffect } from "react";
import { TutorsFilterSidebar } from "@/components/tutors/TutorsFilterSidebar";
import { TutorsGrid } from "@/components/tutors/TutorsGrid";
import { Tutor } from "@/components/tutors/TutorCard";
import { TutorsHeader } from "@/components/tutors/TutorsHeader";

const INITIAL_FILTERS = {
  searchName: "",
  priceRange: [10, 150] as [number, number],
  minRating: 0,
  selectedCategories: [] as string[],
};

//     id: "1",
//     name: "Sani Mohibur",
//     isVerified: true,
//     rating: 4.9,
//     reviewCount: 42,
//     categories: ["WebSockets", "Node.js", "System Design"],
//     bio: "Backend scale engineer specializing in real-time, event-driven web applications and highly responsive system architectures.",
//     pricePerHour: 45,
//     experienceYears: 5,
//   },

export default function TutorsPage() {
  const [tutors, setTutors] = useState<Tutor[]>([]);
  const [availableCategories, setAvailableCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState(INITIAL_FILTERS);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchTutors = async () => {
      try {
        setIsLoading(true);
        const [tutorsRes, categoriesRes] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/tutor/search`),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/tutor/categories`),
        ]);

        if (!tutorsRes.ok || !categoriesRes.ok) {
          throw new Error("Failed to sync dashboard data with backend server");
        }

        const tutorsData = await tutorsRes.json();
        const categoriesData = await categoriesRes.json();

        setTutors(tutorsData.data || []);

        const categoryNames = (categoriesData.data || []).map(
          (cat: { name: string }) => cat.name,
        );
        setAvailableCategories(categoryNames);
      } catch (error) {
        console.error("Dashboard synchronization exception:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTutors();
  }, []);

  const handleResetAll = () => {
    setFilters(INITIAL_FILTERS);
    setCurrentPage(1);
  };

  // Perform client-side engine filtering across all active filter matrices
  const filteredTutors = useMemo(() => {
    return tutors.filter((tutor) => {
      // 1. Filter by Name Query
      if (
        filters.searchName &&
        !tutor.name.toLowerCase().includes(filters.searchName.toLowerCase())
      ) {
        return false;
      }

      // 2. Filter by Price Range Bounds
      if (
        tutor.pricePerHour < filters.priceRange[0] ||
        tutor.pricePerHour > filters.priceRange[1]
      ) {
        return false;
      }

      // 3. Filter by Minimum Rating Threshold
      if (filters.minRating > 0 && tutor.rating < filters.minRating) {
        return false;
      }

      // 4. Filter by Multi-Selected Categories
      if (filters.selectedCategories.length > 0) {
        const hasMatchingCategory = tutor.categories.some((cat) =>
          filters.selectedCategories.includes(cat),
        );
        if (!hasMatchingCategory) return false;
      }

      return true;
    });
  }, [tutors, filters]); // Added tutors as dependency

  // Handle client-side pagination computing boundaries
  const totalPages = Math.ceil(filteredTutors.length / itemsPerPage);
  const paginatedTutors = useMemo(() => {
    const startOffset = (currentPage - 1) * itemsPerPage;
    return filteredTutors.slice(startOffset, startOffset + itemsPerPage);
  }, [filteredTutors, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="min-h-screen w-full bg-background pt-16 pb-16 px-4 max-w-7xl mx-auto space-y-8">
      <TutorsHeader
        searchValue={filters.searchName}
        onSearchChange={(value) => {
          setFilters((prev) => ({ ...prev, searchName: value }));
          setCurrentPage(1);
        }}
      />

      {/* Main Structural Filter + Grid Panel Content Body */}
      <div className="flex flex-col md:flex-row gap-8 items-start pt-2 w-full">
        <TutorsFilterSidebar
          key="tutors-sidebar-filter"
          filters={filters}
          setFilters={setFilters}
          availableCategories={availableCategories}
          onReset={handleResetAll}
        />

        <div className="flex-1 grow w-full min-w-0">
          <TutorsGrid
            tutors={paginatedTutors}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </main>
  );
}
