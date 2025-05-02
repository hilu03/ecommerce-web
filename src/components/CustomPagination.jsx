import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";

const CustomPagination = ({ page, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const maxVisible = 5;
    const startPage = Math.max(1, page - 2);
    const endPage = Math.min(startPage + maxVisible - 1, totalPages);
    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => onPageChange(Math.max(page - 1, 1))}
            className={page === 1 ? "pointer-events-none opacity-50" : ""}
          >
            Previous
          </PaginationPrevious>
        </PaginationItem>

        {getPageNumbers().map((pageNumber) => (
          <PaginationItem key={pageNumber}>
            <button
              onClick={() => onPageChange(pageNumber)}
              className={`px-3 py-1 border rounded ${
                page === pageNumber
                  ? "bg-blue-500 text-white"
                  : "bg-white text-gray-700"
              }`}
            >
              {pageNumber}
            </button>
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            onClick={() => onPageChange(Math.min(page + 1, totalPages))}
            className={page === totalPages ? "pointer-events-none opacity-50" : ""}
          >
            Next
          </PaginationNext>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default CustomPagination;
