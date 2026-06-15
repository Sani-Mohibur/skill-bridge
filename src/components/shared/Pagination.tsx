"use client";

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-1.5 pt-4">
      {/* Previous Page Arrow */}
      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="w-9 h-9 rounded-xl border-border/60 text-muted-foreground hover:text-foreground disabled:opacity-40 cursor-pointer transition-colors"
      >
        <ChevronLeft className="w-4 h-4" />
      </Button>

      {/* Numerical Page Buttons */}
      {[...Array(totalPages)].map((_, index) => {
        const pageNum = index + 1;
        const isCurrent = pageNum === currentPage;

        return (
          <Button
            key={pageNum}
            variant={isCurrent ? "default" : "outline"}
            onClick={() => onPageChange(pageNum)}
            className={`w-9 h-9 rounded-xl text-xs font-bold p-0 cursor-pointer border-none transition-all ${
              isCurrent
                ? "bg-emerald-500 hover:bg-emerald-400 text-white shadow-xs"
                : "border border-border/60 bg-background text-muted-foreground hover:text-foreground hover:bg-muted/40"
            }`}
          >
            {pageNum}
          </Button>
        );
      })}

      {/* Next Page Arrow */}
      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="w-9 h-9 rounded-xl border-border/60 text-muted-foreground hover:text-foreground disabled:opacity-40 cursor-pointer transition-colors"
      >
        <ChevronRight className="w-4 h-4" />
      </Button>
    </div>
  );
}
