import React from "react";
import { Pagination } from "./ui/pagination";

const CustomPagination = ({ page, totalPages, onPageChange }) => {
  const pageNumbers = [];

  // Hiển thị trang đầu tiên và cuối cùng
  if (totalPages <= 4) {
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
  } else {
    if (page > 2) pageNumbers.push(1);
    if (page > 3) pageNumbers.push("...");

    // Hiển thị 3 trang xung quanh trang hiện tại
    for (let i = Math.max(1, page - 1); i <= Math.min(totalPages, page + 1); i++) {
      pageNumbers.push(i);
    }

    if (page < totalPages - 2) pageNumbers.push("...");
    if (page < totalPages - 1) pageNumbers.push(totalPages);
  }

  return (
    <div className="pagination flex items-center gap-2">
      <Pagination
        current={page}
        total={totalPages}
        onChange={onPageChange}
        showQuickJumper
        showSizeChanger={false} // Hide size changer if not needed
      >
        {/* Here we just display the buttons */}
        {pageNumbers.map((num, index) =>
          num === "..." ? (
            <span key={index} className="text-gray-500">
              ...
            </span>
          ) : (
            <button
              key={index}
              onClick={() => onPageChange(num)}
              className={`px-3 py-2 rounded-md ${
                num === page
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {num}
            </button>
          )
        )}
      </Pagination>
    </div>
  );
};

export default CustomPagination;
