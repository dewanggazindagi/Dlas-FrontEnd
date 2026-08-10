import { ChevronLeft, ChevronRight } from "lucide-react";

interface TablePaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function TablePagination({
  currentPage,
  totalPages,
  onPageChange,
}: TablePaginationProps) {
  const getPages = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (currentPage <= 3) {
      return [1, 2, 3, 4, "...", totalPages];
    }

    if (currentPage >= totalPages - 2) {
      return [
        1,
        "...",
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    }

    return [
      1,
      "...",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "...",
      totalPages,
    ];
  };

  return (
    <div className="mt-6 flex items-center justify-center gap-6">
      {/* Previous */}
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="flex items-center gap-1 text-sm text-gray-700 disabled:opacity-40"
      >
        <ChevronLeft size={16} />
        Sebelumnya
      </button>

      {/* Page Number */}
      <div className="flex items-center gap-3">
        {getPages().map((page, index) =>
          page === "..." ?
            <span key={index} className="text-gray-400">
              ...
            </span>
          : <button
              key={page}
              onClick={() => onPageChange(Number(page))}
              className={`
                flex h-8 w-8 items-center justify-center rounded-lg text-sm transition
                ${
                  currentPage === page ?
                    "border border-gray-300 bg-white font-semibold"
                  : "hover:text-green-700"
                }
              `}
            >
              {page}
            </button>,
        )}
      </div>

      {/* Next */}
      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="flex items-center gap-1 text-sm text-gray-700 disabled:opacity-40"
      >
        Selanjutnya
        <ChevronRight size={16} />
      </button>
    </div>
  );
}
